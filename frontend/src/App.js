import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers";
import Login from "./Components/Login/Login"
import Register from "./Components/Login/Register";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

