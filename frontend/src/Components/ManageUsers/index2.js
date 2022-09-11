import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const columns = [
    {
      accessorKey: "name",
      header: "First Name",
      size: 140,
    },
    {
      accessorKey: "email",
      header: "Email",
    }
  ];

  useEffect(() => {
    getUsers();
  }, [rowSelection]);

  const getUsers = async () => {
    await axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setTableData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNewRow = async (values) => {
    await axios
      .post("http://localhost:5000/register", values)
      .then((res) => {
        Swal.fire("Success!", "Data submitted sucessfully", "success").then(
          (move) => getUsers()
        );
      })
      .catch((err) => console.log(err));
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    await axios
      .put(`http://localhost:5000/user/${row.original._id}`, values)
      .then((res) => {
        exitEditingMode();
        Swal.fire("Success!", "Data updated sucessfully", "success").then(
          (move) => getUsers()
        );
      })
      .catch((err) => console.log(err));
  };

  const handleMassDelete = () => {
    const IDs = Object.keys(rowSelection)
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
        .post('http://localhost:5000/delete-users', IDs)
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your data has been deleted.",
              "success"
            ).then((move) => getUsers());
          }
        })
        .catch((err) => console.log(err));
    });
  }

  const handleDeleteRow = (row) => {
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
        .delete(`http://localhost:5000/user/${row.original._id}`)
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then((move) => getUsers());
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        // enableEditing
        enableRowSelection
        getRowId={(row) => row._id} //give each row a more useful id
        onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        state={{ rowSelection }} //pass our managed row selection state to the table to use
        onEditingRowSave={handleSaveRowEdits}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem", flexWrap: "nowrap" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <div>
            <Tooltip arrow placement="top" title="Delete All">
              <IconButton color="error" onClick={() => handleMassDelete()}>
                <Delete />
              </IconButton>
            </Tooltip>
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Account
            </Button>
            
          </div>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
            <TextField
                key="password"
                label="Password"
                name="password"
                type="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageUsers;
