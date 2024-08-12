import React, { useState } from 'react';
import './ContactPage.css'; 
import { database } from '../../../firebase/firebase'; 
import { ref, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom'; // Updated import for navigation

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
        organisationName: '', 
        contactMethod: '', 
        terms: false 
    });
    const [showMessageLink, setShowMessageLink] = useState(false);
    const [messageId, setMessageId] = useState('');
    const navigate = useNavigate(); // Updated hook

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email || !formData.message || !formData.terms) {
            alert('Please fill in all required fields and agree to the terms.');
            return;
        }

        try {
            const contactsRef = ref(database, 'Contacts'); // Reference to the Contacts node
            const newMessageRef = push(contactsRef); // Create a new reference with a unique key
            await set(newMessageRef, formData);
            alert('Message sent successfully!');
            
            // Set state to show the message link option
            setMessageId(newMessageRef.key);
            setShowMessageLink(true);

            // Optionally reset form data
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: '',
                organisationName: '',
                contactMethod: '',
                terms: false
            });
        } catch (error) {
            console.error('Error sending message:', error.message);
            alert(`Error sending message: ${error.message}`); // Fixed template literal
        }
    };

    const handleViewMessage = () => {
        navigate(`/message/${messageId}`); // Redirect to the message page with the message ID
    };

    return (
        <div className="contact-container">
            <h1 className="main-heading">Contact Us</h1>
            <p className="intro-text">We value your request and will respond as soon as possible. For assistance, call 0800 First Solution (0000 000 000).</p>

            <div className="company-details">
                <h2 className="section-heading">About First Step Solutions</h2>
                <p>First Step Solutions aims to transform health and safety by focusing on positive outcomes rather than just avoiding errors. They propose the Safely Different app to promote a proactive safety culture through collaboration and problem-solving.</p>

                <h2 className="section-heading">Client Organisation</h2>
                <p>First Step Solutions spreads the ‘Safety 2’ perspective, helping people understand and dynamically assess health and safety principles. They need an app to address the issue of merely ticking boxes without understanding safety guidelines.</p>

                <p>Our project aims to revolutionize Health & Safety practices by fostering collaboration and innovation, creating safer and healthier workplaces.</p>
            </div>

            <form className="enquiry-form" onSubmit={handleSubmit}>
                <h2 className="section-heading">Enquiry Form</h2>
                <label>Your enquiry</label>
                <select name="enquiryType" value={formData.enquiryType || ''} onChange={handleChange}>
                    <option value="">What are you enquiring about?</option>
                    {/* Add more options as needed */}
                </select>

                <h2 className="section-heading">Your Details</h2>
                <label>First name:</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                <label>Last name:</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                <label>Organisation name (optional):</label>
                <input type="text" name="organisationName" value={formData.organisationName} onChange={handleChange} />
                <label>Preferred method of contact:</label>
                <div className="contact-method-inline">
                    <label>
                        <input type="radio" name="contactMethod" value="email" checked={formData.contactMethod === 'email'} onChange={handleChange} /> Email
                    </label>
                    <label>
                        <input type="radio" name="contactMethod" value="phone" checked={formData.contactMethod === 'phone'} onChange={handleChange} /> Phone
                    </label>
                </div>
                <label>Email address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <label>Phone number:</label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                <label>Message:</label>
                <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
                <div className="terms">
                    <input type="checkbox" name="terms" id="terms" checked={formData.terms} onChange={handleChange} />
                    <label htmlFor="terms">I agree to the terms of First Solutions Legal & Privacy Policy</label>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>

            {showMessageLink && (
                <div className="message-link">
                    <p>Your message has been sent successfully!</p>
                    <button onClick={handleViewMessage}>Go into comment section</button>
                </div>
            )}
        </div>
    );
}

export default ContactPage;
