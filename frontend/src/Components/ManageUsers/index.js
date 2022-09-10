import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Users(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone_number: "",
  })

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      await axios
        .delete(`http://localhost:5000/user/${id}`)
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success").then((move) => navigate(0))
          }
        })
        .catch((err) => console.log(err));
    })
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/user", userData)
      .then((res) => {
        Swal.fire(
          'Success!',
          'Data submitted sucessfully',
          'success'
        ).then((move) => navigate(0))
      })
      .catch((err) => console.log(err));
  };

  const submitEditForm = async(e) => {
    e.preventDefault()
    await axios.put(`http://localhost:5000/user/${editData._id}`, editData).then(res => {
      Swal.fire(
        'Success!',
        'Data updated sucessfully',
        'success'
      ).then((move) => navigate(0))
    }).catch(err => console.log(err))
  }
  return (
    <div className="container">
      <h4 className="text-danger">Manage Users</h4>
      <button
        className="btn btn-primary float-end mb-2 fontSize-10"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
      >
        Add
      </button>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <td>No</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning fontSize-10"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => setEditData(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ms-1 fontSize-10"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* CREATE NEW MODAL */}
      <div
        className="modal fade"
        id="createModal"
        tabIndex="-1"
        aria-labelledby="createNewLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createNewLabel">
                Add Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name..."
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setUserData({ ...userData, phone_number: e.target.value })
                    }
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submitForm}
              >
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Form
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={editData.name}
                  onChange={(e) => setEditData({...editData, name:e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email:e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone_number"
                  value={editData.phone_number}
                  onChange={(e) => setEditData({...editData, phone_number:e.target.value})}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={submitEditForm}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
