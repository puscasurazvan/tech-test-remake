import React from 'react'
import './button.css'

const Button = props => {
  const { label = 'Label', clickHandler, value, selected } = props;
  const style = {};
  if (!label.length) {
    style.backgroundColor = value;
  }
  return (
    <button
      className={selected ? 'button__selected':'button'}
      style={style}
      onClick={()=>clickHandler(value)}>{label}</button>
  );
}

export default Button;