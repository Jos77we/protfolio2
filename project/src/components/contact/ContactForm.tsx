import React, { useState } from 'react';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string(),
  message: Yup.string().required('Message is required'),
  channel: Yup.string().required('Please select a contact method'),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      channel: 'email',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // TODO: Implement form submission
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      formik.resetForm();
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...formik.getFieldProps('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...formik.getFieldProps('phone')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            {...formik.getFieldProps('message')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message here..."
          />
          {formik.touched.message && formik.errors.message && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                {...formik.getFieldProps('channel')}
                value="email"
                className="w-4 h-4 text-blue-600"
              />
              <Mail className="w-4 h-4 ml-2 mr-1" />
              <span className="ml-1">Email</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                {...formik.getFieldProps('channel')}
                value="whatsapp"
                className="w-4 h-4 text-blue-600"
              />
              <MessageSquare className="w-4 h-4 ml-2 mr-1" />
              <span className="ml-1">WhatsApp</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}