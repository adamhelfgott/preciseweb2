"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Save, X, AlertCircle } from "lucide-react";
import { dataService } from "@/services/DataService";

interface EditableFieldProps {
  value: string | number;
  onSave: (newValue: string | number) => Promise<void>;
  type?: "text" | "number" | "currency";
  className?: string;
}

export function EditableField({ value, onSave, type = "text", className = "" }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      
      const finalValue = type === "number" || type === "currency" 
        ? parseFloat(editValue) 
        : editValue;
      
      await onSave(finalValue);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value.toString());
    setIsEditing(false);
    setError(null);
  };

  if (!isEditing) {
    return (
      <span 
        className={`admin-editable ${className}`}
        onDoubleClick={() => setIsEditing(true)}
        title="Double-click to edit"
      >
        {type === "currency" ? `$${Number(value).toLocaleString()}` : value}
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <input
        type={type === "currency" ? "number" : type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="px-2 py-1 border border-primary-orange rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary-orange"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
      />
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="p-1 text-green-600 hover:text-green-700 disabled:opacity-50"
      >
        {isSaving ? <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
      </button>
      <button
        onClick={handleCancel}
        className="p-1 text-red-600 hover:text-red-700"
      >
        <X size={16} />
      </button>
      {error && (
        <span className="text-xs text-red-600 flex items-center gap-1">
          <AlertCircle size={12} />
          {error}
        </span>
      )}
    </div>
  );
}

export function AdminModeProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isAdminMode = searchParams.get("admin") === "true";
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (isAdminMode) {
      setShowBanner(true);
      // Add admin mode styles
      document.body.classList.add("admin-mode");
      
      // Add visual indicators for editable fields
      const style = document.createElement("style");
      style.innerHTML = `
        .admin-mode .admin-editable {
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }
        .admin-mode .admin-editable:hover {
          background-color: rgba(251, 146, 60, 0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }
        .admin-mode .admin-editable:hover::after {
          content: "✏️";
          position: absolute;
          right: -20px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          opacity: 0.5;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.body.classList.remove("admin-mode");
        style.remove();
      };
    }
  }, [isAdminMode]);

  return (
    <>
      <AnimatePresence>
        {showBanner && isAdminMode && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 bg-primary-orange text-white px-4 py-2 z-50 shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Edit3 size={16} />
                <span className="text-sm font-medium">Admin Mode Active</span>
                <span className="text-xs opacity-80">Double-click any value to edit</span>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

// Hook to check if admin mode is active
export function useAdminMode() {
  const searchParams = useSearchParams();
  return searchParams.get("admin") === "true";
}

// Example usage in a component:
export function AdminEditableExample() {
  const isAdminMode = useAdminMode();
  
  const handleSaveCampaignName = async (newValue: string | number) => {
    await dataService.updateCampaign("campaign-1", { 
      name: newValue.toString() 
    });
  };
  
  const handleSaveBudget = async (newValue: string | number) => {
    await dataService.updateCampaign("campaign-1", { 
      properties: { budget: Number(newValue) }
    });
  };

  if (!isAdminMode) {
    return <span>Nike Campaign</span>;
  }

  return (
    <div className="space-y-4">
      <div>
        Campaign Name: <EditableField value="Nike Campaign" onSave={handleSaveCampaignName} />
      </div>
      <div>
        Budget: <EditableField value={50000} onSave={handleSaveBudget} type="currency" />
      </div>
    </div>
  );
}