'use server';

import { Resend } from 'resend';

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
        return { success: false, message: 'All fields are required' };
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: `${name} <onboarding@sohamgupta.me>`,
        to: ['contact@sohamgupta.me', 'soham.gupta003@gmail.com'],
        replyTo: email as string,
        subject: `RepoGPT Contact: ${subject}`,
        html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                    <h2 style="color: #444; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <p style="color: #777; font-size: 12px; margin-top: 30px;">This email was sent from the RepoGPT contact form.</p>
                </div>
            `,
    });

    if (error) {
        console.error('Resend error:', error);
        return { success: false, message: 'Something went wrong. Please try again later.' };
    }
    
    return { success: true, message: 'Your message has been sent! We\'ll get back to you soon.' };
}
