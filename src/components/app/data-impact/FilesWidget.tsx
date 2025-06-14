"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Database,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface FileData {
  id: string;
  dataUUID: string;
  dataName: string;
  vcCount: number;
  totalCount: number;
  dataType: string;
  uploadDate: string;
  logs: DataLineageLog[];
}

interface DataLineageLog {
  timestamp: string;
  action: string;
  status: "completed" | "in_progress" | "pending";
  transactionHash?: string;
  details?: string;
}

// Mock data for files
const mockFiles: FileData[] = [
  {
    id: "1",
    dataUUID: "0x7f8e9a2c4d6b3e1f",
    dataName: "Q1 2025 Customer Segments",
    vcCount: 245000,
    totalCount: 312000,
    dataType: "Customer Profile",
    uploadDate: "2025-03-15T10:30:00Z",
    logs: [
      {
        timestamp: "2025-03-15T10:30:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x1234567890abcdef",
        details: "File uploaded and validation started"
      },
      {
        timestamp: "2025-03-15T10:35:00Z",
        action: "Privacy Compliance Check",
        status: "completed",
        details: "PII detection and anonymization completed"
      },
      {
        timestamp: "2025-03-15T10:40:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x2345678901bcdef0",
        details: "245,000 verified credentials generated"
      },
      {
        timestamp: "2025-03-15T10:45:00Z",
        action: "Insight Report Generated",
        status: "completed",
        details: "Demographic and behavioral insights extracted"
      }
    ]
  },
  {
    id: "2",
    dataUUID: "0x8a9b2d3e5f7c4e6a",
    dataName: "Sports Fan Affinity Data",
    vcCount: 189000,
    totalCount: 198000,
    dataType: "Behavioral Segment",
    uploadDate: "2025-03-14T14:20:00Z",
    logs: [
      {
        timestamp: "2025-03-14T14:20:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x3456789012cdef01"
      },
      {
        timestamp: "2025-03-14T14:25:00Z",
        action: "Data Quality Assessment",
        status: "completed",
        details: "95.5% data completeness score"
      },
      {
        timestamp: "2025-03-14T14:30:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x4567890123def012"
      }
    ]
  },
  {
    id: "3",
    dataUUID: "0x9b2c3d4e6f8a5e7b",
    dataName: "Premium Ticket Buyers",
    vcCount: 87500,
    totalCount: 92000,
    dataType: "Transaction History",
    uploadDate: "2025-03-13T09:15:00Z",
    logs: [
      {
        timestamp: "2025-03-13T09:15:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x5678901234ef0123"
      },
      {
        timestamp: "2025-03-13T09:20:00Z",
        action: "Financial Data Encryption",
        status: "completed",
        details: "Transaction data secured with AES-256"
      },
      {
        timestamp: "2025-03-13T09:25:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x6789012345f01234"
      }
    ]
  },
  {
    id: "4",
    dataUUID: "0xa3c4d5e7f9b6e8ca",
    dataName: "Location Intelligence - Stadium",
    vcCount: 156000,
    totalCount: 178000,
    dataType: "Location Data",
    uploadDate: "2025-03-12T16:45:00Z",
    logs: [
      {
        timestamp: "2025-03-12T16:45:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x7890123456012345"
      },
      {
        timestamp: "2025-03-12T16:50:00Z",
        action: "Geospatial Processing",
        status: "completed",
        details: "Location data aggregated to DMA level"
      },
      {
        timestamp: "2025-03-12T16:55:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x8901234567123456"
      }
    ]
  },
  {
    id: "5",
    dataUUID: "0xb4d5e6f8a9c7f9db",
    dataName: "Season Pass Holders 2024",
    vcCount: 234000,
    totalCount: 245000,
    dataType: "Customer Profile",
    uploadDate: "2025-03-11T11:30:00Z",
    logs: [
      {
        timestamp: "2025-03-11T11:30:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x9012345678234567"
      },
      {
        timestamp: "2025-03-11T11:35:00Z",
        action: "Historical Data Validation",
        status: "completed",
        details: "2024 season data verified"
      },
      {
        timestamp: "2025-03-11T11:40:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0xa123456789345678"
      }
    ]
  },
  {
    id: "6",
    dataUUID: "0xc5e6f7a9b8d9faec",
    dataName: "Youth Sports Participants",
    vcCount: 112000,
    totalCount: 125000,
    dataType: "Demographic Data",
    uploadDate: "2025-03-10T13:00:00Z",
    logs: [
      {
        timestamp: "2025-03-10T13:00:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0xb234567890456789"
      },
      {
        timestamp: "2025-03-10T13:05:00Z",
        action: "Age Verification Process",
        status: "completed",
        details: "COPPA compliance verified"
      },
      {
        timestamp: "2025-03-10T13:10:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0xc345678901567890"
      }
    ]
  },
  {
    id: "7",
    dataUUID: "0xd6f7a8b9c0eafbfd",
    dataName: "Merchandise Purchasers",
    vcCount: 198000,
    totalCount: 210000,
    dataType: "Transaction History",
    uploadDate: "2025-03-09T15:20:00Z",
    logs: [
      {
        timestamp: "2025-03-09T15:20:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0xd456789012678901"
      },
      {
        timestamp: "2025-03-09T15:25:00Z",
        action: "Purchase Pattern Analysis",
        status: "completed",
        details: "Cross-sell opportunities identified"
      },
      {
        timestamp: "2025-03-09T15:30:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0xe567890123789012"
      }
    ]
  },
  {
    id: "8",
    dataUUID: "0xe7f8a9b0c1fbacfe",
    dataName: "VIP Experience Buyers",
    vcCount: 45000,
    totalCount: 48000,
    dataType: "Customer Profile",
    uploadDate: "2025-03-08T10:00:00Z",
    logs: [
      {
        timestamp: "2025-03-08T10:00:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0xf678901234890123"
      },
      {
        timestamp: "2025-03-08T10:05:00Z",
        action: "High-Value Customer Tagging",
        status: "completed",
        details: "LTV scoring completed"
      },
      {
        timestamp: "2025-03-08T10:10:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x0789012345901234"
      }
    ]
  },
  {
    id: "9",
    dataUUID: "0xf8a9b0c1d2ecbdff",
    dataName: "Mobile App Users",
    vcCount: 278000,
    totalCount: 295000,
    dataType: "Behavioral Segment",
    uploadDate: "2025-03-07T08:30:00Z",
    logs: [
      {
        timestamp: "2025-03-07T08:30:00Z",
        action: "Data Onboarding Initiated",
        status: "completed",
        transactionHash: "0x1890123456012345"
      },
      {
        timestamp: "2025-03-07T08:35:00Z",
        action: "App Engagement Analysis",
        status: "completed",
        details: "User journey mapping completed"
      },
      {
        timestamp: "2025-03-07T08:40:00Z",
        action: "Audience Segment Created",
        status: "completed",
        transactionHash: "0x2901234567123456"
      },
      {
        timestamp: "2025-03-07T08:45:00Z",
        action: "Insight Report Generated",
        status: "completed",
        details: "Feature usage patterns identified"
      }
    ]
  }
];

export default function FilesWidget() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [showLogs, setShowLogs] = useState(false);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockFiles.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFiles = mockFiles.slice(startIndex, endIndex);

  const formatDataUUID = (uuid: string) => {
    return `${uuid.slice(0, 8)}...${uuid.slice(-6)}`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl border border-light-gray">
      <div className="p-6 border-b border-light-gray">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark-gray mb-1">Uploaded Files</h3>
            <p className="text-sm text-medium-gray">
              Your verified data assets with cryptographic proof of ownership
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-orange" />
            <span className="text-sm font-medium text-dark-gray">
              {mockFiles.length} Total Files
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-light-gray">
              <th className="px-6 py-4 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                Data UUID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                Data Name
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-medium-gray uppercase tracking-wider">
                Logs
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                VC Count / Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-medium-gray uppercase tracking-wider">
                Data Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light-gray">
            {currentFiles.map((file) => (
              <tr key={file.id} className="hover:bg-silk-gray transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-600" />
                    <code className="text-sm font-mono text-dark-gray">
                      {formatDataUUID(file.dataUUID)}
                    </code>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-dark-gray">{file.dataName}</p>
                  <p className="text-xs text-medium-gray mt-1">
                    Uploaded {formatDate(file.uploadDate)}
                  </p>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setShowLogs(true);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-electric-blue hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Logs
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-dark-gray">
                      {formatNumber(file.vcCount)} / {formatNumber(file.totalCount)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-light-gray rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(file.vcCount / file.totalCount) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-medium-gray">
                        {((file.vcCount / file.totalCount) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    file.dataType === 'Customer Profile' ? 'bg-blue-100 text-blue-800' :
                    file.dataType === 'Behavioral Segment' ? 'bg-purple-100 text-purple-800' :
                    file.dataType === 'Transaction History' ? 'bg-green-100 text-green-800' :
                    file.dataType === 'Location Data' ? 'bg-orange-100 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {file.dataType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-light-gray flex items-center justify-between">
        <p className="text-sm text-medium-gray">
          Showing {startIndex + 1} to {Math.min(endIndex, mockFiles.length)} of {mockFiles.length} files
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-dark-gray px-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-light-gray disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data Lineage Modal */}
      <AnimatePresence>
        {showLogs && selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowLogs(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-light-gray">
                <h3 className="text-lg font-semibold text-dark-gray mb-2">
                  Data Lineage & Verification
                </h3>
                <p className="text-sm text-medium-gray">
                  {selectedFile.dataName}
                </p>
                <code className="text-xs font-mono text-electric-blue">
                  {selectedFile.dataUUID}
                </code>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-6">
                  {selectedFile.logs.map((log, index) => (
                    <div key={index} className="relative">
                      {index < selectedFile.logs.length - 1 && (
                        <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-light-gray" />
                      )}
                      
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.status === 'completed' ? 'bg-green-100' :
                          log.status === 'in_progress' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {log.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : log.status === 'in_progress' ? (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-dark-gray">{log.action}</h4>
                            <span className="text-xs text-medium-gray">
                              {formatDate(log.timestamp)}
                            </span>
                          </div>
                          
                          {log.details && (
                            <p className="text-sm text-medium-gray mb-2">{log.details}</p>
                          )}
                          
                          {log.transactionHash && (
                            <div className="flex items-center gap-2 bg-silk-gray rounded-lg px-3 py-2">
                              <Shield className="w-4 h-4 text-green-600" />
                              <div className="flex-1">
                                <p className="text-xs text-medium-gray">AliceNet Transaction</p>
                                <code className="text-xs font-mono text-electric-blue">
                                  {formatDataUUID(log.transactionHash)}
                                </code>
                              </div>
                              <button className="text-xs text-electric-blue hover:text-blue-700 flex items-center gap-1">
                                View <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-light-gray">
                <button
                  onClick={() => setShowLogs(false)}
                  className="w-full px-4 py-2 bg-dark-gray text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}