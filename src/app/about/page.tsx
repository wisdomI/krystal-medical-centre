import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Shield, Users, Award, Clock, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Krystal Medical Centre',
  description: 'Learn about Krystal Medical Centre\'s mission, vision, and commitment to providing exceptional healthcare services in Magodo, Lagos.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'We treat every patient with empathy, kindness, and understanding, recognizing that healthcare is about healing the whole person.',
    },
    {
      icon: Shield,
      title: 'Excellence',
      description: 'We maintain the highest standards of medical care through continuous learning, advanced technology, and evidence-based practices.',
    },
    {
      icon: Users,
      title: 'Integrity',
      description: 'We uphold the highest ethical standards in all our interactions, maintaining trust and transparency with our patients and community.',
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'We embrace cutting-edge medical technology and innovative treatment approaches to provide the best possible outcomes.',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Sarah Williams',
      position: 'Chief Medical Officer',
      specialty: 'Internal Medicine',
      experience: '15 years',
      education: 'MD, University of Lagos',
    },
    {
      name: 'Dr. Michael Adebayo',
      position: 'Head of Cardiology',
      specialty: 'Cardiovascular Medicine',
      experience: '12 years',
      education: 'MD, University of Ibadan',
    },
    {
      name: 'Dr. Grace Okonkwo',
      position: 'Head of Pediatrics',
      specialty: 'Pediatric Medicine',
      experience: '10 years',
      education: 'MD, University of Nigeria',
    },
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Founded',
      description: 'Krystal Medical Centre opened its doors with a vision to provide exceptional healthcare services to the Magodo community.',
    },
    {
      year: '2012',
      title: 'Expansion',
      description: 'Added specialized departments including Cardiology and Pediatrics to meet growing community needs.',
    },
    {
      year: '2018',
      title: 'Certification',
      description: 'Received accreditation from the National Health Insurance Scheme (NHIS) and other regulatory bodies.',
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Launched online appointment booking system and patient portal for enhanced convenience.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              About Krystal Medical Centre
            </h1>
            <p className="text-xl text-brand-100 leading-relaxed">
              For over 15 years, we have been committed to providing exceptional healthcare services 
              to our community in Magodo, Lagos. Our mission is to deliver compassionate, 
              high-quality medical care that puts patients first.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="border-brand-100 bg-brand-100/50">
              <CardHeader>
                <CardTitle className="text-2xl text-brand-900">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-brand-700 leading-relaxed">
                  To provide comprehensive, compassionate, and high-quality healthcare services 
                  that promote wellness, prevent disease, and restore health. We are dedicated 
                  to treating each patient with dignity, respect, and personalized care while 
                  maintaining the highest standards of medical excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-900">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 leading-relaxed">
                  To be the leading healthcare provider in Magodo and surrounding communities, 
                  recognized for our commitment to patient-centered care, medical innovation, 
                  and community health. We envision a healthier community where everyone has 
                  access to quality healthcare services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape our commitment to exceptional patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-brand-700" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced medical professionals who lead our healthcare team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-12 w-12 text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <p className="text-brand-700 font-semibold">{leader.position}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Specialty:</strong> {leader.specialty}</p>
                    <p><strong>Experience:</strong> {leader.experience}</p>
                    <p><strong>Education:</strong> {leader.education}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our commitment to serving the community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Accreditations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards through recognized certifications and accreditations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  NHIS Accredited
                </h3>
                <p className="text-gray-600">
                  Certified by the National Health Insurance Scheme
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quality Assured
                </h3>
                <p className="text-gray-600">
                  ISO certified for quality management systems
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Patient Safety
                </h3>
                <p className="text-gray-600">
                  Committed to maintaining highest safety standards
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-brand-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Visit Our Medical Centre
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              Located in the heart of Magodo, we're easily accessible and ready to serve you.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-brand-100">
                  123 Magodo Road<br />
                  Magodo, Lagos State<br />
                  Nigeria
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Hours</h3>
                <p className="text-brand-100">
                  Open 24/7, Every Day
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <Heart className="h-8 w-8 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Emergency</h3>
                <p className="text-blue-100">
                  +234 803 123 4567<br />
                  Available 24/7<br />
                  Rapid Response
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
