'use client';
import { useEffect, useState } from 'react';
import getBlockedHoursForDay from '@/app/api/database/getBlockedHoursForDay';
import getBlockedHoursInDay from '@/app/api/database/getBlockedHoursForDay';

export function useGetBlockedHours(selectedDate: Date) {
  const [isLoading, setIsLoading] = useState(true);
  const [blockedHours, setBlockedHours] = useState<number[]>([]);

  useEffect(() => {
    const getBlockedHours = async () => {
      setBlockedHours([]);
      setIsLoading(true);
      const blockedHoursInDay = await getBlockedHoursInDay(selectedDate);
      for (const hour in blockedHoursInDay) {
        setBlockedHours((prevState) => [
          ...prevState,
          parseInt(blockedHoursInDay[hour]),
        ]);
      }
      setIsLoading(false);
    };
    getBlockedHours();
  }, [selectedDate]);

  return { isLoading, blockedHours };
}
