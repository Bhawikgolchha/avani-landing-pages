'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Prototype1Redirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAF7] text-[#163515] font-sans">
      <div className="text-center">
        <p className="text-sm font-medium animate-pulse">Redirecting to Avani...</p>
      </div>
    </div>
  );
}
