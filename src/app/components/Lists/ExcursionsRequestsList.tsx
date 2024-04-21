'use client';
import React, { useEffect, useState } from 'react';
import { IExcursionRequest } from '@/interfaces/excursion.model';
import ExcursionRequestItem from '@/app/components/Lists/ExcursionRequestItem';
import { useInView } from 'react-intersection-observer';

interface IProps {
  initialData: IExcursionRequest[];
  loadNext: (lastDocId: string) => Promise<IExcursionRequest[]>;
}

const ExcursionsRequestsList = ({ initialData, loadNext }: IProps) => {
  const { ref, inView } = useInView();
  const [newData, setNewData] = useState<IExcursionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNextBatch = async () => {
      setIsLoading(true);
      const newBatch = await loadNext(
        newData.length
          ? newData[newData.length - 1].requestId
          : initialData[initialData.length - 1].requestId,
      );
      setNewData((prevState) => [...prevState, ...newBatch]);
      setIsLoading(false);
    };
    if (inView) {
      loadNextBatch();
    }
  }, [inView]);
  return (
    <>
      {initialData.map((excursionRequest) => {
        return (
          <ExcursionRequestItem
            {...excursionRequest}
            key={excursionRequest.requestId}
          />
        );
      })}
      {newData.map((excursionRequest) => {
        return (
          <ExcursionRequestItem
            {...excursionRequest}
            key={excursionRequest.requestId}
          />
        );
      })}
      <div ref={ref} style={{ width: 20, height: 20 }}>
        {isLoading && <div>Loading...</div>}
      </div>
    </>
  );
};

export default ExcursionsRequestsList;
