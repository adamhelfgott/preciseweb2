'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Shield, FileText, Hash, Calendar, Database, CheckCircle, Copy, ExternalLink } from 'lucide-react';

interface VerificationDetails {
  proofId: string;
  timestamp: number;
  blockHeight: number;
  dataHash: string;
  merkleRoot: string;
  dataAssets: {
    id: string;
    name: string;
    provider: string;
    contribution: number;
  }[];
  campaign: {
    id: string;
    name: string;
    advertiser: string;
  };
  totalValue: number;
  status: 'verified' | 'pending' | 'failed';
}

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: VerificationDetails;
}

export default function VerificationModal({ isOpen, onClose, details }: VerificationModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Proof Verification</h2>
                    <p className="text-sm text-gray-600">Cryptographic proof of data usage</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Status */}
                <div className="mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${getStatusColor(details.status)}`}>
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium capitalize">{details.status}</span>
                  </div>
                </div>

                {/* Proof Details */}
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Proof Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Proof ID</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono text-gray-900">{details.proofId}</code>
                          <button
                            onClick={() => copyToClipboard(details.proofId, 'proofId')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {copiedField === 'proofId' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Timestamp</span>
                        </div>
                        <span className="text-sm text-gray-900">
                          {new Date(details.timestamp).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Block Height</span>
                        </div>
                        <span className="text-sm font-mono text-gray-900">#{details.blockHeight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Info */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Campaign Details</h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{details.campaign.name}</p>
                          <p className="text-sm text-gray-600">{details.campaign.advertiser}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Value</p>
                          <p className="text-lg font-semibold text-gray-900">
                            ${details.totalValue.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data Assets */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Contributing Data Assets</h3>
                    <div className="space-y-2">
                      {details.dataAssets.map((asset) => (
                        <div key={asset.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{asset.name}</p>
                              <p className="text-sm text-gray-600">{asset.provider}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                {(asset.contribution * 100).toFixed(1)}%
                              </p>
                              <p className="text-xs text-gray-600">
                                ${(asset.contribution * details.totalValue).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cryptographic Details */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Cryptographic Details</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Data Hash</span>
                          <button
                            onClick={() => copyToClipboard(details.dataHash, 'dataHash')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {copiedField === 'dataHash' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                        <code className="text-xs font-mono text-gray-700 break-all">
                          {details.dataHash}
                        </code>
                      </div>

                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Merkle Root</span>
                          <button
                            onClick={() => copyToClipboard(details.merkleRoot, 'merkleRoot')}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            {copiedField === 'merkleRoot' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                        <code className="text-xs font-mono text-gray-700 break-all">
                          {details.merkleRoot}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between p-6 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Close
                </button>
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    Download Report
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}