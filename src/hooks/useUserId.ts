'use client';

import { useState } from 'react';

const KEY = 'pixel_blog_user_id';

const genId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return `u_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

export const useUserId = () => {
  const [userId] = useState<string>(() => {
    if (typeof window === 'undefined') return 'local_user';
    try {
      const existing = window.localStorage.getItem(KEY);
      if (existing) return existing;
      const created = genId();
      window.localStorage.setItem(KEY, created);
      return created;
    } catch {
      return 'local_user';
    }
  });

  return userId;
};
