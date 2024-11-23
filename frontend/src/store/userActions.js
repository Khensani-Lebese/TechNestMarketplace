import { loginRequest, loginSuccess, loginFailure } from './userSlice';
import axios from 'axios';

export const registerUser = (userData) => async (dispatch) => {
    console.log(userData);
  dispatch(loginRequest());
  try {
    const { code, ...rest } = userData; // Separate the code from the rest of the user data
   

    //  POST request to  backend for registration
    const response = await axios.post('http://localhost:5000/api/users/register', {
      ...rest,
   
    });

    dispatch({type: 'REGISTER_SUCCESS', payload: response.data});
    dispatch(loginSuccess(response.data)); // Dispatch success action with user data


  } catch (error) {
    dispatch(loginFailure(error.response.data));
    dispatch({ type: 'REGISTER_FAILURE', payload: error.response?.data.message || 'Registration failed' }); // Dispatch failure action with error
  }
};

export const loginUser = (credentials) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try {
      const response = await axios.post('/api/users/login', credentials);
      const { token, user } = response.data;
  
      localStorage.setItem('token', token);
  
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user },
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
    }
  };
