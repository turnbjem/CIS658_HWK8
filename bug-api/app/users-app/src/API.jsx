const apiURL = 'http://localhost:3000'
//const apiURL = 'https://railsapi-kurmasz.codeanyapp.com'

export default class API {
  static fetchUsers () {
    console.log("In fetch Users");
    return fetch(`${apiURL}/users`)
      .then(response => {

        console.log('Response from /users ')
        console.log(response)

        if (response.ok) {
          return response.json()
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      })
      .then(data => {
        console.log('JSON data from /users')
        console.log(data)
        return data
      })
  } // end fetchUsers

  static postNewUser (user) {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(user)
    }
    console.log('Attempting to post new user')
    console.log(user)
    return fetch(`${apiURL}/users`, options).then(async response => {
      console.log('The POST response.')
      console.log(response)
      if (response.ok) {
        return response.json()
      } else if (response.status === 422) {
        const data = await response.json()
        console.log('Validation message: ')
        console.log(data)
        throw new Error(`Server validation failed: ${data.message}`)
      } else {
        throw new Error(`Got a ${response.status} status.`)
      }
    })
  }

  static updateUser (user) {
    const options = {

      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(user)
    }
    console.log('Attempting to update user')
    console.log(user)
    return fetch(`${apiURL}/users/${user.id}`, options).then(
      async response => {
        console.log('The PUT response.')
        console.log(response)
        if (response.ok && response.status === 204) {
          return true
        } else if (response.status === 422) {
          const data = await response.json()
          console.log('Validation message: ')
          console.log(data)
          throw new Error(`Server validation failed: ${data.message}`)
        } else {
          throw new Error(`Got a ${response.status} status.`)
        }
      }
    )
  } // end updateUser

  static deleteUser (id) {
    const options = {
      method: 'DELETE'
    }
    console.log('Attempting to delete user with id ' + id)
    return fetch(`${apiURL}/users/${id}`, options).then(async response => {
      console.log('The DELETE response.')
      console.log(response)
      if (response.ok && response.status === 204) {
        return true
      } else {
        throw new Error(`Got a ${response.status} status`)
      }
    })
  } // end deleteUser
} // end class API
