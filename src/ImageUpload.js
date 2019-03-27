import React, { Component } from 'react'
import axios from 'axios'

export default class ImageUpload extends Component {
  state = {}

  handleUpload = (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token': localStorage.getItem('token')
          }
      }
      const url = `${process.env.REACT_APP_API_URL}/admin/uploadprofilepicture`
      axios.post(url, formData, config )
        .then(res => {
            const image = res.data.secure_url
            this.setState({image})
            this.props.addImage(image)
        })
        .catch(err => {
          if(!err.response) return console.error(err)
          if(err.response.status === 500) return this.props.history.replace('/servererror')
          if(err.response.status === 401 || err.response.status === 403) return this.props.history.replace('/admin')
        })
  }

  render() {
    return (
      <>
        {/* { image && <img src={image} alt="user profile"/>} */}
        <input type="file" name="image-upload" id="image-upload" onChange={this.handleUpload}/>
      </>
    )
  }
}
