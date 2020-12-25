import React from 'react'

function EstimateForm(props) {
  const { estimate } = props;

  return (
    <div>
      <h1>{estimate.name}</h1>
    </div>
  )
}

export default EstimateForm;