import { ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAuth from "../hooks/useAuth";
import { HttpStatusCode } from "axios";

const Login = () => {
    type User = {
        email: string;
        password: string;
    };

    const [userLogin, setUserLogin] = useState<User>({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser, persist, setPersist } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setError(null);
        setUserLogin({
            ...userLogin,
            [event.target.name]: event.target.value,
        });
    }

    function handlePersist(event: ChangeEvent<HTMLInputElement>) {
        setPersist(event.target.checked);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist.toString());
    }, [persist]);

    // Form validation
    function validateInputs(): boolean {
        const { email, password } = userLogin;

        if (!email) {
            setError("Email is required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        if (!password) {
            setError("Password is required.");
            return false;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return false;
        }

        return true;
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        if (!validateInputs()) return;

        setIsLoading(true);
        let loginResponse;
        try {
            loginResponse = await axiosInstance.post(
                API_ROUTES.USER.LOGIN,
                {
                    email: userLogin.email,
                    password: userLogin.password,
                },
                { withCredentials: true }
            );

            if (loginResponse.status === HttpStatusCode.Ok) {
                setUser({
                    token: loginResponse?.data?.token,
                    userId: loginResponse?.data?.userId,
                });
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            // const status = err.response?.status;
            const error = err.response.data.message;
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex-1 flex h-full font-mono">
            {/* Left Section */}
            <div className="w-1/2 p-10 lg:flex flex-col justify-center content-center hidden bg-muted">
                <div className="w-4/5 mx-auto">
                    <p className="font-bold text-sm lg:text-lg text-foreground">
                        "The customer service received is exceptional. The
                        support team went above and beyond to address my
                        concerns."
                    </p>
                    <div className="mt-4">
                        <p className="font-bold text-sm lg:text-base text-muted-foreground">
                            John WinField
                        </p>
                        <p className="text-muted-foreground text-sm font-semibold">
                            CEO, ACME Inc
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <form
                onSubmit={handleSubmit}
                className="flex-1 lg:w-1/2 flex flex-col justify-center items-center"
            >
                <p className="px-2 text-center text-xl lg:text-2xl font-bold text-foreground">
                    Sign into your Account
                </p>
                <p className="px-2 text-center text-lg lg:text-xl text-muted-foreground font-semibold my-2">
                    Log into your library!
                </p>
                <div className="flex flex-col w-5/6 md:w-2/3 mx-auto mt-10">
                    {error && (
                        <p className="bg-destructive p-2 rounded-lg font-semibold text-destructive-foreground text-center mb-4 text-xs lg:text-sm">
                            {error}
                        </p>
                    )}
                    <label
                        htmlFor="email"
                        className="font-semibold text-sm text-foreground"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={userLogin.email}
                        onChange={handleChange}
                        className="border-divider border-2 rounded-md px-1 py-2 sm:p-2 my-2 outline-none text-black text-sm"
                        placeholder="Email"
                    />
                    <label
                        htmlFor="password"
                        className="font-semibold text-sm text-foreground"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={userLogin.password}
                        onChange={handleChange}
                        className="border-divider border-2 rounded-md px-1 py-2 sm:p-2 my-2 outline-none text-black text-sm"
                        placeholder="Password"
                    />
                    <div className="space-x-4 my-4 flex items-center">
                        <input
                            checked={persist}
                            onChange={handlePersist}
                            type="checkbox"
                            id="checkbox"
                        />
                        <label htmlFor="checkbox">
                            <span className="font-semibold text-sm font-mono text-foreground">
                                Trust this Device
                            </span>
                        </label>
                    </div>
                    <p className="text-secondary-foreground mt-4 text-center font-medium text-sm">
                        Don't have an Account?{" "}
                        <Link
                            to={"/signup"}
                            className="underline font-semibold text-sm text-foreground"
                        >
                            Sign Up
                        </Link>
                    </p>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-primary text-foreground hover:opacity-70 font-semibold text-sm lg:font-medium rounded-lg p-2 my-3 ${
                            isLoading ? "opacity-50" : ""
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center gap-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="animate-spin text-foreground"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                                <span className="text-primary-foreground">
                                    Signing In...
                                </span>
                            </div>
                        ) : (
                            <span className="text-primary-foreground">
                                Sign in
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
