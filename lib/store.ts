'use client';
import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'skills' | 'resume' | 'contact';

export type WindowState = {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

type Store = {
  windows: Record<AppId, WindowState>;
  topZ: number;
  openWindow: (id: AppId) => void;
  closeWindow: (id: AppId) => void;
  minimizeWindow: (id: AppId) => void;
  bringToFront: (id: AppId) => void;
  setPosition: (id: AppId, pos: { x: number; y: number }) => void;
};

const defaultSizes: Record<AppId, { width: number; height: number }> = {
  about:    { width: 680, height: 520 },
  projects: { width: 780, height: 560 },
  skills:   { width: 720, height: 540 },
  resume:   { width: 640, height: 600 },
  contact:  { width: 480, height: 520 },
};

const defaultPositions: Record<AppId, { x: number; y: number }> = {
  about:    { x: 80,  y: 68 },
  projects: { x: 140, y: 88 },
  skills:   { x: 160, y: 78 },
  resume:   { x: 200, y: 98 },
  contact:  { x: 240, y: 108 },
};

const makeWindow = (id: AppId, z: number): WindowState => ({
  id,
  isOpen: false,
  isMinimized: false,
  zIndex: z,
  position: defaultPositions[id],
  size: defaultSizes[id],
});

const APP_IDS: AppId[] = ['about', 'projects', 'skills', 'resume', 'contact'];

export const useStore = create<Store>((set, get) => ({
  topZ: 10,
  windows: Object.fromEntries(
    APP_IDS.map((id, i) => [id, makeWindow(id, 10 + i)])
  ) as Record<AppId, WindowState>,

  openWindow: (id) => {
    const { topZ, windows } = get();
    const newZ = topZ + 1;
    set({
      topZ: newZ,
      windows: {
        ...windows,
        [id]: { ...windows[id], isOpen: true, isMinimized: false, zIndex: newZ },
      },
    });
  },

  closeWindow: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], isOpen: false } },
    })),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], isMinimized: true } },
    })),

  bringToFront: (id) => {
    const { topZ, windows } = get();
    const newZ = topZ + 1;
    set({
      topZ: newZ,
      windows: { ...windows, [id]: { ...windows[id], zIndex: newZ } },
    });
  },

  setPosition: (id, pos) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], position: pos } },
    })),
}));
