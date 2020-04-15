import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import API from '../API'
import PropTypes from 'prop-types'

function ErrorMessage ({ message }) {
  return <div className='errorMessage'>{message}</div>
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default function Users () {
  const [userList, setUserList] = React.useState([])
  const [loadingMessage, setLoadingMessage] = React.useState('Loading...')
  const [errorMessage, setErrorMessage] = React.useState(null)

  const [formMode, setFormMode] = React.useState('new')

  const emptyUser = { fname: '', lname: '', email: '' }
  const [currentUser, setCurrentUser] = React.useState(emptyUser)


  React.useEffect(() => {
    API.fetchUsers().then(data => {
      setUserList(data)
      setLoadingMessage(null)
    }).catch((message) => {
      setLoadingMessage('Unable to load users because ' + message)
    })
  }, [])

  const updateUser = (field, value) => {
    const newUser = { ...currentUser}
    newUser[field] = value
    setCurrentUser(newUser)
  }

  const formSubmitted = () => {
    setErrorMessage(null)
    if (formMode === 'new') {
      API.postNewUser(currentUser).then(data => {
        console.log('Received data')
        console.log(data)
        if (data.id) {
          currentUser.id = data.id
          setCurrentUser(emptyUser)
          setUserList([...userList, currentUser])
        } else {
          console.log("New user wasn't created.")
        }
      }).catch(message => setErrorMessage(`Failed to create new user: ${message}`))
    } else {
      API.updateUser(currentUser).then(() => {
        const newUserList = [...userList]
        const userIndex = userList.findIndex((user) => user.id === currentUser.id)

        newUserList[userIndex] = currentUser
        setUserList(newUserList)
      }).catch(message => setErrorMessage(`Failed to update user: ${message}`))
    }
  }

  const editClicked = (user) => {
    setErrorMessage(null)
    setFormMode('update')
    setCurrentUser(user)
  }

  const cancelClicked = () => {
    setErrorMessage(null)
    setFormMode('new')
    setCurrentUser(emptyUser)
  }

  const deleteClicked = (id) => {
    API.deleteUser(id).then(() => {
      setUserList(userList.filter((item) => item.id !== id))
      cancelClicked()
    }).catch(message => setErrorMessage(`Failed to delete user: ${message}`))
  }

  const errorBlock = errorMessage ? <ErrorMessage message={errorMessage} /> : null

  return (
    <div className="users">
      {errorBlock}
      <UserForm formMode={formMode} user={currentUser} updateUser={updateUser}
        submitCallback={formSubmitted} cancelCallback={cancelClicked} />
      {loadingMessage
        ? <p id='loading-message'>{loadingMessage}</p>
        : <UserList users={userList} onEditClicked={editClicked} onDeleteClicked={deleteClicked} />
      }
    </div>
  )
}
