'use client';

import React from 'react';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface TeamMember {
  name: string;
  specialty: string;
  image: string;
  bio: string;
  social: string[];
}

interface TeamCarouselProps {
  teamMembers: TeamMember[];
  autoPlayMs?: number;
}

export function TeamCarousel({ teamMembers, autoPlayMs = 4500 }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const numMembers = teamMembers.length;

  const next = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % numMembers);
  }, [numMembers]);

  const prev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + numMembers) % numMembers);
  }, [numMembers]);

  React.useEffect(() => {
    const id = setInterval(() => {
      next();
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [next, autoPlayMs]);

  // Number of slides visible by breakpoint (1 on mobile, 2 on md+)
  const visibleCount = 2;

  // Build an array of indices for the current viewport window
  const getVisibleIndices = (): number[] => {
    const arr: number[] = [];
    for (let i = 0; i < visibleCount; i++) {
      arr.push((currentIndex + i) % numMembers);
    }
    return arr;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className="relative">
      {/* Slider track */}
      <div className="flex gap-6 md:gap-8 items-stretch">
        {/* Render exactly visibleCount slides; on small screens each takes 100%, on md 50% */}
        {visibleIndices.map((idx) => {
          const member = teamMembers[idx];
          return (
            <div key={member.name} className="w-full md:w-1/2 flex-shrink-0">
              <div className="group bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-brand-100 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-brand-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="relative mb-6">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-64 h-80 object-cover rounded-xl mx-auto group-hover:scale-105 transition-transform duration-500"
                      fallbackSrc="/api/placeholder/300/400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                      <div className="text-white text-center">
                        <p className="text-sm font-medium">View Profile</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-brand-800 transition-colors duration-300">{member.name}</h3>
                  <p className="text-brand-700 font-medium mb-4 group-hover:text-brand-800 transition-colors duration-300">{member.specialty}</p>
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{member.bio}</p>
                  <div className="mt-auto flex justify-center space-x-4">
                    {member.social.map((social) => (
                      <div key={social} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-brand-700 group-hover:text-white transition-all duration-300 cursor-pointer hover:scale-110">
                        <span className="text-xs font-medium">{social[0].toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-800 hover:text-brand-900 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        ‹
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-800 hover:text-brand-900 border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
      >
        ›
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {teamMembers.map((_, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${isActive ? 'bg-brand-700' : 'bg-gray-300 hover:bg-brand-500'} transition-colors`}
            />
          );
        })}
      </div>
    </div>
  );
}


