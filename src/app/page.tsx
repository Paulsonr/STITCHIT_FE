"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface LoginFormValues {
  email: string;
  password: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LandingPage = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const initialRegisterValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };

  const initialLoginValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleRegisterSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    try {
      await axios.post("http://localhost:5000/register", values);
      setSubmitting(false);
      router.push("/");
    } catch (error) {
      console.error("Error registering user:", error);
      setSubmitting(false);
    }
  };

  const handleLoginSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      await axios.post("http://localhost:5000/login", values);
      setSubmitting(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging in user:", error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>STITCH IT</h1>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">
            {isRegister ? "Register" : "Login"}
          </h2>
          {isRegister ? (
            <Formik
              initialValues={initialRegisterValues}
              validationSchema={RegistrationSchema}
              onSubmit={handleRegisterSubmit}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Name"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div className="mb-4">
                    <Field
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={initialLoginValues}
              validationSchema={LoginSchema}
              onSubmit={handleLoginSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white p-2 rounded"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          )}
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-500 underline"
            >
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
