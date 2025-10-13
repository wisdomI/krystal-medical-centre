import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { appointmentStorage } from '@/lib/appointment-storage';

const appointmentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.string(),
  time: z.string(),
  department: z.string(),
  doctor: z.string().optional(),
  reason: z.string().min(10),
  urgency: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    console.log('Received appointment POST request');
    const body = await request.json();
    console.log('Request body:', body);
    
    // Validate the request data
    const validatedData = appointmentSchema.parse(body);
    console.log('Validated data:', validatedData);
    
    // Create appointment record using storage
    const appointment = appointmentStorage.addAppointment(validatedData);
    console.log('Created appointment:', appointment);

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

        // Email to patient (confirmation)
        const patientEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">Krystal Medical Centre</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Your Health, Our Priority</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Appointment Request Received</h2>
              
              <p>Dear ${validatedData.firstName} ${validatedData.lastName},</p>
              
              <p>Thank you for choosing Krystal Medical Centre. We have received your appointment request and will contact you within 24 hours to confirm your appointment.</p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Reference ID:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${appointment.id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${new Date(validatedData.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Time:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Department:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.department}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Urgency:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.urgency}</td>
                  </tr>
                </table>
              </div>
              
              <h3 style="color: #1f2937;">Next Steps:</h3>
              <ul style="color: #4b5563;">
                <li>Our staff will review your request</li>
                <li>You will receive a confirmation call or email</li>
                <li>Please arrive 15 minutes before your scheduled time</li>
                <li>Bring a valid ID and insurance card (if applicable)</li>
              </ul>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Emergency:</strong> For life-threatening emergencies, call +234 803 123 4567 immediately.
                </p>
              </div>
              
              <p>If you have any questions, please don't hesitate to contact us at +234 902 745 9017.</p>
              
              <p>Best regards,<br>Krystal Medical Centre Team</p>
            </div>
            
            <div style="background: #f3f4f6; padding: 20px; text-align: center; color: #6b7280;">
              <p style="margin: 0; font-size: 14px;">
                Krystal Medical Centre | 123 Magodo Road, Lagos | +234 902 745 9017
              </p>
            </div>
          </div>
        `;

        // Email to staff (appointment notification)
        const staffEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #dc2626; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">New Appointment Request</h1>
              <p style="margin: 5px 0 0 0; opacity: 0.9;">Krystal Medical Centre</p>
            </div>
            
            <div style="padding: 30px; background: white;">
              <h2 style="color: #1f2937; margin-bottom: 20px;">Appointment Request - ${appointment.id}</h2>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Patient Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.firstName} ${validatedData.lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.phone}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1f2937; margin-top: 0;">Appointment Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Reference ID:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${appointment.id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Date:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${new Date(validatedData.date).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Time:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Department:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.department}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Urgency:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.urgency}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #374151;">Reason:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${validatedData.reason}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #92400e;">
                  <strong>Action Required:</strong> Please contact the patient within 24 hours to confirm or reschedule this appointment.
                </p>
              </div>
              
              <p>Submitted on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `;

        // Send emails
        const emailPromises = [];

        // Send confirmation email to patient
        emailPromises.push(
          transporter.sendMail({
            from: process.env.SMTP_FROM || 'appointments@krystalmedical.com',
            to: validatedData.email,
            subject: 'Appointment Request Confirmation - Krystal Medical Centre',
            html: patientEmailHtml,
          })
        );

        // Send notification email to staff
        emailPromises.push(
          transporter.sendMail({
            from: process.env.SMTP_FROM || 'appointments@krystalmedical.com',
            to: process.env.APPOINTMENT_EMAIL || 'appointments@krystalmedical.com',
            subject: `New Appointment Request - ${appointment.id}`,
            html: staffEmailHtml,
          })
        );

        await Promise.all(emailPromises);
        emailSent = true;
        console.log('Emails sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue execution even if email fails
      }
    } else {
      console.log('Email configuration not set up - running in development mode');
      console.log('Appointment details:', appointment);
    }

    // In a real application, you would save the appointment to a database here
    console.log('Appointment created:', appointment);

    return NextResponse.json(
      { 
        success: true, 
        message: emailSent 
          ? 'Appointment request submitted successfully. Confirmation email sent.'
          : 'Appointment request submitted successfully. (Email not configured - running in development mode)',
        appointmentId: appointment.id,
        emailSent 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing appointment:', error);
    
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
        message: 'Failed to process appointment request' 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log('Received appointment GET request');
    const appointments = appointmentStorage.getAllAppointments();
    console.log('Retrieved appointments:', appointments);
    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch appointments' 
      },
      { status: 500 }
    );
  }
}
