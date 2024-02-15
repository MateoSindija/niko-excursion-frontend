'use client';
import React, { useState } from 'react';
import { DateTime } from 'next-auth/providers/kakao';
import formatDate from '@/app/utils/formatDate';
import ConfirmModal from '@/app/components/Modals/ConfirmModal';
interface IExcursion {
  id: string;
  title: string;
  descriptionEng: string;
  descriptionCro: string;
  duration: number;
  images: string[];
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
  authorId: string | null;
}

interface IExcursionsListProps {
  excursions: IExcursion[] | undefined;
}

const ExcursionsList = ({ excursions }: IExcursionsListProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  console.log(excursions);
  return (
    <div className="excursionList">
      <div className="excursionList__header">
        <h4 className="excursionList__header__title">Naziv Eskurzije</h4>
        <h4 className="excursionList__header__duration">Trajanje</h4>
        <h4 className="excursionList__header__created">Datum stvaranja</h4>
        <h4 className="excursionList__header__control">Upravljanje</h4>
      </div>
      {excursions?.map((excursion) => {
        return (
          <div key={excursion.id} className="excursionList__item">
            <div className="excursionList__item__title">{excursion.title}</div>
            <div className="excursionList__item__duration">
              {excursion.duration + 'h'}
            </div>
            <div className="excursionList__item__createdAt">
              {formatDate(
                excursion.createdAt.nanoseconds,
                excursion.createdAt.seconds,
              )}
            </div>
            <div>
              <button>Izmjeni</button>
              <button onClick={() => setIsDeleteModalOpen(true)}>
                Izbriši
              </button>
            </div>
          </div>
        );
      })}
      {isDeleteModalOpen && (
        <ConfirmModal
          title="Jeste li sigurni da želite obrisati eskurziju?"
          isModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
};

export default ExcursionsList;
