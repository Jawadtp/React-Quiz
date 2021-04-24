import React from 'react'
import {GoogleLogin} from 'react-google-login'
import '../App.css'
const clientId = '329042819432-5pvtu2kl3msh6e12n30b2hldrn5epc6e.apps.googleusercontent.com'


const Login = (props) => 
{
    function onLogin(res)
    {
        props.onLogin(res)
    }
    function onLoginFail(res)
    {
        console.log('Failed to log in: ' + res)
    }
    return (
        <div className="loginButtonWrapper center">
            <GoogleLogin
            render={renderProps => 
                (
                    <button className="loginButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        Google Sign In
                    </button>
                    
                )}
            clientId={clientId}
            buttonText='Sign In with Google'
            onSuccess={onLogin}
            onFailure={onLoginFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />
    </div>
    )
}

export default Login
