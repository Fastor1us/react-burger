import React from 'react';
import PropTypes from 'prop-types';
import modalOverlayStyles from './modal-overlay.module.css';
import { useNavigate } from 'react-router-dom';


export default function ModalOverlay(props) {
  const navigate = useNavigate();
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.setVisible ? props.setVisible(false) : navigate(-1);
        }
      }}
    >
    </div>
  );
}

ModalOverlay.propTypes = {
  setVisible: PropTypes.func,
};
