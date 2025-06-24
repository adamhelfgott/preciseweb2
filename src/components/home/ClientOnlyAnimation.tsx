'use client';

import { useEffect, useState } from 'react';

export default function ClientOnlyAnimation({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center">
        <div className="absolute w-32 h-32 flex items-center justify-center z-10">
          <img src="/icon.svg" alt="Precise" className="w-full h-full" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}