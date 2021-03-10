import React from 'react';

interface IOption {
  value: number;
  text: string;
}

interface IRadioQuest {
  title: string;
  type: string;
  options: Array<IOption>;
  stateValue: string;
  setState(type: string, value: number);
}

const RadioQuest: React.FC<IRadioQuest> = (props) => {
  const {title, options, type, stateValue, setState} = props;

  return (
    <div className="mb-8 text-xl">
      <span className="block mb-4">{title}</span>

      {options.map((option) => (
        <div className="mb-3">
          <input
            className="mr-2"
            type="radio"
            id={option.text}
            name={type}
            checked={stateValue === `${option.value}`}
            value={option.value}
            onChange={(e) => setState(type, Number(e.target.value))}
          />
          <label htmlFor={option.text}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioQuest;
