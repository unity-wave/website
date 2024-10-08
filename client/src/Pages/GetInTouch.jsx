import React, { useState, useRef } from 'react'
import MapComponent from '../Components/MapComponent'
import axios from 'axios';
import { toast } from 'react-toastify';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { animateTextWordByWord } from '../utils/titleAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function GetInTouch() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('https://website-server-six.vercel.app/api/getintouch', formData, {
                headers: { "Content-Type": "application/json" }
            });
            // console.log(res.data);
            toast.success("Message Sent Successfully");

            // Reset form fields after successful submission
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                mobile: '',
                message: ''
            });
        } catch (err) {
            toast.success("Please try again later");
            console.error('Error submitting form:', err);
        }
    }

    const titleRef = useRef(null);

    useGSAP(() => {
        animateTextWordByWord(titleRef.current);

    }, []);


    return (

        <div id='getintouch' className='flex flex-col md:px-24 px-12 py-12 bg-[#f3f4f6] font-primary'>

            <h1 ref={titleRef} className='title text-primary font-primary font-bold text-3xl'>Get in Touch</h1>

            <div className='form-map-conatiner flex flex-col md:flex-row justify-between md:gap-16 gap-8'>

                <div className="get-in-touch-form w-full h-full flex-1 text-sm">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                        <div className='name flex items-start md:flex-row flex-col gap-5 w-full'>
                            <label className='w-full'>
                                <p className='block mb-2 text-md font-medium text-gray-900'>First Name <br /> </p>
                                <input id='firstName' type="text" value={formData.firstName} onChange={handleChange} required placeholder='John' className='input w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                            </label>
                            <label className='w-full'>
                                <p className='block mb-2 text-md font-medium text-gray-900'>Last Name <br /> </p>
                                <input id='lastName' type="text" value={formData.lastName} onChange={handleChange} required placeholder='Doe' className='input w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                            </label>
                        </div>
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>E-mail <br /> </p>
                            <input id='email' value={formData.email} onChange={handleChange} type="email" required placeholder='johndoe@gmail.com' className='input w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                        </label>
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>Mobile Number <br /> </p>
                            <input id='mobile' value={formData.mobile} onChange={handleChange} type="tel" required placeholder='9876543210' className='input w-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500' />
                        </label>
                        <label className='w-full'>
                            <p className='block mb-2 text-md font-medium text-gray-900'>Message <br /> </p>
                            <textarea id="message" value={formData.message} onChange={handleChange} rows="5" placeholder='Message' className='input w-full h-full p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'></textarea>
                        </label>
                        <button type='submit' className='btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition cursor-pointer'>Send</button>
                    </form>
                </div>

                <MapComponent />
            </div>
        </div>
    

    )
}