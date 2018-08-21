import React from 'react';
import './description.css';

const Description = props => {
  const {description='Phone description here'} = props;
  return (
    <h1 className="phone-description">{description}</h1>
  );
}

export default Description;