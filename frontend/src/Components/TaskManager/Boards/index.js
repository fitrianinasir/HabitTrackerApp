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
import { getBoards, createBoard, reorderBoard } from "../../../action/boardAction";

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

const getListStyle = (isDraggingOver, isEmpty) => ({
  display: "flex",
  padding: 5,
  overflow: "auto",
  minHeight: isEmpty ? "45px" : "NaN",
});

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,
  width: "100%",
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

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


  // function to reorder the items
  const reorder = (startIndex, endIndex) => {
    const [removed] = getBoardsList.splice(startIndex,1)
    getBoardsList.splice(endIndex,0,removed)
    console.log(getBoardsList)
    dispatch(reorderBoard(getBoardsList))
  }

  const onDragEnd = (result) => {
    console.log(result)
    reorder(result.source.index, result.destination.index)
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                  <Grid container spacing={2}>
                {getBoardsList.map((data, index) => (
                  <Grid item xs={3}>
                    <Draggable
                      key={data._id}
                      draggableId={data._id}
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
                          <Link to={`/board/id?${data._id}`} className="text-decoration-none">
                            <Card sx={{ height: "8rem" }}>
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
                        </div>
                      )}
                    </Draggable>
                  </Grid>
                ))}
                {provided.placeholder}
                </Grid>
              </div>
            
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        ""
      )}
    </>
  );
}

export default Boards;
