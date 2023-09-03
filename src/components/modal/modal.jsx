import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import closeBtnPng from '../../images/close-btn.png';
import { useNavigate } from 'react-router-dom';

export default function Modal(props) {
  const modalRoot = document.querySelector('#modal');
  const navigate = useNavigate();

  React.useEffect(() => {
    function escClickHandler(e) {
      if (e.key === 'Escape') {
        console.log(props);
        props.setVisible ? props.setVisible(false) : navigate(-1);
      }
    }
    document.addEventListener('keydown', escClickHandler);
    return () => {
      document.removeEventListener('keydown', escClickHandler);
    };
  }, []);

  return createPortal(<>
      <ModalOverlay setVisible={props.setVisible}/>
      <section className={styles.modalWindow}>
        <section className={styles.modalHeader}>
          <h2 className='text text_type_main-large'>{props.title || ''}</h2>
          <div
            className={styles.modalCloseBtn}
            onClick={() => {
              props.setVisible ? props.setVisible(false) : navigate(-1); 
            }}
          >
            <img
              className={styles.modalCloseBtnImage}
              src={closeBtnPng}
              alt='close-button'
            />
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
