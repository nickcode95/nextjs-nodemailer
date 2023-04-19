import React, { useState } from 'react';


export default function Contact() {
    const [form, setForm] = useState('')
    // Update fName variable with text captured from field
    const [fullForm, setFullForm] = useState({
        fullName: '',
        email: '',
        company: '',
        message: ''
    });

    // Function to capture event from first name field
    function handleChange(e) {
        const { name, value } = e.target;
        setFullForm(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(fullForm)
    }


      const handleSubmit = async (e) => {
        e.preventDefault()

		if (fullForm.fullName && fullForm.email && fullForm.company && fullForm.message) {
			setForm({ state: 'loading' })
			try {
				const res = await fetch(`api/nodemailer`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(fullForm),
				})

				const { error } = await res.json()

				if (error) {
					setForm({
						state: 'error',
						message: error,
					})
					return
				}

				setForm({
					state: 'success',
					message: 'Your message was sent successfully.',
				})
				setFullForm({
					fullName: '',
					email: '',
					message: '',
                    company: ''
				})
			} catch (error) {
				setForm({
					state: 'error',
					message: 'Something went wrong',
				})
			}
		}
      };

    return (
        <div>
            <section className="border-b-4 mb-4 px-12">
                <h1 className="text-3xl font-bold pb-4">Contact Us</h1>
            </section>
            <section>
                <div className="flex items-center justify-center p-12">

                    <div className="mx-auto w-full max-w-[550px]">
                    <form  onSubmit={(e) => handleSubmit(e)}>
                            <div className="mb-5">
                                <label
                                    className="mb-3 block text-base font-medium text-gray-300">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Full Name"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                    onChange={handleChange}
                                    value={fullForm.fullName}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    for="email"
                                    className="mb-3 block text-base font-medium text-gray-300"
                                >
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="example@domain.com"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                    onChange={handleChange}
                                    value={fullForm.email}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    for="subject"
                                    className="mb-3 block text-base font-medium text-gray-300"
                                >
                                    Company *
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    placeholder="Enter your Company Name"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                    onChange={handleChange}
                                    value={fullForm.company}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    for="message"
                                    className="mb-3 block text-base font-medium text-gray-300"
                                >
                                    Message
                                </label>
                                <textarea
                                    rows="4"
                                    name="message"
                                    id="message"
                                    placeholder="Type your message"
                                    className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    onChange={handleChange}
                                    value={fullForm.message}
                                ></textarea>
                            </div>
                            <div className='text-center'>
                           <button><input type='submit'  /></button> 
				{form.state === 'loading' ? (
					<div>Sending....</div>
				) : form.state === 'error' ? (
					<div>{form.message}</div>
				) : (
					form.state === 'success' && <div>Sent successfully</div>
				)}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>

    )
}
