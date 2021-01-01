import React from 'react';
import useToggleState from '../hooks/useToggleState';
import SignIn from './SignIn';
import Signup from './SignUp';

export default function Welcome() {
  const [isNew, toggle] = useToggleState(false);
  return (
    <div>
      { !isNew ?
        <SignIn toggle={() => toggle}/> :
        <Signup toggle={() => toggle}/>
      }
      
      
    </div>
  )
}
