import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Form from "./pages/Form";
//import Predictions from "./pages/predictions";
import { FormUser } from "./pages/FormUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form/>}/>
          {/* <Route path="/predictions" element={<Predictions/>}/> */}
          <Route path="/userPrediction" element={<FormUser/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;