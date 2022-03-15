import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewGame from "../components/formulario/NewGame";
import Home from "../components/Home";
import { Inicio } from "../components/Inicio";
import Carddetailes from "../components/videojuegos/Carddetailes";

export const Approuter = () => {
  return (
    <Router>
      <Routes>    
        <Route path="/" element={<Inicio />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/create" element={<NewGame />} />
        <Route exact path="/home/:id" element={<Carddetailes/>} />
      </Routes>
    </Router>
  );
};
