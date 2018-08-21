import React from 'react';
import RatingStars from '../rating-stars';

const PhoneDetails = props => {
  const {title='Change Me', description='Replace Me', stars='2'} = props;
  return (
    <div className="title">
      <h1>{title}</h1>
      <RatingStars stars={stars} />
      <div>{description}</div>
    </div>
  )
}

export default PhoneDetails;