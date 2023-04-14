import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {

    // функція для закриття модального вікна по клавіші ESC
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown); // слухаємо клавіші

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // прибираємо слухача
    };
  }, [onClose]);

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img className={css.modal__image} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default Modal;
