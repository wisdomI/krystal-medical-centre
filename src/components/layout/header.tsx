'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, Phone, Search } from 'lucide-react';
import { AdminDropdown } from './admin-dropdown';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-brand-800 text-white py-2">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Magodo, Lagos, NG</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(+234) 902 745 9017</span>
              </div>
            </div>
            <Link href="/appointment">
              <button className="bg-brand-700 hover:bg-brand-800 text-white px-4 py-2 rounded text-sm font-medium transition-colors hover:shadow-md">
                BOOK NOW
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="border-b border-gray-200">
        <div className="container">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <span className="text-brand-700 text-2xl font-bold">Krystal</span>
                <span className="text-gray-600 text-lg font-medium block -mt-1">Medical Centre</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors relative ${
                      isActive 
                        ? 'text-brand-700' 
                        : 'text-gray-700 hover:text-brand-700'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-700 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Admin Dropdown and Search */}
            <div className="hidden lg:flex items-center space-x-4">
              <AdminDropdown />
              <Search className="h-6 w-6 text-gray-600 hover:text-brand-700 cursor-pointer transition-colors" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors py-2 px-3 rounded-lg ${
                      isActive 
                        ? 'text-brand-700 bg-brand-100' 
                        : 'text-gray-700 hover:text-brand-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-200">
                <AdminDropdown />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}