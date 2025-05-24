'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, Lock, Info } from 'lucide-react';
import { useState } from 'react';

interface ProofBadgeProps {
  verified: boolean;
  proofId?: string;
  timestamp?: number;
  dataSource?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export default function ProofBadge({ 
  verified, 
  proofId = 'PRF-2024-NIKE-001',
  timestamp = Date.now(),
  dataSource = 'Precise Network',
  size = 'md',
  showDetails = true 
}: ProofBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Badge Background */}
        <div className={`${sizeClasses[size]} relative`}>
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
          >
            {/* Outer Ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={verified ? '#10b981' : '#6b7280'}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
            
            {/* Inner Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill={verified ? '#f0fdf4' : '#f9fafb'}
            />
            
            {/* Decorative Elements */}
            {verified && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1="50"
                    y1="10"
                    x2="50"
                    y2="15"
                    stroke="#10b981"
                    strokeWidth="2"
                    transform={`rotate(${i * 45} 50 50)`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                  />
                ))}
              </>
            )}
          </svg>
          
          {/* Center Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {verified ? (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <Shield className={`${iconSizes[size]} text-green-600 fill-green-100`} />
              </motion.div>
            ) : (
              <Lock className={`${iconSizes[size]} text-gray-500`} />
            )}
          </div>
          
          {/* Verified Checkmark */}
          {verified && (
            <motion.div
              className="absolute -top-1 -right-1 bg-green-600 rounded-full p-1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <CheckCircle className="w-4 h-4 text-white fill-white" />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Tooltip */}
      {showDetails && showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">
                {verified ? 'Verified Data' : 'Unverified Data'}
              </h4>
              {verified ? (
                <>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Proof ID:</span>
                      <span className="font-mono text-xs text-gray-900">{proofId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Source:</span>
                      <span className="text-gray-900">{dataSource}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified:</span>
                      <span className="text-gray-900">
                        {new Date(timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      This data has been cryptographically verified and stamped 
                      on the Precise network, ensuring authenticity and attribution.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-600">
                  This data has not been verified on the Precise network. 
                  Verification ensures proper attribution and royalty distribution.
                </p>
              )}
            </div>
          </div>
          
          {/* Arrow */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
        </motion.div>
      )}
    </div>
  );
}