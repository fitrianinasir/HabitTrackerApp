import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  reorderBoard,
  deleteBoard
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

function BoardsDragDrop(props) {
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
    const [removed] = getBoardsList.splice(startIndex, 1);
    getBoardsList.splice(endIndex, 0, removed);
    console.log(getBoardsList); 
    dispatch(reorderBoard(getBoardsList));
  };

  const onDragEnd = (result) => {
    console.log(result);
    reorder(result.source.index, result.destination.index);
  };

  const deleteCard = (id) => {
    dispatch(deleteBoard(id))
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
        <DragDropContext  onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                  {getBoardsList.map((data, index) => (
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
                            <Card sx={{ height: "8rem", width:"15rem" }}>
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
                                        cursor:'pointer'
                                      }}
                                      color="text.secondary"
                                      gutterBottom
                                    >
                                      {data.title}
                                    </Typography>
                                  </Link>
                                  <Clear
                                    onClick={() => deleteCard(data._id)}
                                    sx={{ color: "black", fontSize: "10px", cursor:'pointer' }}
                                  />
                                </Box>
                                <Typography variant="body2">
                                  {data.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                      
                  ))}
                  
                  {provided.placeholder}
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

export default BoardsDragDrop;
