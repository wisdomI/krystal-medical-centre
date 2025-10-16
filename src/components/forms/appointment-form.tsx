'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, MessageSquare, CheckCircle } from 'lucide-react';

const appointmentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  date: z.string().min(1, 'Please select a preferred date'),
  time: z.string().min(1, 'Please select a preferred time'),
  department: z.string().min(1, 'Please select a department'),
  doctor: z.string().optional(),
  reason: z.string().min(10, 'Please provide a brief reason for your visit'),
  urgency: z.string().min(1, 'Please select urgency level'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

const departments = [
  { value: 'general', label: 'General Medicine' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'pediatrics', label: 'Pediatrics' },
  { value: 'gynecology', label: 'Gynecology' },
  { value: 'orthopedics', label: 'Orthopedics' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'neurology', label: 'Neurology' },
  { value: 'emergency', label: 'Emergency Care' },
];

const urgencyLevels = [
  { value: 'routine', label: 'Routine Check-up' },
  { value: 'urgent', label: 'Urgent (Within 24 hours)' },
  { value: 'emergency', label: 'Emergency (Immediate)' },
];

const timeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM'
];

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
  });


  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);
    console.log('Submitting appointment data:', data);
    
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        console.log('Appointment submitted successfully');
      } else {
        throw new Error(responseData.message || 'Failed to submit appointment');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert(`Failed to submit appointment: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Appointment Request Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for choosing Krystal Medical Centre. We have received your appointment request and will contact you within 24 hours to confirm your appointment.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              <strong>Next Steps:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Our staff will review your request</li>
              <li>• You will receive a confirmation call or email</li>
              <li>• Please arrive 15 minutes before your scheduled time</li>
              <li>• Bring a valid ID and insurance card (if applicable)</li>
            </ul>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="mt-6"
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Book Your Appointment</CardTitle>
        <p className="text-center text-gray-600">
          Fill out the form below and we&apos;ll get back to you within 24 hours to confirm your appointment.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                placeholder="Enter your first name"
                {...register('firstName')}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name *"
                placeholder="Enter your last name"
                {...register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address *"
                type="email"
                placeholder="your.email@example.com"
                {...register('email')}
                error={errors.email?.message}
              />
              <Input
                label="Phone Number *"
                placeholder="+234 902 745 9017"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Appointment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Preferred Date *"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                {...register('date')}
                error={errors.date?.message}
              />
              <Select
                label="Preferred Time *"
                placeholder="Select time"
                options={timeSlots.map(time => ({ value: time, label: time }))}
                {...register('time')}
                error={errors.time?.message}
              />
            </div>
            
            <Select
              label="Department *"
              placeholder="Select department"
              options={departments}
              {...register('department')}
              error={errors.department?.message}
            />
            
            <Select
              label="Urgency Level *"
              placeholder="Select urgency"
              options={urgencyLevels}
              {...register('urgency')}
              error={errors.urgency?.message}
            />
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Additional Information
            </h3>
            
            <Textarea
              label="Reason for Visit *"
              placeholder="Please describe the reason for your appointment and any symptoms you're experiencing..."
              rows={4}
              {...register('reason')}
              error={errors.reason?.message}
              helperText="Provide as much detail as possible to help us prepare for your visit"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Calendar className="h-5 w-5 mr-2" />
                  Submit Appointment Request
                </>
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
            Emergency cases should call our emergency line: +234 902 745 9017
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
