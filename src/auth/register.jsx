import React, { useState } from "react";
import AuthForm from "./AuthForm";
import InputWrapper from "../components/Wrappers/InputWrapper";
import { SignupInputs } from "../Assets/Data/InputsData";
import Input from "../components/Inputs/Input";
import InputPassword from "../components/Inputs/InputPassword";
import { Link, useNavigate } from "react-router-dom";
import ButtonImg from "../components/Button/ButtonImg";
import AuthOptionText from "../components/Typograpghy/AuthOptionText";
import ButtonLarge from "@/components/Button/ButtonLarge";
import googleLogo from "@/Assets/images/google.png";
import microsoftLogo from "@/Assets/images/microsoft.png";
import appleLogo from "@/Assets/images/apple.png";
import { useFormik } from "formik";
import { signupSchema } from "./Schema";
import BtnLoading from "@/components/Button/BtnLoading";
import { registerUser } from "./authFunctions";
import Popup from "./Popup"; // Ensure you have a Popup component
import { auth, createUserWithEmailAndPassword, sendEmailVerification, db, doc, setDoc } from './firebase';
import { updateProfile } from "firebase/auth";


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        companyAddress: "",
        companyContactInfo: "",
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialState,
            validationSchema: signupSchema,
            onSubmit: async (values) => {
                setLoading(true);
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
                    const user = userCredential.user;

                    // Update the user profile
                    await updateProfile(user, {
                        displayName: `${values.firstName} ${values.lastName}`,
                    });

                    // Create user document in Firestore
                    const userDoc = doc(db, 'users', user.uid);
                    await setDoc(userDoc, {
                        email: user.email,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        companyName: values.companyName,
                        companyAddress: values.companyAddress,
                        companyContactInfo: values.companyContactInfo,
                        membershipType: 'Enterprise',
                        ocrExtractions: 0,
                        chatQueries: 0,
                        uploads: 0,
                        contributors: [],
                        createdAt: new Date(),
                        isVerified: false,
                    });

                    // Send email verification
                    await sendEmailVerification(user);

                    // Show the popup
                    setPopupMessage("A verification email has been sent to your email address. Please verify your email to continue.");
                    setShowPopup(true);

                } catch (error) {
                    console.error('Error registering user:', error);
                } finally {
                    setLoading(false);
                }
            },
        });

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate("/login");
    };

    return (
        <>
            <AuthForm onSubmit={handleSubmit} formHeader="Welcome To SmartDoc">
                <InputWrapper customClasses={"!gap-3"}>
                    {SignupInputs.map((inpt, index) => (
                        inpt.type === "password" ? (
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
                        )
                    ))}
                </InputWrapper>
                <InputWrapper customClasses={"!mt-3"}>
                    {loading ? (
                        <BtnLoading />
                    ) : (
                        <ButtonLarge type="submit" text="Sign Up" />
                    )}
                </InputWrapper>
                <div className="flex justify-center items-center w-full text-center mt-[7px]">
                    <h6 className="satoshi-500 text-[14px] md:text-[16px]">
                        Already have an account?{" "}
                    </h6>
                    <Link to="/login" className="text-link text-[14px] md:text-[16px] satoshi-500 ml-1">
                        SignIn
                    </Link>
                </div>
            </AuthForm>

            {showPopup && (
                <Popup message={popupMessage} onClose={handlePopupClose} />
            )}
        </>
    );
};

export default Register;