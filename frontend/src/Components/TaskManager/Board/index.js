import React, { useEffect } from "react";
import Board from "react-trello";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanes,
  createLane,
  deleteLane,
  updateLane,
  addCard,
  deleteCard,
  updateCard,
} from "../../../action/taskAction";
import "./index.css";

function BoardDetail(props) {
  const dispatch = useDispatch();
  const { getLaneList } = useSelector((state) => state.TaskReducer);

  useEffect(() => {
    dispatch(getLanes());
  }, [dispatch]);

  const dataChange = (newData) => {
    // setData(newData);
    // console.log(newData);
  };

  return (
    <div>
      {getLaneList ? (
        <Board
          canAddLanes
          className="board_body"
          data={getLaneList}
          editLaneTitle
          editable
          draggable
          onCardAdd={function noRefCheck(card, laneId) {
            dispatch(addCard(laneId, card));
          }}
          onCardDelete={function noRefCheck(cardId, laneId) {
            dispatch(deleteCard(cardId, laneId));
          }}
          onCardUpdate={function noRefCheck(laneId, data) {
            updateCard(laneId, data);
          }}
          onLaneAdd={function noRefCheck(params) {
            dispatch(createLane(params));
          }}
          onLaneUpdate={function noRefCheck(laneId, data) {
            dispatch(updateLane(laneId, data));
          }}
          onDataChange={(newData) => dataChange(newData)}
          onLaneDelete={(laneId) => dispatch(deleteLane(laneId))}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default BoardDetail;
