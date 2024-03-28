'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface IProps {
  defaultToggle: boolean;
  firstOption: string;
  secondOption: string;
}

const ToggleButton = ({ defaultToggle, firstOption, secondOption }: IProps) => {
  const [isToggled, setIsToggled] = useState(defaultToggle);
  const router = useRouter();
  const pathname = usePathname();
  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);

    router.push(`${pathname}?isPrivate=${isToggled}`, { scroll: false });
  };

  return (
    <button
      onClick={handleToggle}
      className={`toggleButton`}
      aria-label="Toggle button"
    >
      <div className={`toggleButton__thumb ${isToggled ? 'on' : ''}`} />

      <div className={`toggleButton__option ${isToggled ? '' : 'active'}`}>
        {firstOption}
      </div>

      <div className={`toggleButton__option ${isToggled ? 'active' : ''}`}>
        {secondOption}
      </div>
    </button>
  );
};

export default ToggleButton;
