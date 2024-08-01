// ../app/api/contact/route.js

import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, subject, message } = await req.json();
  // console.log('Received data:', { name, email, message });
  const acctUser = 'austin.m.matherne';
  const fromEmail = acctUser+'+contact@gmail.com';
  const toEmail = acctUser+'@gmail.com';

  // Configure the transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: acctUser,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: fromEmail,
    replyTo: email,
    to: toEmail,
    subject: subject ? subject : `Message from ${name}`,
    // Plaintext
    text: 
      `Sender Name: ${name}\n`+
      `Sender Email: ${email}\n\n`+
      `Sender Message: \n${message}`
    ,
    // if HTML supported
    html: 
      `<p><b>Sender Name</b>: ${name}<br>`+
      `<b>Sender Email</b>: ${email}</p>`+
      `<p><b>Sender Message</b>:<br>${message}</p>`
    ,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export const config = {
  runtime: 'experimental-edge', // Optional: if you are deploying on Vercel Edge Functions
};

