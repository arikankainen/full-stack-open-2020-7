const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    default:
      return state
  }
}

let timeoutID = null
export const setNotification = (message, timeout) => {
  if (timeoutID !== null) {
    clearTimeout(timeoutID)
  }

  return async dispatch => {
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch(
      {
        type: 'SET_MESSAGE',
        data: message
      }
    )
  }
}

export const clearNotification = () => {
  return {
    type: 'SET_MESSAGE',
    data: null
  }
}

export default notificationReducer