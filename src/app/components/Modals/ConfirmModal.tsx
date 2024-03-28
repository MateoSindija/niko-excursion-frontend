'use client';
import React, { useEffect, useState } from 'react';
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';

interface IProps {
  title: string;
  isModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onConfirmFunction: () => void;
  confirm?: string;
  cancel?: string;
}

const ConfirmModal = ({
  title,
  isModalOpen,
  onConfirmFunction,
  confirm = 'Izbriši',
  cancel = 'Prekid',
}: IProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  useDisableBodyScroll(true);

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
            {confirm}
          </button>
          <button
            disabled={isDisabled}
            onClick={() => isModalOpen(false)}
            className="overlay__modal__buttons__cancel"
          >
            {cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
