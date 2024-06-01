"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface Location {
  type: string;
  coordinates: [number, number];
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  role: 'consumer' | 'tailor' | '';
  location: Location;
  phone: string;
  specialization?: string;
}

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: Yup.string().oneOf(['consumer', 'tailor'], 'Invalid role').required('Role is required'),
  location: Yup.object().shape({
    type: Yup.string().oneOf(['Point']).required('Location type is required'),
    coordinates: Yup.array().of(Yup.number()).length(2).required('Coordinates are required')
  }).required('Location is required'),
  phone: Yup.string().required('Phone number is required'),
  specialization: Yup.string().when('role', {
    is: (value: any) => value === 'tailor',
    then: Yup.string().required('Specialization is required for tailors'),
    otherwise: Yup.string().notRequired(),
  }),
});

const Register = () => {
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    role: '',
    location: { type: 'Point', coordinates: [0, 0] },
    phone: '',
    specialization: '',
  };

  const handleSubmit = async (values: RegisterFormValues, { setSubmitting }: FormikHelpers<RegisterFormValues>) => {
    try {
      await axios.post('http://localhost:5000/register', values);
      setSubmitting(false);
      router.push('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={RegistrationSchema}
          onSubmit={handleSubmit}
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
                <ErrorMessage name="name" component="div" className="text-red-600 text-sm" />
              </div>
              <div className="mb-4">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
              </div>
              <div className="mb-4">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
              </div>
              <div className="mb-4">
                <Field
                  name="role"
                  as="select"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                >
                  <option value="" label="Select role" />
                  <option value="consumer" label="Consumer" />
                  <option value="tailor" label="Tailor" />
                </Field>
                <ErrorMessage name="role" component="div" className="text-red-600 text-sm" />
              </div>
              <div className="mb-4">
                <Field
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                <ErrorMessage name="phone" component="div" className="text-red-600 text-sm" />
              </div>
              {values.role === 'tailor' && (
                <div className="mb-4">
                  <Field
                    name="specialization"
                    type="text"
                    placeholder="Specialization"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                  <ErrorMessage name="specialization" component="div" className="text-red-600 text-sm" />
                </div>
              )}
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
      </div>
    </div>
  );
};

export default Register;
