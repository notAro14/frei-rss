import { useState, useCallback } from "react";
export function useDisclosure(init = false) {
  const [isOpen, setIsOpen] = useState(init);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { open, close, isOpen, setIsOpen };
}
