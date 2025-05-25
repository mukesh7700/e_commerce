import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

// Define a function to send an email
export const sendEmail = async (recipient: string, subject: string, emailComponent: React.ReactElement): Promise<{ success: boolean; message?: string }>  => {
  // Ensure the HTML is resolved before passing it to the mail options
try {
  const emailHtml = await render(emailComponent);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
  port: 587,
  secure: true,
     // You can change to another email provider if necessary
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from:'process.env.EMAIL_USER',
    to: recipient,
    subject: subject,
    html: emailHtml,  // Make sure this is now a string, not a Promise<string>
  };

  // Send the email
  await transporter.sendMail(mailOptions);
  return { success: true }; 
} catch (error) {
  if (error instanceof Error) {
    console.error('Error sending email:', error.message);
    return { success: false, message: error.message }; // Return error message
  } else {
    console.error('Unknown error:', error);
    return { success: false, message: 'An unknown error occurred' }; // Generic fallback message
  }}

};

 
