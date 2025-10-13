import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request data
    const validatedData = contactSchema.parse(body);
    
    // Try to send emails if SMTP is configured, otherwise just log
    let emailSent = false;
    
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Configure email transporter
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

    // Email to staff (contact form submission)
    const staffEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Krystal Medical Centre</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Form Details</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                <td style="padding: 8px 0; color: #6b7280;">${validatedData.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; color: #6b7280;">${validatedData.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                <td style="padding: 8px 0; color: #6b7280;">${validatedData.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #6b7280;">${validatedData.subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Message</h3>
            <p style="color: #6b7280; line-height: 1.6; margin: 0;">${validatedData.message}</p>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours.
            </p>
          </div>
          
          <p style="color: #6b7280;">Submitted on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    // Email to patient (confirmation)
    const patientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Krystal Medical Centre</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Your Health, Our Priority</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Message Received</h2>
          
          <p>Dear ${validatedData.name},</p>
          
          <p>Thank you for contacting Krystal Medical Centre. We have received your message and will respond to your inquiry within 24 hours.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1f2937; margin-top: 0;">Your Message Summary</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #6b7280;">${validatedData.subject}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Submitted:</td>
                <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <p>If you need immediate assistance, please don't hesitate to call us at:</p>
          <ul style="color: #4b5563;">
            <li><strong>General Inquiries:</strong> +234 902 745 9017</li>
            <li><strong>Emergency:</strong> +234 902 745 9017</li>
          </ul>
          
          <p>We appreciate your interest in Krystal Medical Centre and look forward to assisting you.</p>
          
          <p>Best regards,<br>Krystal Medical Centre Team</p>
        </div>
        
        <div style="background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280;">
          <p style="margin: 0; font-size: 14px;">
            Krystal Medical Centre | 123 Magodo Road, Lagos | +234 902 745 9017
          </p>
        </div>
      </div>
    `;

        // Send emails
        const emailPromises = [];

        // Send confirmation email to patient
        emailPromises.push(
          transporter.sendMail({
            from: process.env.SMTP_FROM || 'info@krystalmedical.com',
            to: validatedData.email,
            subject: 'Message Received - Krystal Medical Centre',
            html: patientEmailHtml,
          })
        );

        // Send notification email to staff
        emailPromises.push(
          transporter.sendMail({
            from: process.env.SMTP_FROM || 'info@krystalmedical.com',
            to: process.env.CONTACT_EMAIL || 'info@krystalmedical.com',
            subject: `Contact Form: ${validatedData.subject}`,
            html: staffEmailHtml,
          })
        );

        await Promise.all(emailPromises);
        emailSent = true;
        console.log('Contact form emails sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue execution even if email fails
      }
    } else {
      console.log('Email configuration not set up - running in development mode');
      console.log('Contact form submission:', validatedData);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: emailSent 
          ? 'Message sent successfully. Confirmation email sent.'
          : 'Message sent successfully. (Email not configured - running in development mode)',
        emailSent 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid form data',
          errors: error.issues 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message' 
      },
      { status: 500 }
    );
  }
}
