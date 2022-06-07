import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ changePage }) => (
  <button type="button" onClick={changePage} className={s.button}>
    Load more
  </button>
);

Button.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default Button;
