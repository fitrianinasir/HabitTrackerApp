import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers";
import Login from "./Components/Login"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

