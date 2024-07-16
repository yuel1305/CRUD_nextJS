interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
  return (
    <dialog
      id="my_modal_4"
      className={`modal ${modalOpen ? "modal-open" : ""}`}
    >
      <div className="w-5/12 max-w-5xl modal-box modal-action">
        <form method="dialog">
          <button
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            onClick={() => setModalOpen(false)}
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
