import React from 'react'
import {GoogleLogout} from 'react-google-login'
import '../App.css'
const clientId = '329042819432-5pvtu2kl3msh6e12n30b2hldrn5epc6e.apps.googleusercontent.com'

const Logout = (props) => 
{
    return (
        <div className="logoutButtonWrapper">
            <GoogleLogout
                        render={renderProps => 
                            (
                                <button className="logoutButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    Log out
                                </button>
                                
                            )}
                        clientId={clientId}
                        buttonText='Log out'
                        onLogoutSuccess={props.onLogout}
                    /> 
        </div>
    )
}

export default Logout
