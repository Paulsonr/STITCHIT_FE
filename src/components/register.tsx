import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
});
const Register = () => {
  const router = useRouter();
  const { register } = useContext(AuthContext);
  const initialRegisterValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
  };
  const handleRegisterSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    await register(values);
    setSubmitting(false);
  };

  return (
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
  );
};

export default Register;
