// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { firstName, lastName, email, jobTitle, companyName, phoneNumber, comments } = req.body;

        console.log('Received request with the following data:', req.body);
        console.log('EMAIL:', process.env.EMAIL ? 'Set' : 'Not Set');
        console.log('EMAIL_KEY:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not Set');
        console.log('TO_EMAIL:', process.env.TO_EMAIL ? 'Set' : 'Not Set');

        // Create a transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD, // Your email password or an app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: process.env.EMAIL, // Sender address
            to: process.env.TO_EMAIL, // List of receivers
            subject: 'Composite.ai - New Demo Request',
            text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Job Title: ${jobTitle}
                Company Name: ${companyName}
                Phone Number: ${phoneNumber}
                Comments: ${comments}
            `,
        };

        try {
            // Send email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
