import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ManageUsers from './Components/ManageUsers'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

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
