import React from 'react'
import InputField from '../shared/InputField'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const ContactUsForm = () => {
    return (
        <Card className='md:w-[30rem] w-full mx-auto'>

            <CardHeader>
                <CardTitle className='text-2xl'> Send Us a Message</CardTitle>
            </CardHeader>
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2> */}
            <CardContent className="grid gap-4">
                <form className="space-y-4">

                    <InputField type='text' name='name' label='Full Name' placeholder="Enter your name" required />
                    <InputField type='email' name='email' label='Email Address' placeholder="Enter your email" required />

                    <div>
                        <label htmlFor="message" className="block text-sm/6 font-medium text-gray-900">
                            Message
                        </label>
                        <textarea
                            name="message"
                            placeholder="Write your message here..."
                            rows={4}
                            className="w-full p-2 border rounded-md  resize-none"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ContactUsForm