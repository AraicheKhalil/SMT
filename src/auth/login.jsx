import React, { useState } from "react";
import AuthForm from "./AuthForm";
import InputWrapper from "../components/Wrappers/InputWrapper";
import Input from "../components/Inputs/Input";
import InputPassword from "../components/Inputs/InputPassword";
import { Link, useNavigate } from "react-router-dom";
import ButtonImg from "../components/Button/ButtonImg";
import AuthOptionText from "../components/Typograpghy/AuthOptionText";
import ButtonLarge from "../components/Button/ButtonLarge";
import googleLogo from "../Assets/images/google.png";
import microsoftLogo from "../Assets/images/microsoft.png";
import appleLogo from "../Assets/images/apple.png";
import { useFormik } from "formik";
import BtnLoading from "../components/Button/BtnLoading";
import { loginSchema } from "./Schema";
import { loginUser } from "./authFunctions";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "./firebase";
import Loader from "../components/Loader/Loader";


const loginInputs = [
    { name: "email", type: "email", placeholder: "Email", id: "email" },
    { name: "password", type: "password", placeholder: "Password", id: "password" },
];

const Login = () => {
    const [pageLoader, setPageLoader] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);
    const [error, setError] = useState(null);
    const [showResendLink, setShowResendLink] = useState(false);
    const navigate = useNavigate();
    const initialState = {
        email: "",
        password: "",
    };

    async function handleGoogleLogin() {
        try {
            const response = await signInWithPopup(auth, googleAuthProvider);
            setPageLoader(true);
            // Handle user login via Google
            setPageLoader(false);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialState,
            validationSchema: loginSchema,
            onSubmit: async (values) => {
                setBtnLoader(true);
                setError(null);
                try {
                    const userCredential = await loginUser(values.email, values.password);
                    const user = userCredential.user;
                    if (!user.emailVerified) {
                        setShowResendLink(true);
                        throw new Error("Email not verified");
                    }
                    navigate("/dashboard");
                } catch (error) {
                    setError(error.message);
                    console.error(error);
                } finally {
                    setBtnLoader(false);
                }
            },
        });

    const handleResendVerification = async () => {
        try {
            const user = auth.currentUser;
            await sendEmailVerification(user);
            setError("Verification email resent. Please check your inbox.");
        } catch (error) {
            console.error("Error resending verification email:", error);
            setError("Error resending verification email. Please try again.");
        }
    };

    return (
        <AuthForm onSubmit={handleSubmit} formHeader="Welcome Back">
            {pageLoader ? (
                <Loader />
            ) : (
                <>
                    <InputWrapper customClasses={"!gap-8"}>
                        {loginInputs.map((inpt, index) => {
                            return inpt.type === "password" ? (
                                <InputPassword
                                    key={index}
                                    value={values[inpt.name]}
                                    name={inpt.name}
                                    id={inpt.id}
                                    touch={touched[inpt.name]}
                                    error={errors[inpt.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={inpt.placeholder}
                                    disabled={false}
                                />
                            ) : (
                                <Input
                                    key={index}
                                    value={values[inpt.name]}
                                    name={inpt.name}
                                    id={inpt.id}
                                    touch={touched[inpt.name]}
                                    error={errors[inpt.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={inpt.placeholder}
                                    disabled={false}
                                />
                            );
                        })}
                    </InputWrapper>
                    {error && <p className="text-red-500">{error}</p>}
                    {showResendLink && (
                        <button
                            className="text-blue-500 underline"
                            onClick={handleResendVerification}
                        >
                            Resend verification email
                        </button>
                    )}
                    <div className="w-full flex justify-end items-center py-3">
                        <Link
                            to="/forgot-password"
                            className="text-link text-[14px] satoshi-700 "
                        >
                            Forgot Password ?
                        </Link>
                    </div>
                    <InputWrapper>
                        {btnLoader ? (
                            <BtnLoading />
                        ) : (
                            <ButtonLarge type="submit" text="Sign In" />
                        )}
                    </InputWrapper>
                    <div className="flex justify-center items-center w-full text-center mt-[7px]">
                        <h6 className="satoshi-500 text-[14px] md:text-[16px]">
                            Don't have account?{" "}
                        </h6>
                        <Link
                            to="/register"
                            className="text-link text-[14px] md:text-[16px] satoshi-500 ml-1"
                        >
                            Signup
                        </Link>
                    </div>
                    <AuthOptionText />
                    <InputWrapper>
                        <ButtonImg
                            imageRef={googleLogo}
                            customClasses={"mt-2"}
                            text="Sign-in with Google"
                            onClick={handleGoogleLogin}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <ButtonImg
                            imageRef={microsoftLogo}
                            customClasses={"mt-2"}
                            text="Sign-in with Microsoft"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <ButtonImg
                            imageRef={appleLogo}
                            customClasses={"mt-2"}
                            text="Sign-in with Apple"
                        />
                    </InputWrapper>
                </>
            )}
        </AuthForm>
    );
};

export default Login;