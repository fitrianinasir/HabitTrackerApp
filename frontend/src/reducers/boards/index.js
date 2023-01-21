import{
  BOARDS
} from "../../action/boardAction"


const initialState = {
  getBoardsList:false
}

const boards = (state = initialState, action) => {
  switch(action.type){
    case BOARDS:
      return{
        ...state,
        getBoardsList: action.payload.data
      }
    default:
      return state
  }
}

export default boards