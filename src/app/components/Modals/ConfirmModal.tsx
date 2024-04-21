'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';
import { useDetectRef } from '@/hooks/useDetectRef';

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
  const ref = useRef(null);
  useDisableBodyScroll(true);
  useDetectRef(ref, () => isModalOpen(false));

  return (
    <div className="overlay">
      <div className="overlay__modal" ref={ref}>
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
