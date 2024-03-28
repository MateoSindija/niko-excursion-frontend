import React from 'react';

interface IProps {
  page: number;
  perPage: number;
  count: number;
}

const PaginationControl = ({ count, perPage, page }: IProps) => {
  const buttonCount = Array.from(
    { length: Math.ceil(count / perPage) + 1 },
    (_, index) => index + 1,
  );
  return (
    <div>
      {buttonCount.map((count) => {
        return <button key={count}>{count}</button>;
      })}
    </div>
  );
};

export default PaginationControl;
