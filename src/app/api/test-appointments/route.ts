import { NextRequest, NextResponse } from 'next/server';
import { appointmentStorage } from '@/lib/appointment-storage';

export async function GET() {
  try {
    const appointments = appointmentStorage.getAllAppointments();
    return NextResponse.json({ 
      success: true,
      appointments,
      count: appointments.length,
      message: 'Test endpoint working'
    }, { status: 200 });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Test endpoint failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Test POST received:', body);
    
    const testAppointment = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+234 902 745 9017',
      date: '2024-01-20',
      time: '10:00 AM',
      department: 'general',
      reason: 'Test appointment for debugging',
      urgency: 'routine'
    };
    
    const appointment = appointmentStorage.addAppointment(testAppointment);
    
    return NextResponse.json({ 
      success: true,
      appointment,
      message: 'Test appointment created'
    }, { status: 200 });
  } catch (error) {
    console.error('Test POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Test POST failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
