import React from 'react'
import './Heading.css'
const Heading = ({heading1text,paragraph1text}) => {
   
  return (
    <div className='container'>
        <h1 className='h1'>
            {heading1text}
        </h1>
        <br></br>
        <p className='p1'>
            {paragraph1text?.split('\n').map((item, key) => {
                return <p key={key}>{item}<br></br></p>
            }
            )}
            </p>
    </div>
  )
}

export default Heading