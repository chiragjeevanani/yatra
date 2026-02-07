import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const OTPScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const inputs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index, value) => {
        if (value.length > 1) value = value[value.length - 1];
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (otp.join('').length < 6) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/home');
        }, 1500);
    };

    return (
        <div className="h-screen w-screen bg-background p-8 flex flex-col">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 mb-8 w-fit text-muted-foreground hover:text-foreground">
                <ArrowLeft size={24} />
            </button>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-black tracking-tight mb-2">Verify it's you</h1>
                <p className="text-muted-foreground text-lg">We've sent a 6-digit code to your phone number.</p>
            </motion.div>

            <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleVerify}
                className="space-y-10"
            >
                <div className="flex justify-between gap-2">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputs.current[i] = el)}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-12 h-16 bg-muted/30 border-2 border-transparent focus:border-primary rounded-2xl text-center text-2xl font-bold transition-all outline-none"
                            autoFocus={i === 0}
                        />
                    ))}
                </div>

                <button
                    disabled={otp.join('').length < 6 || isLoading}
                    className="w-full h-16 bg-primary text-primary-foreground rounded-2xl font-bold text-xl shadow-lg disabled:opacity-50 transition-all flex items-center justify-center"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        'Verify & Continue'
                    )}
                </button>

                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        Didn't receive the code?{' '}
                        {timer > 0 ? (
                            <span className="text-primary font-bold">Resend in {timer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setTimer(30)}
                                className="text-primary font-bold decoration-primary hover:underline underline-offset-4"
                            >
                                Resend Now
                            </button>
                        )}
                    </p>
                </div>
            </motion.form>
        </div>
    );
};

export default OTPScreen;
