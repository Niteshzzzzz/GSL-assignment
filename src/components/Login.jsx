import React, { useState } from 'react'
import InputField from './InputField'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Login() {

  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  // form validation rules
  const validateConfig = {
    username: [{ required: true, message: 'Please enter an username.' }, { minLength: 3, message: 'Username should be atleast 3 characters long.' }],
    password: [{ required: true, message: 'Please enter password.' }, { minLength: 6, message: 'Password should be atleast 6 characters long.' }],
  }

  // validating form data
  const validate = (formData) => {
    const errorData = {}

    Object.entries(formData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorData[key] = rule.message
          return true
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorData[key] = rule.message
          return true
        }

        // if (rule.pattern && !rule.pattern.test(value)) {
        //   errorData[key] = rule.message
        //   return true
        // }
      })
    })

    setErrors(errorData)
    return errorData
  }

  // handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    const validateResult = validate(formData)
    if (Object.keys(validateResult).length) return

    setFormData({
      username: '',
      password: ''
    })

    try {
      console.log(formData)
      const { data } = await axios.post('auth/login', formData)
      localStorage.setItem('token', JSON.stringify(data))
      toast.success('You logedin successfully.')
      navigate('/')
    } catch (error) {
      toast.error('username/password is wrong. Please try again!')
    }
  }

  const handleEvent = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="login-container">
      <div className="login">
        <form action="/account" onSubmit={handleSubmit}>
          <h2>LogIn</h2>
          <div>
            <InputField id='username' label='username' name='username' value={formData.username} onChange={handleEvent} error={errors.username} type={'text'} />
            <InputField id='password' label='password' name='password' value={formData.password} onChange={handleEvent} error={errors.password} type={'password'} />
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login