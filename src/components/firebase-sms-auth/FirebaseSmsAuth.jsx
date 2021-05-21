import React, { useEffect } from 'react'
import firebase from "../../utils/firebase";

const FirebaseSmsAuth = () => {

    const setUpRecaptcha = ()=>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
            }
        });
    }

    

    // useEffect(()=>{
    //     setUpRecaptcha();
    // },[])

    const onSignInSubmit = (e)=>{
        e.preventDefault();
        setUpRecaptcha();
        const phoneNumber = "+998942786776"//getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("SMS send");
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.error("SMS not send ", error);
            });

    }

    return (
        <div>
            <form onSubmit={onSignInSubmit}>
                <div id="recaptcha-container">

                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FirebaseSmsAuth
