'use client';
import React, { useState } from 'react';
import formatDate from '@/app/utils/formatDate';
import { IExcursionRequest } from '@/interfaces/excursion.model';
import ConfirmModal from '@/app/components/Modals/ConfirmModal';
import handleExcursionRequest from '@/app/api/database/handleExcursionRequest';
import deleteRequestForExcursion from '@/app/api/database/deleteRequestForExcursion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ExcursionRequestItem = ({
  excursionTitle,
  passengerNumber,
  departureHour,
  date,
  clientName,
  clientEmail,
  clientNumber,
  excursionId,
  createdAt,
  price,
  optionalMessage,
  isApproved,
  requestId,
}: IExcursionRequest) => {
  const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const handleRefuseExcursion = async () => {
    await handleExcursionRequest(false, requestId, excursionId);
    setIsRefuseModalOpen(false);
    router.refresh();
  };
  const handleConfirmExcursion = async () => {
    await handleExcursionRequest(true, requestId, excursionId);
    setIsConfirmModalOpen(false);
    router.refresh();
  };

  const handleDeleteRequest = async () => {
    await deleteRequestForExcursion(requestId);
    setIsDeleteModalOpen(false);
    router.refresh();
  };

  const handleClassName = () => {
    switch (isApproved) {
      case 'confirmed':
        return 'confirmed';
      case 'refused':
        return 'refused';
      case 'sent':
        return 'sent';
    }
  };

  return (
    <div className={`requestItem ${handleClassName()}`}>
      <div className="requestItem__info">
        <div className="requestItem__info__col lg">
          <h3 className="requestItem__info__col__title">Eskurzija</h3>
          <div className="requestItem__info__col__content">
            <div>{excursionTitle}</div>
            <div>
              <b>Broj putnika:</b> {passengerNumber}
            </div>
            <div>
              <b>Vrijeme polaska:</b> {departureHour}
            </div>
            <div>
              <b>Datum polaska:</b>
              {formatDate(date.nanoseconds, date.seconds, false)}
            </div>
          </div>
        </div>
        <div className="requestItem__info__col md">
          <h3 className="requestItem__info__col__title">Klijent</h3>
          <div className="requestItem__info__col__content">
            <div>
              <b>Ime:</b> {clientName}
            </div>
            <div>
              <b>Broj:</b> <a href={`tel:${clientNumber}`}>{clientNumber}</a>
            </div>
            <div>
              <b>Email:</b> <a href={`mailto: ${clientEmail}`}>{clientEmail}</a>
            </div>
          </div>
        </div>
        <div className="requestItem__info__col lg">
          <h3 className="requestItem__info__col__title">Upit</h3>
          <div className="requestItem__info__col__content">
            {optionalMessage}
          </div>
        </div>
        <div className="requestItem__info__col sm">
          <h3 className="requestItem__info__col__title">Cijena</h3>
          <div className="requestItem__info__col__content">{price}€</div>
        </div>
      </div>
      <div className="requestItem__info__buttons">
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="requestItem__info__buttons__delete requestBtn"
        >
          <Image src={'/trash.svg'} width={20} height={20} alt={'trash'} />
        </button>
        <div className="requestItem__info__buttons__container">
          <button
            onClick={() => setIsRefuseModalOpen(true)}
            className="requestItem__info__buttons__container__refuse requestBtn"
          >
            Odbij
          </button>
          <button
            onClick={() => setIsConfirmModalOpen(true)}
            className="requestItem__info__buttons__container__confirm requestBtn"
          >
            Odobri
          </button>
        </div>
      </div>
      {isRefuseModalOpen && (
        <ConfirmModal
          title="Jeste li sigurni da želite odbiti eskurziju?"
          isModalOpen={setIsRefuseModalOpen}
          confirm="Odbij"
          onConfirmFunction={handleRefuseExcursion}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Jeste li sigurni da želite izbrisati zahtjev za eskurziju?"
          isModalOpen={setIsDeleteModalOpen}
          confirm="Izbriši"
          onConfirmFunction={handleDeleteRequest}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="Jeste li sigurni da želite potvrditi eskurziju?"
          isModalOpen={setIsConfirmModalOpen}
          confirm="Potvrdi"
          onConfirmFunction={handleConfirmExcursion}
        />
      )}
    </div>
  );
};

export default ExcursionRequestItem;
