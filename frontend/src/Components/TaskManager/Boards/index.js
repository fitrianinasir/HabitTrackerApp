import React, { useEffect, useState } from "react";
import { Clear } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import { Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getBoards,
  createBoard,
  // reorderBoard,
  deleteBoard,
} from "../../../action/boardAction";

const style = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid white",
  boxShadow: 24,
  p: 4,
};

const textFieldStyle = {
  display: "block",
  marginBottom: "1rem",
  width: "100%",
};

function Boards(props) {
  const [modal, setModal] = useState(false);

  const [modalData, setModalData] = useState({ title: "", description: "" });
  const dispatch = useDispatch();
  const { getBoardsList } = useSelector((state) => state.BoardReducer);

  useEffect(() => {
    dispatch(getBoards());
    // window.oncontextmenu = (e) => {
    //   e.preventDefault()
    //   console.log('right clicked')
    // }
  }, [dispatch]);

  const submitBoard = () => {
    setModal(false);
    dispatch(createBoard(modalData));
  };



  const deleteCard = (id) => {
    dispatch(deleteBoard(id));
  };

  return (
    <>
      <Stack direction="row" sx={style}>
        <h2>WORKSPACES</h2>
        <Button
          sx={{ width: "10rem", fontSize: "14px" }}
          variant="outlined"
          onClick={() => setModal(true)}
        >
          Add New
        </Button>
      </Stack>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Title"
            sx={textFieldStyle}
            onChange={(e) =>
              setModalData({ ...modalData, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Description"
            sx={textFieldStyle}
            onChange={(e) =>
              setModalData({ ...modalData, description: e.target.value })
            }
          />
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            onClick={() => submitBoard()}
          >
            SUBMIT
          </Button>
        </Box>
      </Modal>

      {getBoardsList ? (
        <Grid container spacing={4}>
          {getBoardsList.map((data, index) => (
            <Grid item>
              <Card sx={{ height: "8rem", width: "15rem" }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      justifyItems: "center",
                    }}
                  >
                    <Link
                      to={`/board/id?${data._id}`}
                      className="text-decoration-none"
                    >
                      <Typography
                        sx={{
                          fontSize: 14,
                          display: "block",
                          justifyItems: "center",
                          cursor: "pointer",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {data.title}
                      </Typography>
                    </Link>
                    <Clear
                      onClick={() => deleteCard(data._id)}
                      sx={{
                        color: "black",
                        fontSize: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </Box>
                  <Typography variant="body2">{data.description}</Typography>
                </CardContent>
              </Card>
              
            </Grid>
          ))}
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default Boards;
