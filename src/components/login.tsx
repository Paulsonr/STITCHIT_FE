import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const router = useRouter();
  const initialLoginValues: LoginFormValues = {
    email: "",
    password: "",
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
  );
};

export default Login;
