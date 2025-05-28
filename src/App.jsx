import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Project1 from "./pages/project1/Project1";
import Project2 from "./pages/project2/Project2";
import Project3 from "./pages/project3/Project3";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Project1 />} />
          <Route path="/project2" element={<Project2 />} />
          <Route path="/project3" element={<Project3 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
