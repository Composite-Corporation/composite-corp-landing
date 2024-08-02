// components/RequestDemoForm.js
import { useState } from 'react';
import styles from '../styles/RequestDemoForm.module.css';

const RequestDemoForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        jobTitle: '',
        companyName: '',
        phoneNumber: '',
        comments: ''
    });

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // success or error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
      
        const data = await response.json();
      
        if (response.ok) {
            setMessage('Your response has been recorded!');
            setMessageType('success');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                jobTitle: '',
                companyName: '',
                phoneNumber: '',
                comments: ''
            });
        } else {
            setMessage(`Error: ${data.error}`);
            setMessageType('error');
        }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Request a Demo</h2>
        <p>Fill out the form to connect with a member of our sales team.</p>
        <div className={styles.formGroup}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <input
                type="email"
                name="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="jobTitle"
                placeholder="Job Title*"
                value={formData.jobTitle}
                onChange={handleChange}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <input
                type="text"
                name="companyName"
                placeholder="Company Name*"
                value={formData.companyName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number*"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <textarea
                name="comments"
                placeholder="Additional Comments (Optional)"
                value={formData.comments}
                onChange={handleChange}
            />
        </div>
        <div className={styles.formGroup}>
            <button type="submit">Get in Touch</button>
        </div>
        {message && (
            <p className={messageType === 'success' ? styles.success : styles.error}>
                {message}
            </p>
        )}
    </form>
  );
};

export default RequestDemoForm;
