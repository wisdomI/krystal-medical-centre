import Link from "next/link";
import { 
  Stethoscope, 
  Heart, 
  Plus,
  Baby,
  Pill,
  Utensils
} from "lucide-react";
import { TeamCarousel } from "@/components/team/TeamCarousel";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export default function Home() {
  const statistics = [
    { number: "+5120", label: "Happy Patients" },
    { number: "+10", label: "Years Experience" },
  ];

  const services = [
    {
      icon: Stethoscope,
      title: "General Practitioners",
      description: "Comprehensive primary care for all ages with experienced doctors.",
    },
    {
      icon: Baby,
      title: "Pregnancy Support",
      description: "Complete maternal care from conception to delivery and beyond.",
    },
    {
      icon: Utensils,
      title: "Nutrition Counseling",
      description: "Personalized nutrition plans for optimal health and wellness.",
    },
    {
      icon: Pill,
      title: "Pharmacy Services",
      description: "Full-service pharmacy with prescription and over-the-counter medications.",
    },
  ];

  const testimonials = [
    {
      name: "James Rodrigo",
      role: "CUSTOMER",
      content: "The medical team at Krystal Medical Centre provided exceptional care during my treatment. Their professionalism and expertise made me feel confident in my recovery.",
      rating: 5,
    },
  ];

  const teamMembers = [
    {
      name: "Dr. Leslie Taylor",
      specialty: "Pediatrician",
      image: "/api/placeholder/300/400",
      bio: "Specialized in pediatric care with over 10 years of experience.",
      social: ["facebook", "twitter", "youtube", "instagram"]
    },
    {
      name: "Dr. Zachary Brown",
      specialty: "Cardiologist",
      image: "/api/placeholder/300/400",
      bio: "Leading cardiologist with expertise in heart disease treatment.",
      social: ["facebook", "twitter", "youtube", "instagram"]
    },
  ];

  const faqs = [
    {
      question: "Why To Believe With Krystal Medical Centre?",
      answer: "We provide comprehensive healthcare services with experienced doctors and modern facilities."
    },
    {
      question: "Will We Get Healthcare Updates After Surgery?",
      answer: "Yes, we provide regular follow-up care and updates on your recovery progress."
    },
    {
      question: "What Is The Cost For Just Repairing?",
      answer: "Costs vary depending on the treatment required. Please contact us for a consultation."
    },
    {
      question: "What Time Will It Take To Finish My Treatment?",
      answer: "Treatment duration depends on the specific condition and individual patient needs."
    },
  ];

  const departments = [
    "LABORATORY ANALYSIS",
    "CARDIOLOGY CLINIC",
    "GYNECOLOGY CLINIC",
    "NEUROLOGY CLINIC",
    "EMERGENCY CARE",
    "PEDIATRIC CLINIC"
  ];

  const blogPosts = [
    {
      title: "How to Maintain a Healthy Heart",
      category: "MEDICAL",
      date: "Dec 15, 2024",
      image: "/api/placeholder/400/250",
      excerpt: "Learn essential tips for maintaining cardiovascular health and preventing heart disease.",
    },
    {
      title: "Mental Health Awareness Month",
      category: "MENTAL HEALTH",
      date: "Dec 10, 2024",
      image: "/api/placeholder/400/250",
      excerpt: "Understanding the importance of mental health and available support resources.",
    },
    {
      title: "Dental Care for Children",
      category: "DENTAL",
      date: "Dec 5, 2024",
      image: "/api/placeholder/400/250",
      excerpt: "Essential dental care practices for children from infancy to adolescence.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
        {/* Background image carousel */}
        <div className="hero-bg">
          <div
            className="hero-slide"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2000&auto=format&fit=crop')" }}
          />
          <div
            className="hero-slide"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2000&auto=format&fit=crop')" }}
          />
          <div
            className="hero-slide"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1622253692010-b8f75b6b9a3e?q=80&w=2000&auto=format&fit=crop')" }}
          />
        </div>
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/75 via-brand-800/60 to-brand-700/50" />
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-200">
                We Care About Your 
                <span className="text-yellow-300">
                  Health
                </span>
              </h1>
              <p className="text-lg md:text-xl text-brand-100 leading-relaxed animate-fade-in-up delay-400">
                Krystal Medical Centre provides comprehensive healthcare services with experienced doctors, 
                modern facilities, and a patient-centered approach to ensure your wellbeing.
              </p>
              <div className="pt-4 animate-fade-in-up delay-600">
              <Link href="/appointment">
                  <button className="group bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                    <span className="relative z-10">BOOK AN APPOINTMENT</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-right delay-300">
              <div className="rounded-2xl overflow-hidden">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1600&auto=format&fit=crop&crop=faces" 
                  alt="Doctor"
                  className="w-full h-80 md:h-96 object-cover rounded-2xl"
                  fallbackSrc="/api/placeholder/800/500"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-200 rounded-full animate-bounce delay-1500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Bar */}
      <section className="py-12 bg-gradient-to-r from-brand-700 via-brand-800 to-brand-700 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 animate-slide-right"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center text-white group hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300 animate-count-up">
                  {stat.number}
                </div>
                <div className="text-brand-100 text-lg group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
                {/* Hover effect line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-yellow-300 mx-auto mt-2 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative">
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-brand-100/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-brand-500/20 rounded-full animate-pulse delay-1000"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="animate-fade-in-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Best Services For Your 
                <span className="text-brand-700">Solution</span>
              </h2>
            </div>
            <div className="animate-fade-in-right">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We offer comprehensive medical services designed to meet all your healthcare needs 
                with the highest standards of care and professionalism.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-brand-100 rounded-xl p-6 lg:p-8 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white border border-transparent hover:border-brand-100 relative overflow-hidden">
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-brand-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-brand-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <service.icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-brand-800 transition-colors duration-300">
                  {service.title}
                </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
                  
                  {/* Hover effect arrow */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="inline-flex items-center text-brand-700 font-medium">
                      Learn More
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-brand-100/30 to-brand-500/10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-brand-700 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-brand-800 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Book Appointment Or Call: 
              <span className="text-brand-700">(+234) 902 745 9017</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Select Department</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg">
                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Pediatrics</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Select Doctor</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg">
                  <option>Dr. Smith</option>
                  <option>Dr. Johnson</option>
                  <option>Dr. Brown</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Full Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg" placeholder="Your full name" />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Phone Number</label>
                <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg" placeholder="Your phone number" />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Choose Date</label>
                <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg" />
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-brand-700 transition-colors">Choose Time</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-700 focus:border-transparent transition-all duration-300 hover:border-brand-500 focus:shadow-lg">
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="group bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
                <span className="relative z-10">BOOK AN APPOINTMENT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="flex justify-center">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face" 
                  alt="Customer testimonial" 
                  className="w-80 h-80 object-cover rounded-full"
                  fallbackSrc="/api/placeholder/400/400"
                />
              </div>
            </div>
            <div>
              <div className="text-6xl text-brand-700 mb-6">&ldquo;</div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {testimonials[0].content}
              </p>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{testimonials[0].name}</p>
                <p className="text-brand-700 font-medium">{testimonials[0].role}</p>
              </div>
              <div className="flex mt-6 space-x-2">
                <div className="w-3 h-3 bg-brand-700 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-brand-100/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-teal-100/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-100/20 rounded-full animate-pulse delay-1000"></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our 
              <span className="text-brand-700">Expert Team</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <TeamCarousel teamMembers={teamMembers} />
          </div>
          
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-100/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-brand-500/20 rounded-full animate-pulse delay-1000"></div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              We&apos;ve Got 
              <span className="text-brand-700">Answers</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="group border-b border-gray-200 py-6 hover:bg-gray-50/50 transition-all duration-300 rounded-lg px-4 -mx-4">
                <div className="flex justify-between items-center cursor-pointer group-hover:text-brand-700 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-800 transition-colors duration-300">{faq.question}</h3>
                  <div className="flex items-center space-x-2">
                    <Plus className="h-6 w-6 text-brand-700 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
                {/* Hidden answer that could be shown on click */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">Our Departments</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Link 
                    key={index}
                    href={`/services#${dept.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                    className={`block p-4 rounded-lg cursor-pointer transition-colors ${
                      index === 1 ? 'bg-brand-700 text-white' : 'bg-white text-gray-700 hover:bg-brand-100'
                    }`}
                  >
                    {dept}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h4 className="text-3xl font-bold text-gray-900 mb-6">Cardiology Clinic</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Our cardiology department provides comprehensive heart care services including diagnosis, 
                  treatment, and prevention of cardiovascular diseases.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  We use state-of-the-art equipment and the latest treatment methods to ensure the best 
                  outcomes for our patients.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">Neurocritical Care</span>
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">Neuro-Oncology</span>
                  <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm">Geriatric Neurology</span>
                </div>
                <button className="bg-brand-700 hover:bg-brand-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  LEARN MORE
                </button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 text-brand-100 opacity-20">
                <Heart className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Recent Posts
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <ImageWithFallback 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  fallbackSrc="/api/placeholder/400/250"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-brand-100 text-brand-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link href="/blog" className="text-brand-700 font-medium hover:text-brand-800">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/blog">
              <button className="bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors shadow-lg">
                READ MORE BLOGS
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {['Lifetrace', 'medcare', 'BETAEL', 'Healer.', 'SOVEN'].map((logo, index) => (
              <div key={index} className="text-center text-gray-400 text-xl font-semibold">
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-brand-700 via-brand-800 to-brand-700 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12 animate-slide-right"></div>
        </div>
        
        <div className="container text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
            Subscribe Us To Get More 
            <span className="text-yellow-300">Updates</span>
          </h2>
          <div className="max-w-md mx-auto flex gap-4 animate-fade-in-up delay-300">
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-1 p-4 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300 hover:shadow-lg focus:shadow-xl"
            />
            <button className="group bg-white text-brand-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">SUBSCRIBE</span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}