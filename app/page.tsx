'use client';
import { useState, useEffect } from 'react';
import BootSequence from '@/components/os/BootSequence';
import Desktop from '@/components/os/Desktop';

const SESSION_KEY = 'nikhil_os_booted';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShowBoot(false);
      setBooted(true);
    }
  }, []);

  const handleBootDone = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setBooted(true);
    setTimeout(() => setShowBoot(false), 100);
  };

  return (
    <>
      {showBoot && <BootSequence onDone={handleBootDone} />}
      {booted && <Desktop />}
    </>
  );
}
