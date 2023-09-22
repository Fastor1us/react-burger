import modalOverlayStyles from './modal-overlay.module.css';


export default function ModalOverlay(props: { closePopup: () => void }) {
  return (
    <div
      className={modalOverlayStyles.overlay}
      onClick={e => e.target === e.currentTarget && props.closePopup()}
    >
    </div>
  );
}
