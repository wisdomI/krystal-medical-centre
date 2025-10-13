import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Shield, 
  Brain, 
  Bone,
  Eye,
  Baby,
  ArrowRight,
  Clock,
  Phone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services - Krystal Medical Centre',
  description: 'Comprehensive healthcare services at Krystal Medical Centre including general medicine, cardiology, pediatrics, emergency care, and specialized treatments.',
};

export default function ServicesPage() {
  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const services = [
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Comprehensive primary healthcare services for all ages with experienced physicians.',
      features: [
        'Annual health check-ups',
        'Chronic disease management',
        'Preventive care',
        'Health screenings',
        'Vaccinations',
        'Minor procedures'
      ],
      duration: '30-60 minutes',
      availability: 'Open 24/7, Every Day'
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Advanced heart care and cardiovascular disease prevention and treatment.',
      features: [
        'ECG and stress testing',
        'Echocardiography',
        'Heart disease prevention',
        'Hypertension management',
        'Cardiac rehabilitation',
        'Consultation and follow-up'
      ],
      duration: '45-90 minutes',
      availability: 'Open 24/7, Every Day'
    },
    {
      icon: Users,
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents.',
      features: [
        'Well-child check-ups',
        'Immunizations',
        'Growth monitoring',
        'Developmental assessments',
        'Acute illness care',
        'Parent counseling'
      ],
      duration: '30-45 minutes',
      availability: 'Open 24/7, Every Day'
    },
    {
      icon: Shield,
      title: 'Emergency Care',
      description: '24/7 emergency medical services with rapid response and critical care.',
      features: [
        'Trauma care',
        'Critical care medicine',
        'Emergency surgery',
        'Ambulance services',
        'Intensive care unit',
        'Emergency consultations'
      ],
      duration: 'Immediate response',
      availability: '24/7 Emergency Services'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert care for disorders of the nervous system and brain.',
      features: [
        'Headache and migraine treatment',
        'Epilepsy management',
        'Stroke care',
        'Neurological examinations',
        'Brain imaging interpretation',
        'Cognitive assessments'
      ],
      duration: '60-90 minutes',
      availability: 'Tuesday - Thursday: 10:00 AM - 4:00 PM'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Comprehensive care for bones, joints, muscles, and connective tissues.',
      features: [
        'Joint pain management',
        'Fracture treatment',
        'Sports medicine',
        'Arthritis care',
        'Physical therapy referrals',
        'Surgical consultations'
      ],
      duration: '45-75 minutes',
      availability: 'Open 24/7, Every Day'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to complex surgeries.',
      features: [
        'Comprehensive eye exams',
        'Glaucoma screening',
        'Cataract surgery',
        'Diabetic eye care',
        'Vision correction',
        'Pediatric eye care'
      ],
      duration: '30-60 minutes',
      availability: 'Open 24/7, Every Day'
    },
    {
      icon: Baby,
      title: 'Gynecology',
      description: 'Specialized women\'s health services throughout all life stages.',
      features: [
        'Annual gynecological exams',
        'Prenatal care',
        'Family planning',
        'Menopause management',
        'Cancer screenings',
        'Minimally invasive surgery'
      ],
      duration: '45-75 minutes',
      availability: 'Open 24/7, Every Day'
    },
  ];

  const additionalServices = [
    'Laboratory Services',
    'Radiology & Imaging',
    'Pharmacy Services',
    'Physical Therapy',
    'Nutrition Counseling',
    'Mental Health Services',
    'Dental Care',
    'Dermatology',
    'Urology',
    'Endocrinology'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Medical Services
            </h1>
            <p className="text-xl text-brand-100 leading-relaxed">
              Comprehensive healthcare services delivered with compassion, expertise, and cutting-edge technology. 
              We provide everything from routine check-ups to specialized treatments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Specialized Medical Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced medical professionals provide expert care across various specialties, 
              ensuring you receive the best treatment for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} id={toSlug(service.title)} className="scroll-mt-24">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-brand-700" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Services Include:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                            <ArrowRight className="h-3 w-3 mr-2 text-brand-700" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-sm font-semibold">{service.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Available</p>
                          <p className="text-sm font-semibold">{service.availability}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Supporting services to ensure comprehensive healthcare delivery and patient convenience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {additionalServices.map((service, index) => (
              <div key={index} id={toSlug(service)} className="scroll-mt-24">
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <p className="text-sm font-semibold text-gray-900">{service}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Quality */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Services?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Certified Excellence</h3>
                    <p className="text-gray-600">
                      All our medical professionals are certified and licensed, ensuring you receive care from qualified experts.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h3>
                    <p className="text-gray-600">
                      We focus on your individual needs and preferences, providing personalized treatment plans.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenient Scheduling</h3>
                    <p className="text-gray-600">
                      Easy online appointment booking and flexible scheduling to fit your busy lifestyle.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="h-6 w-6 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Technology</h3>
                    <p className="text-gray-600">
                      State-of-the-art medical equipment and modern facilities for accurate diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-100 to-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Book your appointment online or call us</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Arrive 15 minutes early for check-in</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-700">Receive comprehensive care from our experts</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Link href="/appointment">
                    <Button className="w-full">
                      Book Appointment Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      Contact Us for Questions
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Emergency Services Available 24/7
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            For life-threatening emergencies, our emergency department is staffed around the clock 
            with experienced medical professionals ready to provide immediate care.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-red-700 rounded-lg p-6">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trauma Care</h3>
              <p className="text-red-100">Immediate response to accidents and injuries</p>
            </div>
            
            <div className="bg-red-700 rounded-lg p-6">
              <Heart className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Critical Care</h3>
              <p className="text-red-100">Advanced life support and intensive care</p>
            </div>
            
            <div className="bg-red-700 rounded-lg p-6">
              <Phone className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Response</h3>
              <p className="text-red-100">Quick assessment and treatment</p>
            </div>
          </div>
          
          <a 
            href="tel:+2348031234567"
            className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
          >
            <Phone className="h-6 w-6 mr-2" />
            Emergency: +234 803 123 4567
          </a>
        </div>
      </section>
    </div>
  );
}
