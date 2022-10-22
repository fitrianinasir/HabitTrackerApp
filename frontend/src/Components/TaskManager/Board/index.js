import React, { useEffect } from "react";
import Board from "react-trello";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanes,
  createLane,
  deleteLane,
  updateLane,
  dragLane,
  addCard,
  deleteCard,
  updateCard,
  dragCard,
} from "../../../action/taskAction";
import "./index.css";

function BoardDetail(props) {
  const dispatch = useDispatch();
  const { getLaneList } = useSelector((state) => state.TaskReducer);
  // const [laneData, setLaneData] = useState(getLanes)
  useEffect(() => {
    dispatch(getLanes());
  }, [dispatch]);

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
          // onDataChange={(newData) => setLaneData(newData)}
          handleLaneDragEnd={(removedIndex, addedIndex) =>
            dragLane({ removedIndex, addedIndex })
          }
          handleDragEnd={(cardId, sourceLaneId, targetLaneId, position) => {
            dragCard({
              cardId: cardId,
              sourceLaneId: sourceLaneId,
              targetLaneId: targetLaneId,
              position: position,
            });
          }}
          onLaneDelete={(laneId) => dispatch(deleteLane(laneId))}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default BoardDetail;
