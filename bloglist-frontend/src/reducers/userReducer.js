import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN_USER': {
      return action.data
    }
    case 'LOGOUT_USER': {
      return null
    }
    case 'SET_LOADED_USER': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      storage.saveUser(user)

      dispatch(setNotification({
        message: `${user.name} welcome back!`,
        type: 'success',
      }, 5))

      dispatch({
        type: 'LOGIN_USER',
        data: user,
      })
    } catch (exception) {
      dispatch(setNotification({
        message: 'wrong username/password',
        type: 'error',
      }, 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storage.removeUser()

    dispatch({
      type: 'LOGOUT_USER',
    })
  }
}

export const loadUser = () => {
  return async dispatch => {
    const user = storage.loadUser()

    dispatch({
      type: 'SET_LOADED_USER',
      data: user,
    })
  }
}

export default userReducer