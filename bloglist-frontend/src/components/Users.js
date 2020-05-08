import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const H2 = styled.h2`
  margin-top: var(--default-margin);
  font-family: 'Raleway', sans-serif;
  font-weight: 500;
  color: var(--accent-color-1);
`
const Table = styled.table`
  margin-top: var(--default-margin);
  border: 1px solid #333;
`
const Th = styled.th`
  text-align: left;
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  font-size: 18px;
  background: #333;
  padding: 5px;
`
const Td = styled.td`
  text-align: left;
  font-weight: 300;
  font-size: 14px;
  background: #2a2a2a;
  padding: 5px;
`
const UserLink = styled(Link)`
  color: var(--accent-color-2);
  text-decoration: none;

  &:visited {
    color: var(--accent-color-2);
  }

  &:hover {
    color: var(--accent-color-2-lighter);
  }
`

const Users = ({ users }) => {
  return (
    <div>
      <H2>Users</H2>
      <Table>
        <thead>
          <tr>
            <Th>user</Th>
            <Th>blogs created</Th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <Td><UserLink to={`/users/${user.id}`}>{user.name}</UserLink></Td>
              <Td>{user.blogs.length}</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users