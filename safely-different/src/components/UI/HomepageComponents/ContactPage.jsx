import React from 'react';

const ContactPage = () => {
    return (
        <div className="contact-container">
            <h1 style={{ fontWeight: 'bold', fontSize: '2em' }}>Contact Us</h1>
            <p>We value your request and will respond as soon as possible. For  assistance, call 0800 First Solution (0000 000 000).</p>

            <div className="company-details">
                <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>About First Step Solutions</h2>
                <p>First Step Solutions aims to transform health and safety by focusing on positive outcomes rather than just avoiding errors. They propose the Safely Different app to promote a proactive safety culture through collaboration and problem-solving.</p>

                <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Client Organisation</h2>
                <p>First Step Solutions spreads the ‘Safety 2’ perspective, helping people understand and dynamically assess health and safety principles. They need an app to address the issue of merely ticking boxes without understanding safety guidelines.</p>

                <p>Our project aims to revolutionize Health & Safety practices by fostering collaboration and innovation, creating safer and healthier workplaces.</p>
            </div>

            <form className="enquiry-form">
                <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Enquiry Form</h2>
                <label>Your enquiry</label>
                <select>
                    <option>What are you enquiring about?</option>
                    {/* Add more options as needed */}
                </select>

                <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Your Details</h2>
                <label>First name:</label>
                <input type="text" name="firstName" />
                <label>Last name:</label>
                <input type="text" name="lastName" />
                <label>Organisation name (optional):</label>
                <input type="text" name="organisationName" />
                <label>Preferred method of contact:</label>
                <div>
                    <input type="radio" name="contactMethod" value="email" /> Email
                    <input type="radio" name="contactMethod" value="phone" /> Phone
                </div>
                <label>Email address:</label>
                <input type="email" name="email" />
                <label>Phone number:</label>
                <input type="tel" name="phoneNumber" />
                <label>Message:</label>
                <textarea name="message"></textarea>
                <div>
                    <input type="checkbox" name="terms" /> I agree to the terms of First Solutions Legal & Privacy Policy
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactPage;
