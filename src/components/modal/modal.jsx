import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Modal(props) {
  const modalRoot = document.querySelector('#modal');
  const navigate = useNavigate();

  const closePopup = () => {
    props.setVisible ? props.setVisible(false) : navigate(-1);
  }

  React.useEffect(() => {
    function escClickHandler(e) { e.key === 'Escape' && closePopup() }
    document.addEventListener('keydown', escClickHandler);
    return () => {
      document.removeEventListener('keydown', escClickHandler);
    };
  }, []);

  return createPortal(<>
      <ModalOverlay closePopup={closePopup}/>
      <section className={styles.modalWindow}>
        <section className={styles.modalHeader}>
          <h2 className='text text_type_main-large'>{props.title || ''}</h2>
          <div className={styles.modalCloseBtn} onClick={closePopup}>
            <CloseIcon type='primary'/>
          </div>
        </section>
        {props.children}
      </section>
    </>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  setVisible: PropTypes.func,
};
