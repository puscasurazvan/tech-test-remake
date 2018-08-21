import React from 'react';
import './rating-stars.css';

const RatingStars = props => {
  const {stars} = props;
  return(
    <div className="stars">
      <div className="stars-before"></div>
      <div className="stars-after" style={{width: (20 * stars) + 'px'}}></div>
    </div>
  )
}

export default RatingStars;