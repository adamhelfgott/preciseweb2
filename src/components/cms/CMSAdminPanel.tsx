"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Save, RefreshCw } from "lucide-react";

export default function CMSAdminPanel() {
  const [selectedPage, setSelectedPage] = useState<string>("company");
  const [content, setContent] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const pages = [
    { id: "company", name: "Company" },
    { id: "pricing", name: "Pricing" },
    { id: "contact", name: "Contact" },
    { id: "agent-intelligence", name: "Agent Intelligence" },
    { id: "data-controllers", name: "Data Controllers" },
    { id: "media-buyers", name: "Media Buyers" },
  ];

  const pageContent = useQuery(api.cms.getPageContent, { page: selectedPage });
  const updateContent = useMutation(api.cms.updatePageContent);

  // Update local content when page content loads
  if (pageContent && !content) {
    setContent(pageContent.content);
  }

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    try {
      await updateContent({
        page: selectedPage,
        content: content,
      });
      alert("Content saved successfully!");
    } catch (error) {
      alert("Error saving content: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (pageContent) {
      setContent(pageContent.content);
    }
  };

  const updateField = (path: string[], value: any) => {
    const newContent = { ...content };
    let current = newContent;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">CMS Admin Panel</h1>
        
        {/* Page Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Page</label>
          <select
            value={selectedPage}
            onChange={(e) => {
              setSelectedPage(e.target.value);
              setContent(null);
            }}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg"
          >
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content Editor */}
        {content && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Edit {selectedPage} Content</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSaving}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>

            {/* Dynamic content editor based on page */}
            {selectedPage === "company" && (
              <CompanyEditor content={content} updateField={updateField} />
            )}
            {selectedPage === "pricing" && (
              <PricingEditor content={content} updateField={updateField} />
            )}
            {selectedPage === "contact" && (
              <ContactEditor content={content} updateField={updateField} />
            )}
            {selectedPage === "agent-intelligence" && (
              <AgentIntelligenceEditor content={content} updateField={updateField} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Company page editor
function CompanyEditor({ content, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={content.hero.description}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {content.teamMembers.map((member: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <input
                type="text"
                value={member.name}
                onChange={(e) => {
                  const newMembers = [...content.teamMembers];
                  newMembers[index].name = e.target.value;
                  updateField(["teamMembers"], newMembers);
                }}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                value={member.role}
                onChange={(e) => {
                  const newMembers = [...content.teamMembers];
                  newMembers[index].role = e.target.value;
                  updateField(["teamMembers"], newMembers);
                }}
                placeholder="Role"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Investor Note</label>
        <input
          type="text"
          value={content.investorNote}
          onChange={(e) => updateField(["investorNote"], e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}

// Pricing page editor
function PricingEditor({ content, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={content.hero.description}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-2">
          {content.features.map((feature: string, index: number) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => {
                const newFeatures = [...content.features];
                newFeatures[index] = e.target.value;
                updateField(["features"], newFeatures);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">ROI Metrics</h3>
        <div className="space-y-2">
          {content.roi.metrics.map((metric: any, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={metric.label}
                onChange={(e) => {
                  const newMetrics = [...content.roi.metrics];
                  newMetrics[index].label = e.target.value;
                  updateField(["roi", "metrics"], newMetrics);
                }}
                placeholder="Label"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={metric.value}
                onChange={(e) => {
                  const newMetrics = [...content.roi.metrics];
                  newMetrics[index].value = e.target.value;
                  updateField(["roi", "metrics"], newMetrics);
                }}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact page editor
function ContactEditor({ content, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title Highlight</label>
            <input
              type="text"
              value={content.hero.titleHighlight || ""}
              onChange={(e) => updateField(["hero", "titleHighlight"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <textarea
              value={content.hero.subtitle}
              onChange={(e) => updateField(["hero", "subtitle"], e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Office Location</h3>
        <div className="space-y-4">
          <input
            type="text"
            value={content.office.location.name}
            onChange={(e) => updateField(["office", "location", "name"], e.target.value)}
            placeholder="Office Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {content.office.location.address.map((line: string, index: number) => (
            <input
              key={index}
              type="text"
              value={line}
              onChange={(e) => {
                const newAddress = [...content.office.location.address];
                newAddress[index] = e.target.value;
                updateField(["office", "location", "address"], newAddress);
              }}
              placeholder={`Address Line ${index + 1}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Agent Intelligence page editor
function AgentIntelligenceEditor({ content, updateField }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={content.hero.title}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title Highlight</label>
            <input
              type="text"
              value={content.hero.titleHighlight}
              onChange={(e) => updateField(["hero", "titleHighlight"], e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={content.hero.description}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {content.features.items.map((feature: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <input
                type="text"
                value={feature.title}
                onChange={(e) => {
                  const newFeatures = [...content.features.items];
                  newFeatures[index].title = e.target.value;
                  updateField(["features", "items"], newFeatures);
                }}
                placeholder="Feature Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <textarea
                value={feature.description}
                onChange={(e) => {
                  const newFeatures = [...content.features.items];
                  newFeatures[index].description = e.target.value;
                  updateField(["features", "items"], newFeatures);
                }}
                placeholder="Feature Description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <input
                type="text"
                value={feature.metric || ""}
                onChange={(e) => {
                  const newFeatures = [...content.features.items];
                  newFeatures[index].metric = e.target.value;
                  updateField(["features", "items"], newFeatures);
                }}
                placeholder="Metric (e.g., 30% less wasted spend)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}