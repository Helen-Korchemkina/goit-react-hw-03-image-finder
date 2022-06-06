import React from "react";
import s from './Button.module.css';

const Button = ({changePage}) => (
        <button type="button" onClick={changePage} className={s.button}>Load more</button>

)

export default Button;
