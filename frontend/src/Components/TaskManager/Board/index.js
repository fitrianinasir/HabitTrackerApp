import React, { useEffect } from "react";
import Board from "react-trello";
import { useDispatch, useSelector } from "react-redux";
import { getLanes } from "../../../action/taskAction";
import "./index.css";

function BoardDetail(props) {
  const dispatch = useDispatch();
  const { getLaneList} = useSelector(
    (state) => state.TaskReducer
  );


  useEffect(() => {
    dispatch(getLanes());
  }, [dispatch]);

 

  const dataChange = (newData) => {
    // setData(newData);
    console.log(newData);
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
          onCardUpdate={function noRefCheck() {}}
          onLaneAdd={function noRefCheck() {}}
          onLaneUpdate={function noRefCheck() {}}
          onDataChange={(newData) => dataChange(newData)}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default BoardDetail;
