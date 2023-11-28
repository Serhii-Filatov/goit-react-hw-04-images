import { useEffect } from 'react';
import { StyledModal } from './Styled';

export const Modal = ({ closeModal, modalData }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <StyledModal onClick={handleOverlayClick}>
      <div className="modal">
        <img src={modalData.largeImageURL} alt={modalData.tags} width="800" />
      </div>
    </StyledModal>
  );
};
