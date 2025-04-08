import { useRef, useEffect } from 'react';

function Modal({ children, isOpen }) {
    
  const dialog = useRef();

  useEffect(() => {

    if (!dialog.current) return;

    if (isOpen) {
      dialog.current.showModal();
    } else if (dialog.current.open) {
      dialog.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialog} className="modal" style={{ padding: "2rem", textAlign: "center" }}>
      {children}
    </dialog>
  );
}

export default Modal;