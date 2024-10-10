// TODO: finish this component

import {
  type ChangeEventHandler,
  type Dispatch,
  type InputHTMLAttributes,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import styles from '@/src/styles/double-range-slider.module.css';

type MinMax = [number, number];
type Props = InputHTMLAttributes<HTMLInputElement> & {
  boundaries: MinMax;
  selectedValues: Dispatch<SetStateAction<MinMax>>;
};

export default function DoubleRangeSlider({
  boundaries: [min, max],
  selectedValues,
}: Props) {
  const [lowerVal, setLowerVal] = useState<number>(min);
  const [upperVal, setUpperVal] = useState<number>(max);

  useEffect(
    () => selectedValues([lowerVal, upperVal]),
    [lowerVal, upperVal, selectedValues],
  );

  const handleChangerLower: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currVal = parseInt(e.target.value);
    if (currVal < upperVal) setLowerVal(currVal);
  };

  const handleChangerUpper: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currVal = parseInt(e.target.value);
    if (currVal > lowerVal) setUpperVal(currVal);
  };

  return (
    <div className={styles['double-range-slider']}>
      <p>{min}</p>
      <input
        type='range'
        min={min}
        max={max}
        value={lowerVal}
        onChange={handleChangerLower}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={upperVal}
        onChange={handleChangerUpper}
      />
      <p>{max}</p>
    </div>
  );
}
