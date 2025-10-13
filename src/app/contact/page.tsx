'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Navigation,
  Car,
  Bus
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+234 902 745 9017', '+234 902 745 9017 (Emergency)'],
      description: 'Call us for appointments and general inquiries',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@krystalmedical.com', 'appointments@krystalmedical.com'],
      description: 'Send us an email anytime',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Magodo Road', 'Magodo, Lagos State', 'Nigeria'],
      description: 'Visit us at our medical centre',
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Open 24/7, Every Day'],
      description: 'Our operating hours',
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for contacting Krystal Medical Centre. We have received your message 
                and will get back to you within 24 hours.
              </p>
              <Button onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-brand-100 leading-relaxed">
              Get in touch with Krystal Medical Centre. We're here to help with your healthcare needs 
              and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Full Name *"
                        placeholder="Enter your full name"
                        {...register('name')}
                        error={errors.name?.message}
                      />
                      <Input
                        label="Phone Number *"
                        placeholder="+234 902 745 9017"
                        {...register('phone')}
                        error={errors.phone?.message}
                      />
                    </div>

                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="your.email@example.com"
                      {...register('email')}
                      error={errors.email?.message}
                    />

                    <Input
                      label="Subject *"
                      placeholder="What is this regarding?"
                      {...register('subject')}
                      error={errors.subject?.message}
                    />

                    <Textarea
                      label="Message *"
                      placeholder="Please describe your inquiry or concern..."
                      rows={6}
                      {...register('message')}
                      error={errors.message?.message}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-brand-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Emergency Notice */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-red-800 mb-2">Emergency?</h4>
                  <p className="text-sm text-red-700 mb-3">
                    For life-threatening emergencies, call our emergency line immediately:
                  </p>
                  <a 
                    href="tel:+2349027459017"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency: +234 902 745 9017
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Located in the heart of Magodo, we're easily accessible by car, bus, or taxi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive Map</p>
                <p className="text-sm text-gray-500">
                  Google Maps integration would go here
                </p>
              </div>
            </div>

            {/* Directions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Car className="h-5 w-5 mr-2" />
                    By Car
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Take Magodo Road from Lagos-Ibadan Expressway</li>
                    <li>• We're located on the right side, opposite the shopping complex</li>
                    <li>• Free parking available in our secure parking lot</li>
                    <li>• Disabled parking spaces available</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bus className="h-5 w-5 mr-2" />
                    By Public Transport
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Multiple bus routes serve Magodo Road</li>
                    <li>• Bus stops within 5 minutes walking distance</li>
                    <li>• BRT routes available from various parts of Lagos</li>
                    <li>• Taxi and ride-hailing services available</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-brand-100 bg-brand-100/50">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-brand-900 mb-2">Parking Information</h4>
                  <ul className="space-y-1 text-brand-700 text-sm">
                    <li>• Free parking for patients and visitors</li>
                    <li>• 24/7 security surveillance</li>
                    <li>• Wheelchair accessible parking</li>
                    <li>• Valet parking available for emergencies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
