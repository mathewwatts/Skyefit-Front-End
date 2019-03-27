import React from 'react'
import errorImg from './assets/icons/error-image.png'

function ServerError() {
  return (
    <div className="background" id="user-sessions">
      <p id="logo-type">SkyeFIT</p>
        <div className="main-container">
          <div className="content-container">
            <h2>ServerError 500: Internal Server Error</h2>
            <p>For more info please contact:</p>
            <img width="200" src={errorImg} alt="error icon" />
            <a href="https://github.com/dijonmusters" target="blank">Dijon Musters</a>
          </div>
        </div>
    </div>        
  )
}

export default ServerError;