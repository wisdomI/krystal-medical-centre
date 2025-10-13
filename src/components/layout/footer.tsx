import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Doctors', href: '/doctors' },
    { name: 'Our Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  const openingHours = [
    { day: 'Open', time: '24/7 - Every Day' },
  ];

  return (
    <footer className="bg-brand-800 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-white text-2xl font-bold">Krystal Medical Centre</span>
            </div>
            <p className="text-brand-100 mb-6 leading-relaxed">
              Your trusted healthcare partner providing comprehensive medical services 
              with experienced doctors and modern facilities.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-brand-100">
                <MapPin className="h-5 w-5" />
                <span>123 Magodo, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-100">
                <Mail className="h-5 w-5" />
                <span>info@krystalmedical.com</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-100">
                <Phone className="h-5 w-5" />
                <span>(+234) 801 234 5678</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center hover:bg-brand-500 transition-colors cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-brand-100 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Opening Hours</h3>
            <div className="space-y-3">
              {openingHours.map((schedule, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-brand-100">{schedule.day}</span>
                  <span className="text-white font-medium">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-brand-100">
              © {currentYear} Krystal Medical Centre - All rights reserved.
            </p>
            <p className="text-brand-100 mt-2 md:mt-0">
              Designed by Krystal Medical Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}