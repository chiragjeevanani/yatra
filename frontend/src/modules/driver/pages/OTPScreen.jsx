import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useDriver } from '../contexts/DriverContext';

const OTPScreen = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useDriver();
    const location = useLocation();
    const phone = location.state?.phone || '9988776655';
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
            login(phone);
            navigate('/driver/dashboard');
        }, 1500);
    };

    return (
        <div className="h-screen w-screen bg-background p-8 flex flex-col">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 mb-8 w-fit text-muted-foreground hover:text-driver-primary">
                <ArrowLeft size={24} />
            </button>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-12"
            >
                <h1 className="text-4xl font-black tracking-tighter mb-2 text-driver-primary">Verify OTP</h1>
                <p className="text-muted-foreground font-bold text-sm tracking-tight leading-relaxed">
                    Code sent to <span className="text-driver-primary">{phone}</span>
                </p>
            </motion.div>

            <motion.form
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleVerify}
                className="space-y-12"
            >
                <div className="grid grid-cols-6 gap-2">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputs.current[i] = el)}
                            type="tel"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-full h-16 bg-muted/50 border-2 border-transparent focus:border-driver-primary rounded-2xl text-center text-2xl font-black transition-all outline-none"
                            autoFocus={i === 0}
                        />
                    ))}
                </div>

                <div className="space-y-6">
                    <button
                        disabled={otp.join('').length < 6 || isLoading}
                        className="w-full h-16 bg-driver-primary text-driver-primary-foreground rounded-2xl font-black text-xl shadow-2xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                START DUTY <CheckCircle2 size={20} />
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            Didn't receive code?{' '}
                            {timer > 0 ? (
                                <span className="text-driver-primary">Resend in {timer}s</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setTimer(30)}
                                    className="text-driver-primary underline underline-offset-4"
                                >
                                    Resend Now
                                </button>
                            )}
                        </p>
                    </div>
                </div>
            </motion.form>
        </div>
    );
};

export default OTPScreen;
