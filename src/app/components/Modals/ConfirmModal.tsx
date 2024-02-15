import React from 'react';

interface IProps {
  title: string;
  isModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
}
const ConfirmModal = ({ title, isModalOpen }: IProps) => {
  return (
    <div className="overlay">
      <div className="overlay__modal">
        <h4>{title}</h4>
        <div className="overlay__modal__buttons">
          <button className="overlay__modal__buttons__confirm" type="submit">
            Izbriši
          </button>
          <button
            onClick={() => isModalOpen(false)}
            className="overlay__modal__buttons__cancel"
            type="submit"
          >
            Prekid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
