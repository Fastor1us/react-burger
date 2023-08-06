import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';

export default function ModalOverlay(props) {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.setVisible(false);
        }
      }}
    >
    </div>
  );
}

ModalOverlay.propTypes = {
  setVisible: PropTypes.func,
};
