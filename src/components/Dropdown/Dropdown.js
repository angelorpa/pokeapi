import React from 'react';

const Dropdown = ({ options, onSelect, children }) => {
  const classes = 'btn btn-outline-primary dropdown-toggle';
  const renderOptions = () =>
    options.map((option) => (
      <li key={`option-${option}`} onClick={() => onSelect(option)}>
        <a className="dropdown-item" href="#">
          {option}
        </a>
      </li>
    ));

  return (
    <div className="dropdown">
      <button
        className={classes}
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
      >
        {children}
      </button>

      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {renderOptions()}
      </ul>
    </div>
  );
};

export default Dropdown;
