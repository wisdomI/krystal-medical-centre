import { Metadata } from 'next';
import { AppointmentForm } from '@/components/forms/appointment-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone, MapPin, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Appointment - Krystal Medical Centre',
  description: 'Book your medical appointment online at Krystal Medical Centre. Easy scheduling with our experienced healthcare professionals.',
};

export default function AppointmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Schedule your visit with our experienced healthcare professionals. 
            We'll confirm your appointment within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <div className="lg:col-span-2">
            <AppointmentForm />
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+234 902 745 9017</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emergency</p>
                  <p className="text-red-600 font-semibold">+234 902 745 9017</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">appointments@krystalmedical.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  123 Magodo Road<br />
                  Magodo, Lagos State<br />
                  Nigeria
                </p>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Directions:</strong> Located on the main Magodo Road, 
                    opposite the shopping complex. Free parking available.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Open 24/7</span>
                  <span className="font-semibold">Every Day</span>
                </div>
              </CardContent>
            </Card>

            {/* What to Bring */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  What to Bring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Valid government-issued ID</li>
                  <li>• Insurance card (if applicable)</li>
                  <li>• List of current medications</li>
                  <li>• Medical records (if available)</li>
                  <li>• Payment method</li>
                </ul>
              </CardContent>
            </Card>

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
  );
}
