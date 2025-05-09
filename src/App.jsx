import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project1 from "./pages/project1/Project1";

const App = () => {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<Project1 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
