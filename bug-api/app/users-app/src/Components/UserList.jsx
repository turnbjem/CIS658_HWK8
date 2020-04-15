import React from 'react'
import PropTypes from 'prop-types'

function UserListItem ({ user, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr data-id={user.id} className='row'>
      <td className="col-md-3">{user.fname}</td>
      <td className="col-md-3">{user.lname}</td>
      <td className="col-md">{user.email}</td>
      <td className="col-md-2 btn-toolbar">
        <button className="btn btn-success btn-sm edit-user" onClick={event => onEditClicked(user)}>
          <i className="glyphicon glyphicon-pencil edit-button"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm cancel-edit" onClick={event => onDeleteClicked(user.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  )
}

UserListItem.propTypes = {
  user: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function UserList ({ users, onEditClicked, onDeleteClicked }) {
  const userItems = users.map((user, index) => (
    <UserListItem key={user.id} user={user} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

  return (
    <div className="user-list container-fluid">
      <table className="table table-hover">
        <thead>
          <tr className='row'>
            <th className="col-md-3">First Name</th>
            <th className="col-md-3">Last Name</th>
            <th className="col-md">Email</th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userItems}
        </tbody>
      </table>
    </div>
  )
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
