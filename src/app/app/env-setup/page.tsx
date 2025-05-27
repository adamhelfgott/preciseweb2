'use client';

export default function EnvSetupPage() {
  const correctEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: "https://qlgxwcmbqumygxcjoyih.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ3h3Y21icXVteWd4Y2pveWloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyOTkwNDksImV4cCI6MjA2Mzg3NTA0OX0.F3JbSPeYs9kHL28_jbHJvbw3fcrWn95BvqPe6xcxwpo",
    NEXT_PUBLIC_CONVEX_URL: "https://adamant-peccary-532.convex.cloud",
    OPENAI_API_KEY: "[Your OpenAI API key]"
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Vercel Environment Setup</h1>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-red-900 mb-2">⚠️ Issue Detected</h2>
        <p className="text-red-800">
          The Supabase anon key in production appears to be truncated. 
          It should be 265 characters long, but it\'s only 68 characters.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Correct Environment Variables for Vercel</h2>
        <p className="text-sm text-gray-600 mb-4">
          Copy these EXACT values to your Vercel project settings. Make sure to copy the ENTIRE key without truncation.
        </p>
        
        <div className="space-y-4">
          {Object.entries(correctEnvVars).map(([key, value]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <code className="text-sm font-semibold text-blue-600">{key}</code>
                <span className="text-xs text-gray-500">
                  Length: {value.length}
                </span>
              </div>
              <div className="bg-gray-100 p-3 rounded font-mono text-xs break-all">
                {value}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(value)}
                className="mt-2 text-xs bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Copy to Clipboard
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">How to Fix:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Go to your Vercel dashboard</li>
          <li>Navigate to Project Settings → Environment Variables</li>
          <li>Find NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
          <li>Click Edit and replace with the FULL key above (265 characters)</li>
          <li>Save and trigger a new deployment</li>
        </ol>
      </div>
    </div>
  );
}