import React from 'react'
import {Redirect, Route} from 'react-router-dom'

export default function ProtectedRoute({component: Component, ...rest}) {
  return (
    // <Route
    //     {...rest}
    //     render={props => 
    //         localStorage.getItem('token') ? (<Component {...props} />) 
    //         : (<Redirect to={{
    //                 pathname: '/',
    //                 search: '?loggin',
    //                 state: { from: props.location}}}
    //             message="You are not Logged in"/>)}
    // />    
    <Route
        {...rest}
        render={props => {
          if(localStorage.getItem('token')){
            return <Component {...props} />
          } else {
            if(window.location.pathname.split('/')[1] === 'admin'){
              return <Redirect to={{
                pathname: '/admin',
                search: '?login',
                state: { from: props.location}}}
            />
            }
            return <Redirect to={{
              pathname: '/',
              search: '?login',
              state: { from: props.location}}}
          />
          }
        }
      }
    /> 
  )
}
