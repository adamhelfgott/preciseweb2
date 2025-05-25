"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, User, Bell, Shield, Database, Key, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "data", label: "Data Management", icon: Database },
    { id: "api", label: "API Keys", icon: Key },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-8 h-8 text-primary-orange" />
          <h1 className="text-display-small font-bold text-dark-gray">
            Settings
          </h1>
        </div>
        <p className="text-body-large text-medium-gray">
          Manage your account preferences and data settings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary-orange text-white"
                      : "text-medium-gray hover:bg-light-gray hover:text-dark-gray"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-silk-gray p-6"
          >
            {activeTab === "profile" && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Profile Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="john@company.com"
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-gray mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      defaultValue="Nike"
                      className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                    />
                  </div>
                  <button className="bg-primary-orange hover:bg-vibrant-orange text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { label: "Campaign Performance Alerts", description: "Get notified when campaigns exceed thresholds" },
                    { label: "Data Attribution Updates", description: "Notifications about data valuation changes" },
                    { label: "Weekly Reports", description: "Receive weekly performance summaries" },
                    { label: "System Maintenance", description: "Important system updates and maintenance" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-silk-gray rounded-lg">
                      <div>
                        <h3 className="font-medium text-dark-gray">{item.label}</h3>
                        <p className="text-sm text-medium-gray">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Privacy & Security</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-silk-gray rounded-lg">
                    <h3 className="font-medium text-dark-gray mb-2">Data Sharing Preferences</h3>
                    <p className="text-sm text-medium-gray mb-4">
                      Control how your data is shared with platform partners
                    </p>
                    <select className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent">
                      <option>Selective sharing with approved partners</option>
                      <option>Minimal sharing (essential only)</option>
                      <option>Broad sharing for maximum value</option>
                    </select>
                  </div>
                  <div className="p-4 border border-silk-gray rounded-lg">
                    <h3 className="font-medium text-dark-gray mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-medium-gray mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="bg-brand-green hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "data" && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">Data Management</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-silk-gray rounded-lg">
                    <h3 className="font-medium text-dark-gray mb-2">Data Retention</h3>
                    <p className="text-sm text-medium-gray mb-4">
                      How long should we keep your campaign data?
                    </p>
                    <select className="w-full px-4 py-3 border border-silk-gray rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent">
                      <option>12 months</option>
                      <option>24 months</option>
                      <option>36 months</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                      <Trash2 size={20} />
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div>
                <h2 className="text-xl font-semibold text-dark-gray mb-6">API Keys</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-silk-gray rounded-lg">
                    <h3 className="font-medium text-dark-gray mb-2">Production API Key</h3>
                    <p className="text-sm text-medium-gray mb-4">
                      Use this key for production integrations
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="password"
                        value="pk_live_••••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-3 border border-silk-gray rounded-lg bg-gray-50"
                      />
                      <button className="bg-primary-orange hover:bg-vibrant-orange text-white px-4 py-3 rounded-lg font-medium transition-colors">
                        Regenerate
                      </button>
                    </div>
                  </div>
                  <div className="p-4 border border-silk-gray rounded-lg">
                    <h3 className="font-medium text-dark-gray mb-2">Test API Key</h3>
                    <p className="text-sm text-medium-gray mb-4">
                      Use this key for development and testing
                    </p>
                    <div className="flex gap-3">
                      <input
                        type="password"
                        value="pk_test_••••••••••••••••••••••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-3 border border-silk-gray rounded-lg bg-gray-50"
                      />
                      <button className="bg-primary-orange hover:bg-vibrant-orange text-white px-4 py-3 rounded-lg font-medium transition-colors">
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}