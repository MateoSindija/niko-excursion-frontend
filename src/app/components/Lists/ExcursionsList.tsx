'use client';
import React, { useState } from 'react';
import formatDate from '@/app/utils/formatDate';
import ConfirmModal from '@/app/components/Modals/ConfirmModal';
import deleteExcursion from '@/app/api/database/deleteExcursion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface IExcursionsListProps {
  excursions: IExcursion[] | undefined;
}

const ExcursionItem = ({ id, createdAt, titleHr, duration }: IExcursion) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();
  const handleDeleteExcursion = async () => {
    await deleteExcursion(id);
    setIsDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <div key={id} className="excursionList__item">
        <div className="excursionList__item__title">{titleHr}</div>
        <div className="excursionList__item__duration">{duration + 'h'}</div>
        <div className="excursionList__item__createdAt">
          {formatDate(createdAt.nanoseconds, createdAt.seconds)}
        </div>
        <div>
          <Link
            className="excursionList__item__button changeBtn"
            href={{ pathname: `/admin/new-excursion/${id}` }}
          >
            Izmijeni
          </Link>
          <button
            className="excursionList__item__button deleteBtn"
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
          >
            Izbriši
          </button>
        </div>
      </div>
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Jeste li sigurni da želite obrisati eskurziju?"
          isModalOpen={setIsDeleteModalOpen}
          onConfirmFunction={handleDeleteExcursion}
        />
      )}
    </>
  );
};

const ExcursionsList = ({ excursions }: IExcursionsListProps) => {
  return (
    <div className="excursionList">
      <div className="excursionList__header">
        <h4 className="excursionList__header__title">Naziv Eskurzije</h4>
        <h4 className="excursionList__header__duration">Trajanje</h4>
        <h4 className="excursionList__header__created">Datum stvaranja</h4>
        <h4 className="excursionList__header__control">Upravljanje</h4>
      </div>
      {excursions?.map((excursion) => {
        return <ExcursionItem {...excursion} key={excursion.id} />;
      })}
    </div>
  );
};

export default ExcursionsList;
