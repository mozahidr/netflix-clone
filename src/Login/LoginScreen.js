import React, { useState } from 'react';
import "./LoginScreen.css";
import loginLogo from "../images/loginLogo.png";
import { SignupScreen } from '../SignUp/SignupScreen';

export const LoginScreen = () => {
    const [signIn, setSignIn] = useState(false);
  return (
    <div className='loginScreen'>
        <div className='loginScreen__background'>
            <img src={loginLogo} alt="loginbg" className="loginScreen__logo" />
            <button onClick={() => setSignIn(true)} className='loginScreen__button'>Sign In</button>
            <div className='loginScreen__gradient' />
        </div>
        <div className='loginScreen__body'>
            {signIn ? (
                <SignupScreen />
            ) : (
                <>
               <h1>Unlimited films, TV programmes and more.</h1>
                <h2>Watch anywhere. Cancel any time</h2>
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className='loginScreen__input'>
                        <form>
                            <input type='email' placeholder='Email address' />
                            <button onClick={() => setSignIn(true)} className="loginScreen__getStarted">GET STARTED</button>
                        </form>
                    </div>
            </>
            )}
        </div>
    </div>
  )
}
