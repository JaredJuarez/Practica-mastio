import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Project1 from "./pages/project1/Project1"; // Crea este componente
import Project2 from "./pages/project2/Project2"; // Crea este componente
// import Project3 from "./pages/Project3"; // Crea este componente

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Project1 />} />
          <Route path="/project2" element={<Project2 />} />
          {/* <Route path="/project3" component={Project3} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
