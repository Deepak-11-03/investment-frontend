'use client';
import ContactUsForm from "@/components/forms/ContactUsForm";
import React from "react";

export default function ContactUs() {


    const handleSubmit = (val: any) => {
        console.log(val)
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Hero Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-700">Contact Us</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Have questions? We’re here to help. Reach out to us today!
                </p>
            </section>

            {/* Contact Information */}
            <section className="grid md:grid-cols-2 gap-8 justify-between">
                {/* Left: Contact Details */}
                <div className="bg-white p-6 ">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600">
                        Feel free to reach out to us via phone, email, or visit our office.
                    </p>
                    <div className="mt-4 space-y-3 text-gray-700">
                        <p><strong>📍 Address:</strong> 123 Investment Street, New York, NY 10001</p>
                        <p><strong>📞 Phone:</strong> +1 (123) 456-7890</p>
                        <p><strong>✉ Email:</strong> support@investmentplatform.com</p>
                        <p><strong>🕒 Business Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
                    </div>
                </div>

                {/* Right: Contact Form */}
              <ContactUsForm handleSubmit={handleSubmit}/>
            </section>
        </div>
    );
}
