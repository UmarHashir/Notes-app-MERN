import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../api/axios";
function Register() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const password = getValues("password");

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await api.post(
                "/auth/register",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }
            );

            toast.success(
                "Account created successfully"
            );

            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        if (!password) return "";

        if (password.length < 6)
            return "Weak";

        if (password.length < 10)
            return "Medium";

        return "Strong";
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-slate-900/70 backdrop-blur-lg border border-slate-800 rounded-3xl p-8 shadow-2xl">

                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Create Account
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Join Notes App
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name", {
                                required:
                                    "Name is required",
                            })}
                            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
                        />

                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required:
                                    "Email is required",
                            })}
                            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}

                    <div className="relative">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Password"
                            {...register("password", {
                                required:
                                    "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Minimum 6 characters",
                                },
                            })}
                            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(
                                    !showPassword
                                )
                            }
                            className="absolute right-3 top-3 text-slate-400"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                        {errors.password && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors.password
                                        .message
                                }
                            </p>
                        )}

                        {password && (
                            <p className="text-sm text-slate-400 mt-1">
                                Strength:
                                {" "}
                                {getPasswordStrength()}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}

                    <div className="relative">
                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Confirm Password"
                            {...register(
                                "confirmPassword",
                                {
                                    required:
                                        "Confirm password is required",
                                    validate: (
                                        value
                                    ) =>
                                        value === password ||
                                        "Passwords do not match",
                                }
                            )}
                            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    !showConfirmPassword
                                )
                            }
                            className="absolute right-3 top-3 text-slate-400"
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>

                        {errors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors
                                        .confirmPassword
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                        <UserPlus size={18} />

                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p className="text-center text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/"
                        className="text-blue-500"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;