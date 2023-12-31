import React from 'react';
import Star from './Star';
import '../assets/css/star.css';

const RatingStars = ({ rating, handleRatingChange }) => {
  const GRADES = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
  const activeStar = {
    fill: 'yellow'
  };

  const changeGradeIndex = (index) => {
    handleRatingChange(parseInt(index, 10) + 1);
  };

  return (
      <div className="stars">
        {GRADES.map((grade, index) => (
          <Star
            index={index}
            key={grade}
            changeGradeIndex={changeGradeIndex}
            style={index < rating ? activeStar : {}}
          />
        ))}
      </div>
  );
};

export default RatingStars;
