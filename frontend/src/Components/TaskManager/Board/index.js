import React, { useEffect, useState } from "react";
import Board from "react-trello";
import "./index.css";

function BoardDetail(props) {
  const [data, setData] = useState({
    lanes: [
      {
        cards: [
          {
            description: "2 Gallons of milk at the Deli store",
            id: "Card1",
            label: "2017-12-01",
            laneId: "SORTED_LANE",
            metadata: {
              completedAt: "2017-12-01T10:00:00Z",
              shortCode: "abc",
            },
            title: "Buy milk",
          },
          {
            description: "Sort out recyclable and waste as needed",
            id: "Card2",
            label: "2017-11-01",
            laneId: "SORTED_LANE",
            metadata: {
              completedAt: "2017-11-01T10:00:00Z",
              shortCode: "aaa",
            },
            title: "Dispose Garbage",
          },
          {
            description: "Can AI make memes?",
            id: "Card3",
            label: "2017-10-01",
            laneId: "SORTED_LANE",
            metadata: {
              completedAt: "2017-10-01T10:00:00Z",
              shortCode: "fa1",
            },
            title: "Write Blog",
          },
          {
            description: "Transfer to bank account",
            id: "Card4",
            label: "2017-09-01",
            laneId: "SORTED_LANE",
            metadata: {
              completedAt: "2017-09-01T10:00:00Z",
              shortCode: "ga2",
            },
            title: "Pay Rent",
          },
        ],
        currentPage: 1,
        id: "SORTED_LANE",
        label: "20/70",
        title: "Sorted Lane",
      },
    ],
  });

  useEffect(() => {
  }, [data]);

  const dataChange = (newData) => {
    setData(newData)
    console.log(newData)
  };

  return (
    <div>
      <Board
        canAddLanes
        className="board_body"
        data={data}
        editLaneTitle
        editable
        onCardUpdate={function noRefCheck() {}}
        onLaneAdd={function noRefCheck() {}}
        onLaneUpdate={function noRefCheck() {}}
        onDataChange={(newData) => dataChange(newData)}
      />
    </div>
  );
}

export default BoardDetail;
