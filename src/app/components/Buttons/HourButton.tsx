import React, { useCallback, useMemo } from 'react';

interface IProps {
  hour: number;
  handleDisabled: () => boolean;
  handleClick: (hour: number) => void;
  selectedButton: number | undefined;
}

const HourButton = (props: IProps) => {
  const { handleClick, handleDisabled, hour, selectedButton } = props;
  const handleButtonClass = useMemo(() => {
    if (selectedButton !== undefined) {
      if (selectedButton === hour) {
        return 'selectedHour';
      }
      return 'notSelectedHour';
    }

    return '';
  }, [selectedButton, hour]);
  return (
    <button
      className={`hourButton ${handleButtonClass}`}
      type="button"
      disabled={handleDisabled()}
      onClick={() => handleClick(hour)}
    >
      {`${hour}h`}
    </button>
  );
};

export default HourButton;
