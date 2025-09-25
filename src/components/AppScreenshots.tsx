'use client';

import { useState } from 'react';

interface Screenshot {
  id: number;
  src: string;
  alt: string;
}

interface AppScreenshotsProps {
  screenshots: Screenshot[];
}

export default function AppScreenshots({ screenshots }: AppScreenshotsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!screenshots || screenshots.length === 0) {
    return (
      <div className="w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Screenshot</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-48 h-96 bg-gray-200 rounded-lg flex items-center justify-center"
            >
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">Screenshot {i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Screenshot</h3>
      
      {/* Mobile Carousel */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
          {screenshots.map((screenshot, index) => (
            <div
              key={screenshot.id}
              className="flex-shrink-0 w-48 h-96 snap-start"
              onClick={() => goToSlide(index)}
            >
              <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative">
                  {/* Mock phone frame */}
                  <div className="w-40 h-80 bg-white rounded-2xl shadow-lg p-2 relative">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="text-sm font-medium mb-1">Fitur {index + 1}</h4>
                        <p className="text-xs opacity-80">Screenshot aplikasi</p>
                      </div>
                    </div>
                    {/* Phone notch */}
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-google-blue' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}