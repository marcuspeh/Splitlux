import axios, { AxiosError } from 'axios';

import { AuthData } from "../models/data/authData";
import { RegisterResponse } from "../models/response/registerResponse";
import customAxios from './utilities/customAxios';
import { API_URL } from '../common'


const signIn = async (email: string, password: string): Promise<AuthData> => {
  var result;
  try {
    result = await customAxios.post(
      `${API_URL}/auth/jwt/create/`,
      {
        "email": email,
        "password": password,
      }
    )
  } catch (err) {
    // do nothing
    console.log(err)
  }

  return {
    email: email,
    refresh: result ? result.data.refresh : "",
    access: result ? result.data.access : "",
  }
};

const register = async (name: string, email: string, password: string, password2: string): Promise<RegisterResponse> => {
  try {
    const result = await customAxios.post(
      `${API_URL}/auth/users/`,
      {
        "name": name,
        "email": email,
        "password": password,
        "re_password": password2
      }
    )
    return {
      isSuccess: true
    }
  } catch (error: AxiosError | any) {
    console.log(error)
    const response: RegisterResponse = {isSuccess: false}
    const data = error.response.data

    if (data.name) response.nameError = data.name
    if (data.email) response.emailError = data.email
    if (data.password) response.passwordError = data.password
    if (data.non_field_errors) response.password2Error = data.non_field_errors[0]
  
    return response
  }
}
  
const resetPassword = async (email: string): Promise<void> => {
  try {
    await customAxios.post(
      `${API_URL}/auth/users/reset_password/`,
      {
        email: email
      }
    )
  } catch (error) {
    console.log(error)
  }
}
  
const verifyToken = async (token: string): Promise<boolean> => {
  try {
    await customAxios.post(
      `${API_URL}/auth/jwt/verify/`,
      {
        token: token
      }
    )
    return true
  } catch (error) {
    return false
  }
}

export const AuthService = {
  signIn,
  register,
  resetPassword,
  verifyToken
};