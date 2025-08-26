import React, { useState, useEffect } from 'react';

/**
 * Hook to check if component has mounted (client-side only)
 * Useful for preventing hydration mismatches
 */
export function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * Component wrapper that only renders children on client-side
 * Prevents hydration mismatches for client-only components
 */
interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Hook for safely using browser-only APIs
 * Returns undefined on server, actual value on client
 */
export function useBrowserOnly<T>(getValue: () => T): T | undefined {
  const [value, setValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  return value;
}

/**
 * Safe way to check if we're in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safe way to access localStorage
 */
export function safeLocalStorage() {
  if (!isBrowser()) {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {}
    };
  }

  return window.localStorage;
}
