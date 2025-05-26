'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

interface CodeExample {
  label: string;
  code: string;
}

interface CodeTabsProps {
  examples: CodeExample[];
}

export default function CodeTabs({ examples }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-gray-700">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-medium text-sm transition-all relative ${
              activeTab === index
                ? 'text-white bg-gray-800'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {example.label}
            {activeTab === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-electric-blue"
              />
            )}
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          <button
            onClick={() => handleCopy(examples[activeTab].code, activeTab)}
            className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            title="Copy code"
          >
            {copiedIndex === activeTab ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>

          <pre className="text-sm overflow-x-auto">
            <code className="language-javascript text-gray-300">
              {highlightCode(examples[activeTab].code, examples[activeTab].label)}
            </code>
          </pre>
        </motion.div>
      </div>

      {/* Quick Start Footer */}
      <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Ready to integrate? Install with:{' '}
            <code className="bg-gray-900 px-2 py-1 rounded text-electric-blue">
              {getInstallCommand(examples[activeTab].label)}
            </code>
          </p>
          <button
            onClick={() => handleCopy(getInstallCommand(examples[activeTab].label), -1)}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Copy install command
          </button>
        </div>
      </div>
    </div>
  );
}

function getInstallCommand(language: string): string {
  switch (language) {
    case 'Python':
      return 'pip install precise-ai';
    case 'Node.js':
      return 'npm install @precise-ai/sdk';
    case 'Go':
      return 'go get github.com/precise-ai/go-sdk';
    default:
      return 'curl -X POST https://api.precise.ai/v1/';
  }
}

function highlightCode(code: string, language: string): React.ReactNode {
  // Simple syntax highlighting (in production, use a proper syntax highlighter)
  const lines = code.split('\n');
  
  return lines.map((line, index) => {
    let highlighted = line;
    
    // Highlight comments
    highlighted = highlighted.replace(/(#.*$|\/\/.*$)/g, '<span class="text-gray-500">$1</span>');
    
    // Highlight strings
    highlighted = highlighted.replace(/(['"`])(.*?)\1/g, '<span class="text-green-400">$1$2$1</span>');
    
    // Highlight keywords
    const keywords = ['import', 'from', 'const', 'await', 'if', 'console', 'print', 'curl'];
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-400">${keyword}</span>`);
    });
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>');
    
    // Highlight functions
    highlighted = highlighted.replace(/(\w+)\(/g, '<span class="text-blue-400">$1</span>(');
    
    return (
      <div key={index} dangerouslySetInnerHTML={{ __html: highlighted }} />
    );
  });
}