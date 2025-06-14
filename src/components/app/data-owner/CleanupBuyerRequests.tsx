"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CleanupBuyerRequests() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);
  
  // Get all buyer requests using the existing getActiveRequests function
  const requests = useQuery(api.buyerRequests.getActiveRequests);
  const deleteRequest = useMutation(api.buyerRequests.deleteBuyerRequest);
  
  // Filter Michael Rodriguez requests
  const michaelRequests = requests?.filter(req => 
    req.buyerName?.includes("Michael Rodriguez") || 
    req.buyerCompany?.includes("Nike")
  ) || [];
  
  const handleCleanup = async () => {
    if (michaelRequests.length <= 3) {
      alert("No cleanup needed - 3 or fewer requests found.");
      return;
    }
    
    setIsDeleting(true);
    setDeletedCount(0);
    
    // Sort by creation date (newest first)
    const sortedRequests = [...michaelRequests].sort((a, b) => {
      const aTime = a.createdAt || 0;
      const bTime = b.createdAt || 0;
      return bTime - aTime;
    });
    
    // Keep the 3 most recent ones, delete the rest
    const requestsToDelete = sortedRequests.slice(3);
    
    try {
      for (const request of requestsToDelete) {
        await deleteRequest({ requestId: request._id });
        setDeletedCount(prev => prev + 1);
      }
      
      alert(`Successfully deleted ${requestsToDelete.length} excess requests!`);
    } catch (error) {
      console.error("Error during cleanup:", error);
      alert("Error during cleanup. Check console for details.");
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Cleanup Buyer Requests</h3>
      
      {michaelRequests.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2">Current Requests:</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {michaelRequests
              .sort((a, b) => {
                const aTime = a.createdAt || 0;
                const bTime = b.createdAt || 0;
                return bTime - aTime;
              })
              .map((req, index) => (
                <div 
                  key={req._id} 
                  className={`p-2 text-xs border rounded ${
                    index < 3 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="font-medium">{req.title}</div>
                  <div className="text-gray-500">
                    {req.createdAt ? new Date(req.createdAt).toLocaleString() : 'Unknown date'} 
                    {index < 3 && <span className="ml-2 text-green-600">(Keep)</span>}
                    {index >= 3 && <span className="ml-2 text-red-600">(Delete)</span>}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      
      <div className="border-t pt-4">
        <div className="text-sm text-gray-600 mb-3">
          <p>Found {michaelRequests.length} requests from Michael Rodriguez (Nike)</p>
          {michaelRequests.length > 3 && (
            <p className="text-orange-600 mt-1">
              Will delete {michaelRequests.length - 3} excess requests, keeping the 3 most recent
            </p>
          )}
        </div>
        
        <button
          onClick={handleCleanup}
          disabled={isDeleting || michaelRequests.length <= 3}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
            isDeleting || michaelRequests.length <= 3
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          <Trash2 className="w-4 h-4" />
          {isDeleting 
            ? `Deleting... (${deletedCount} done)` 
            : "Clean Up Excess Requests"
          }
        </button>
      </div>
    </div>
  );
}