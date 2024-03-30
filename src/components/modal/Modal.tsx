import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}
import styles from './modal.module.css'

const Modal: React.FC<ModalProps> = ({ children }) => {
  // useEffect(() => {
  //   const handleEscape = (e: KeyboardEvent) => {
  //     if (e.code === `Escape`) {
  //       onClose();
  //     }
  //   };
  //   window.addEventListener("keydown", handleEscape);
  //   return () => {
  //     window.removeEventListener("keydown", handleEscape);
  //   };
  // }, [onClose]);

  // const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  return createPortal(
    
    <div className={styles.backdrop} >
      <div style={{transform: 'translate(-50% -50%)'}} className={styles.modalContainer}>{children}</div>
    </div>,
    document.querySelector("body")!
  );
};

export default Modal;