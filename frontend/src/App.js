import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers";
import Login from "./Components/Login/Login"
import Register from "./Components/Login/Register";
import Dashboard from "./Components/Page/Dashboard";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

