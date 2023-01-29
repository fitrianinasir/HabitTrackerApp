import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers";
import Login from "./Components/Login/Login"
import Register from "./Components/Login/Register";
import Dashboard from "./Components/Dashboard/Dashboard"
import Boards from "./Components/TaskManager/Boards"
import Board from './Components/TaskManager/Board'
import TestDraggable from './Components/TaskManager/Boards/testing'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/boards" element={<Boards/>} />
            <Route exact path="/board/:id" element={<Board/>} />
            <Route exact path="/test" element={<TestDraggable/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

