import { ChangeEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES } from "../utils/apiEndpoints";
import axiosInstance from "../utils/axiosInstance";
import useAuth from "../hooks/useAuth";
import { HttpStatusCode } from "axios";

const Signup = () => {
    type NewUser = {
        username: string;
        email: string;
        password: string;
    };

    const [newUser, setNewUser] = useState<NewUser>({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
        setError(null);
    }

    const { setUser } = useAuth();

    const validateForm = (): boolean => {
        if (!newUser.username.trim()) {
            setError("Username cannot be empty");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            setError("Invalid email format");
            return false;
        }
        if (newUser.password.length < 6) {
            setError("Password must be at least 8 characters");
            return false;
        }
        return true;
    };

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setUser({ token: "", userId: "" });
        localStorage.removeItem("persist");
        event.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const signupResponse = await axiosInstance.post(
                API_ROUTES.USER.SIGNUP,
                {
                    name: newUser.username,
                    email: newUser.email,
                    password: newUser.password,
                }
            );

            if (signupResponse.status === HttpStatusCode.Created) {
                setUser({
                    token: signupResponse?.data?.token,
                    userId: signupResponse?.data?.userId,
                });
                navigate(from, { replace: true });
            }
        } catch (err: any) {
            const status = err.response?.status;
            if (status === HttpStatusCode.BadRequest) {
                setError("Invalid input. Please check your details.");
            } else if (status === HttpStatusCode.Conflict) {
                setError("User already exists. Please log in instead.");
            } else if (status === HttpStatusCode.InternalServerError) {
                setError("Something went wrong. Please try again later.");
            } else {
                setError("Unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="lg:flex">
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-1/2 flex flex-col justify-center items-center h-dvh lg:min-h-0"
                >
                    <p className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        Create an Account
                    </p>
                    <p className="text-center text-lg sm:text-xl text-foreground font-semibold my-2">
                        Start your Journey with us!
                    </p>
                    {error && (
                        <div className="bg-destructive rounded-lg font-bold p-2 text-destructive-foreground text-center mt-4">
                            {error}
                        </div>
                    )}
                    <div className="flex flex-col w-2/3 mx-auto mt-10">
                        <label
                            htmlFor="username"
                            className="font-semibold sm:text-lg text-foreground"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={newUser.username}
                            onChange={handleChange}
                            className="border-divider border-2 rounded-md p-1 sm:p-2 my-2 outline-none text-black"
                            placeholder="Username"
                        />
                        <label
                            htmlFor="email"
                            className="font-semibold sm:text-lg text-foreground"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={newUser.email}
                            onChange={handleChange}
                            className="border-divider border-2 rounded-md p-1 sm:p-2 my-2 outline-none text-black"
                            placeholder="Email"
                        />
                        <label
                            htmlFor="password"
                            className="font-semibold sm:text-lg text-foreground"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={newUser.password}
                            onChange={handleChange}
                            className="border-divider border-2 rounded-md p-1 sm:p-2 my-2 outline-none text-black"
                            placeholder="Password"
                        />
                        <p className="text-foreground mt-4 text-center font-medium sm:text-lg">
                            Already have an Account?{" "}
                            <Link
                                to={"/login"}
                                className="underline font-semibold sm:text-lg text-foreground"
                            >
                                Sign In
                            </Link>
                        </p>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-primary text-foreground hover:opacity-70 font-semibold sm:text-lg lg:font-medium rounded-lg p-2 sm:p-3 my-3"
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
                                        Signing Up...
                                    </span>
                                </div>
                            ) : (
                                <span className="text-primary-foreground">
                                    Sign up
                                </span>
                            )}
                        </button>
                    </div>
                </form>
                <div className="w-1/2 h-dvh p-10 lg:flex flex-col justify-center content-center hidden bg-muted">
                    <div className="w-4/5 mx-auto">
                        <p className="font-bold text-3xl text-foreground">
                            "The customer service received for is exceptional.
                            The support team went above and beyond to address my
                            concerns."
                        </p>
                        <div className="mt-4">
                            <p className="font-bold text-lg text-muted-foreground">
                                John WinField
                            </p>
                            <p className="text-lg text-muted-foreground font-semibold">
                                CEO, ACME Inc
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
