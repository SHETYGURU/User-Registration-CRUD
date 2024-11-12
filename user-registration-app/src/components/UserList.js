import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import Navbar from "./Navbar";
import { Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { MdOutlineDoneOutline } from "react-icons/md";
import loadingGif from "../assets/tasks.gif"; // Replace with the actual path to your GIF

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editableUser, setEditableUser] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogIcon, setDialogIcon] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDelete = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        showDialogWithMessage("User data deleted", <FaTrashAlt />);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEdit = (user) => {
    setEditableUser({ ...user });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleDobChange = (e) => {
    const updatedDob = e.target.value;
    const updatedAge = calculateAge(updatedDob);
    setEditableUser({
      ...editableUser,
      dob: updatedDob,
      age: updatedAge,
    });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/api/users/${editableUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editableUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(users.map((user) => (user.id === data.id ? data : user)));
        setEditableUser(null);
        showDialogWithMessage("User data updated", <MdOutlineDoneOutline />);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const showDialogWithMessage = (message, icon) => {
    setDialogMessage(message);
    setDialogIcon(icon);
    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 1500);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4 text-center flex items-center p-4">
          <img src={loadingGif} alt="Loading" className="w-8 h-8 mr-2" />
          User List
        </h1>
        <div className="overflow-x-auto w-full max-w-6xl mx-auto"> 
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">DOB</th>
                <th className="border p-2">Age</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">
                    {editableUser && editableUser.id === user.id ? (
                      <input
                        type="text"
                        value={editableUser.name}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
                            name: e.target.value,
                          })
                        }
                        className="w-full sm:max-w-xs p-2 border rounded" 
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="border p-2">
                    {editableUser && editableUser.id === user.id ? (
                      <input
                        type="email"
                        value={editableUser.email}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
                            email: e.target.value,
                          })
                        }
                        className="w-full sm:max-w-xs p-2 border rounded" 
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="border p-2">
                    {editableUser && editableUser.id === user.id ? (
                      <input
                        type="date"
                        value={editableUser.dob}
                        onChange={handleDobChange}
                        className="w-full sm:max-w-xs p-2 border rounded" 
                      />
                    ) : (
                      user.dob
                    )}
                  </td>
                  <td className="border p-2">
                    {editableUser && editableUser.id === user.id ? (
                      <input
                        type="text"
                        value={editableUser.age}
                        readOnly
                        className="w-full sm:max-w-xs p-2 bg-gray-100 text-gray-600 border rounded" 
                      />
                    ) : (
                      user.age
                    )}
                  </td>
                  <td className="border p-2">
                    {editableUser && editableUser.id === user.id ? (
                      <input
                        type="text"
                        value={editableUser.phone}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
                            phone: e.target.value,
                          })
                        }
                        className="w-full sm:max-w-xs p-2 border rounded" 
                      />
                    ) : (
                      user.phone
                    )}
                  </td>
                  <td className="border p-2 flex gap-2 justify-center">
                    {editableUser && editableUser.id === user.id ? (
                      <button
                        className="bg-white text-black p-2 rounded"
                        onClick={handleSave}
                      >
                        <MdOutlineDoneOutline />
                      </button>
                    ) : (
                      <>
                        <button
                          className="bg-white text-black p-2 rounded"
                          onClick={() => handleEdit(user)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="bg-white text-black p-2 rounded"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Dialog open={showDialog}>
          <DialogTitle>
            <div className="flex items-center">
              {dialogIcon}
              <span className="ml-2">{dialogMessage}</span>
            </div>
          </DialogTitle>
          <DialogContent />
        </Dialog>
      </div>
    </div>
  );
};

export default UserList;
