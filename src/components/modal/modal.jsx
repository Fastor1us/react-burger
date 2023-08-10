import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import closeBtnPng from '../../images/close-btn.png';

export default function Modal(props) {
  const modalRoot = document.querySelector('#modal');

  React.useEffect(() => {
    function escClickHandler(e) {
      if (e.key === 'Escape') {
        props.setVisible(false);
      }
    }
    document.addEventListener('keydown', escClickHandler);
    return () => {
      document.removeEventListener('keydown', escClickHandler);
    };
  }, []);

  return createPortal(<>
      <ModalOverlay setVisible={props.setVisible}/>
      <section className={modalStyles.modalWindow}>
        <section className={modalStyles.modalHeader}>
          <h2 className='text text_type_main-large'>{props.title || ''}</h2>
          <div
            className={modalStyles.modalCloseBtn}
            onClick={() => {
              props.setVisible(false);
            }}
          >
            <img
              className={modalStyles.modalCloseBtnImage}
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
