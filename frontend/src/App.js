import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import ManageUsers from './Components/ManageUsers'
import ManageUsers from "./Components/ManageUsers/index2";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route exact path="/users" element={<ManageUsers/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
