import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import modalStyles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

export default function Modal(props) {
  const modalRoot = document.querySelector('#modal');

  React.useEffect(() => {
    document.addEventListener('keydown', somefunc);
    return () => {
      document.removeEventListener('keydown', somefunc);
    };
  }, []);

  function somefunc(e) {
    if (e.key === 'Escape') {
      props.setVisible(false);
    }
  }

  return createPortal(
    <ModalOverlay setVisible={props.setVisible}>
      <section className={modalStyles.modalWindow}>
        <section className={modalStyles.modalHeader}>
          <h2 className='text text_type_main-large'>{props.title || ''}</h2>
          <div
            className={modalStyles.modalCloseBtn}
            onClick={() => {
              props.setVisible(false);
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.29289 3.29289C3.68342 2.90237 4.31658 2.90237 4.70711 3.29289L12 10.5858L19.2929 3.29289C19.6834 2.90237 20.3166 2.90237 20.7071 3.29289C21.0976 3.68342 21.0976 4.31658 20.7071 4.70711L13.4142 12L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L12 13.4142L4.70711 20.7071C4.31658 21.0976 3.68342 21.0976 3.29289 20.7071C2.90237 20.3166 2.90237 19.6834 3.29289 19.2929L10.5858 12L3.29289 4.70711C2.90237 4.31658 2.90237 3.68342 3.29289 3.29289Z'
                fill='#F2F2F3'
              />
            </svg>
          </div>
        </section>
        {props.children}
      </section>
    </ModalOverlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  setVisible: PropTypes.func,
};
