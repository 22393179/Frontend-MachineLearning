import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Form from "./pages/Form";
import Predictions from "./pages/predictions";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/form" element={<Form/>}/>
          <Route path="/predictions" element={<Predictions/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;