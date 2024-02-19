'use client';
import React, { useState } from 'react';

interface IProps {
  title: string;
  isModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirmFunction: () => void;
}
const ConfirmModal = ({ title, isModalOpen, onConfirmFunction }: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="overlay">
      <div className="overlay__modal">
        <h4>{title}</h4>
        <div className="overlay__modal__buttons">
          <button
            className="overlay__modal__buttons__confirm"
            disabled={isDisabled}
            onClick={() => {
              setIsDisabled(true);
              onConfirmFunction();
            }}
          >
            Izbriši
          </button>
          <button
            disabled={isDisabled}
            onClick={() => isModalOpen(false)}
            className="overlay__modal__buttons__cancel"
          >
            Prekid
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
