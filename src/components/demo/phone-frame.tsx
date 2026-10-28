import { BatteryFull, Signal, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
import type { DemoTheme } from '@/lib/demo-state';

export function PhoneFrame({ theme, children }: { theme: DemoTheme; children: ReactNode }) {
  return <div className="phone-frame">
    <div className={`phone-screen demo-theme-${theme}`}>
      <div className="phone-status"><span>9:41</span><div className="phone-island" /><span className="flex items-center gap-1"><Signal size={14}/><Wifi size={14}/><BatteryFull size={19}/></span></div>
      <div className="phone-content">{children}</div>
      <div className="phone-home"><span /></div>
    </div>
  </div>;
}