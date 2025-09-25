'use client';

import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  isAnimating?: boolean;
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({ 
  progress, 
  isAnimating = false, 
  showPercentage = true,
  className = '' 
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, isAnimating]);

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">
            {Math.round(displayProgress)}%
          </span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
}

// Animated progress bar with steps
interface SteppedProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
  className?: string;
}

export function SteppedProgressBar({ 
  currentStep, 
  totalSteps, 
  steps,
  className = '' 
}: SteppedProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {steps[currentStep - 1] || 'Memproses...'}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {currentStep}/{totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-3 h-3 rounded-full mb-1 transition-colors duration-300 ${
                index < currentStep 
                  ? 'bg-blue-600' 
                  : index === currentStep 
                    ? 'bg-blue-400 animate-pulse' 
                    : 'bg-gray-300'
              }`}
            />
            <span className={`text-xs text-center max-w-16 ${
              index < currentStep 
                ? 'text-blue-600 font-medium' 
                : index === currentStep 
                  ? 'text-blue-500' 
                  : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}