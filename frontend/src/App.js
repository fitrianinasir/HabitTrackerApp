import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers";
import Login from "./Components/Login/Login"
import Register from "./Components/Login/Register";
import Dashboard from "./Components/Dashboard";
import Boards from "./Components/TaskManager/Boards"
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/boards" element={<Boards/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

