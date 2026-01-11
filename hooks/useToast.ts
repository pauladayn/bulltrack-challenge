"use client";

import { useState, useCallback } from "react";

interface UseToastReturn {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

/**
 * Hook for managing toast visibility state
 * Usage:
 * const toast = useToast();
 * <Toast isVisible={toast.isVisible} onClose={toast.hide} message="..." />
 */
export function useToast(): UseToastReturn {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  return { isVisible, show, hide };
}
