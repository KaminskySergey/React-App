import { useEffect, useRef, useState } from "react";

export const useModalMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const popupRef = useRef<any>(null);

    const handleToggle = () => {
        setIsOpen(pS => !pS)
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
      };

  const closePopup = (e: React.MouseEvent) => {
    if (popupRef.current && popupRef.current.contains(e.target as Node)) {
        return;
      }
      setIsOpen(false);
  };

  useEffect(() => {
    
    document.addEventListener('click', closePopup as any);

    return () => {
      document.removeEventListener('click', closePopup as any);
    };
  }, []);


  return {
    isOpen,
    popupRef,
    handleToggle,
    togglePopup
  }
}