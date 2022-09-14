import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from 'react-redux';
import { getListUser, register, updateUser, deleteUser, massDeleteUser } from "../../action/userAction";

const ManageUsers = () => {
  const dispatch = useDispatch()
  const {
    getUserList
  } = useSelector((state) => state.UserReducer)

  const [createModalOpen, setCreateModalOpen] = useState(false);
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
    dispatch(getListUser())
  }, [dispatch, rowSelection]);

  const handleCreateNewRow = async (values) => {
    dispatch(register(values))
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    dispatch(updateUser(row.original._id,  {...values, password: row.original.password}))
    exitEditingMode()
  };

  const handleMassDelete = () => {
    const IDs = Object.keys(rowSelection)
    dispatch(massDeleteUser(IDs))
  }

  const handleDeleteRow = (row) => {
    dispatch(deleteUser(row.original._id))
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={getUserList}
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
