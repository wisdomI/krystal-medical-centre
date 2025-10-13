import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { appointmentStorage } from '@/lib/appointment-storage';

export async function POST(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    if (!id || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const all = appointmentStorage.getAllAppointments();
    const apt = all.find(a => a.id === id);
    if (!apt) {
      return NextResponse.json({ success: false, message: 'Appointment not found' }, { status: 404 });
    }

    appointmentStorage.updateAppointmentStatus(id, status);

    // Attempt to email patient
    let emailSent = false;
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: false,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });

        const subjectMap: Record<string, string> = {
          confirmed: 'Your Appointment Has Been Confirmed',
          cancelled: 'Your Appointment Has Been Cancelled',
          completed: 'Your Appointment Status Update',
          pending: 'Your Appointment Status Update',
        };

        const statusText = status.charAt(0).toUpperCase() + status.slice(1);
        const html = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #005b96; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 22px;">Krystal Medical Centre</h1>
            </div>
            <div style="padding: 24px; background: white;">
              <h2 style="margin: 0 0 12px; color: #111827;">Appointment ${statusText}</h2>
              <p style="color: #374151;">Dear ${apt.firstName} ${apt.lastName},</p>
              <p style="color: #374151;">Your appointment (${apt.id}) has been <strong>${statusText.toLowerCase()}</strong>.</p>
              <div style="background:#f3f4f6; padding:12px 16px; border-radius:8px; margin:16px 0;">
                <p style="margin:0; color:#374151;">Date: ${new Date(apt.date).toLocaleDateString()} — Time: ${apt.time}</p>
                <p style="margin:0; color:#374151;">Department: ${apt.department}</p>
              </div>
              <p style="color:#374151;">If you have questions or need to reschedule, reply to this email or call +234 902 745 9017.</p>
              <p style="color:#374151;">— Krystal Medical Centre</p>
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: process.env.SMTP_FROM || 'appointments@krystalmedical.com',
          to: apt.email,
          subject: subjectMap[status] || 'Appointment Status Update',
          html,
        });
        emailSent = true;
      } catch (e) {
        console.error('Status email failed:', e);
      }
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (e) {
    console.error('Status update failed:', e);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}


