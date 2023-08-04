import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  return (
    <section
      className={modalOverlayStyles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.setVisible(false);
        }
      }}
    >
      {props.children}
    </section>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  setVisible: PropTypes.func,
};
