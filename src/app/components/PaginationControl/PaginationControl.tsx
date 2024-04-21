'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ArrowIcon from '@/app/utils/vectors/ArrowIcon';
import { IExcursionRequest } from '@/interfaces/excursion.model';

interface IProps {
  page: number;
  perPage: number;
  count: number;
  loadPage: () => void;
}

const PaginationControl = ({ count, perPage, page, loadPage }: IProps) => {
  const buttonCount = Array.from(
    { length: Math.ceil(count / perPage) },
    (_, index) => index + 1,
  );

  return (
    <div className="paginationControl">
      {page !== 1 ? (
        <button
          onClick={loadPage}
          aria-disabled={'true'}
          className="paginationControl__button"
        >
          <ArrowIcon direction={'previous'} />
        </button>
      ) : (
        <div className="paginationControl__button">
          <ArrowIcon direction={'previous'} />
        </div>
      )}
      {buttonCount.map((count) => {
        return (
          <button
            onClick={() => {}}
            className={`paginationControl__button ${
              page === count ? 'activeLink' : ''
            }`}
            key={count}
          >
            {count}
          </button>
        );
      })}
      {page !== buttonCount.length ? (
        <button onClick={loadPage} className="paginationControl__button">
          <ArrowIcon direction={'next'} />
        </button>
      ) : (
        <div className="paginationControl__button">
          <ArrowIcon direction={'next'} />
        </div>
      )}
    </div>
  );
};

export default PaginationControl;
