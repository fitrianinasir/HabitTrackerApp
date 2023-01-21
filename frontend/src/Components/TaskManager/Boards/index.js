import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Stack } from "@mui/system";
import { Button, Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBoards, createBoard } from "../../../action/boardAction";

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
  }, [dispatch]);

  const submitBoard = () => {
    setModal(false);
    dispatch(createBoard(modalData));
  };

  // fake data generator
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: grid,
    overflow: "auto",
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px 0 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const onDragEnd = (result) => {
    console.log("onDragEnd: ", result);
    if (!result.destination) {
      return;
    }
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
      <Box sx={{ flexGrow: 1 }}>
        <h1>CALLED</h1>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => {
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {getBoardsList
                  ? getBoardsList.map((data, index) => {
                      return (
                        <Draggable
                          key={data._id}
                          draggable={data._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {data.title}
                            </div>
                          )}
                        </Draggable>
                      );
                    })
                  : ""}
                {/* {provided.placeholder} */}
              </div>;
            }}
          </Droppable>
        </DragDropContext>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {getBoardsList
            ? getBoardsList.map((data) => {
                return (
                  <Grid item xs={3}>
                    <Link to="/board" className="text-decoration-none">
                      <Card sx={{ minHeight: 100 }}>
                        <CardContent>
                          <Typography
                            sx={{ fontSize: 14 }}
                            color="text.secondary"
                            gutterBottom
                          >
                            {data.title}
                          </Typography>
                          <Typography variant="body2">
                            {data.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            : ""}
        </Grid>
      </Box>
    </>
  );
}

export default Boards;
