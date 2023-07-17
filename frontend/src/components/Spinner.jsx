import React from 'react'
import gif from "../images/taco_gif.gif"

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
      <img
        src={gif} // Replace with the path to your GIF file
        alt='Loading...'
        className='loadingSpinner'
      />
    </div>

  )
}

export default Spinner