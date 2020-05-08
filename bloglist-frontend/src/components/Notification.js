import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const NotificationText = styled.span`
  color: ${props => props.type === 'success' ? 'green' : 'red'};
`

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if ( !notification ) {
    return null
  }

  return (
    <NotificationText type={notification.type}>
      {notification.message}
    </NotificationText>
  )
}

export default Notification