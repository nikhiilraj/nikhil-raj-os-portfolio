'use client';
import { useStore, AppId } from '@/lib/store';

export default function TrafficLights({ id }: { id: AppId }) {
  const closeWindow = useStore((s) => s.closeWindow);
  const minimizeWindow = useStore((s) => s.minimizeWindow);

  return (
    <div className="flex items-center gap-[6px] flex-shrink-0">
      <button
        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
        className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition-colors group relative"
        aria-label="Close"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] text-[#7a0000] font-bold leading-none">✕</span>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
        className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#f59f00] transition-colors group relative"
        aria-label="Minimize"
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-[8px] text-[#7a5500] font-bold leading-none">−</span>
      </button>
      <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-50 cursor-not-allowed" aria-label="Fullscreen (disabled)" />
    </div>
  );
}
