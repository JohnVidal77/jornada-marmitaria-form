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
  setState(type: string, value: number, text: string);
}

const RadioQuest: React.FC<IRadioQuest> = (props) => {
  const {title, options, type, stateValue, setState} = props;

  return (
    <div className="mb-8 text-xl">
      <span className="block mb-4 font-bold">{title}</span>

      {options.map((option) => (
        <div className="mb-3" key={option.value}>
          <input
            className="mr-2"
            type="radio"
            id={option.text}
            name={type}
            checked={stateValue === `${option.value}`}
            value={option.value}
            onChange={(e) => {
              setState(type, Number(e.target.value), option.text);
            }}
          />
          <label htmlFor={option.text}>{option.text}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioQuest;
