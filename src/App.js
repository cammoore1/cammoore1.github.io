import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Grid from "./components/Grid";
import AboutMe from "./components/AboutMe";
import SpaceOffice from "./components/SpaceOffice";
import FordFulkerson from "./components/FordFulkerson";
import VRLocomotion from "./components/VRLocomotion";
import PhenomenalThings from "./components/PhenomenalThings";
import BookChain from "./components/BookChain";
import Resume from "./components/Resume";
import TransparentCollage from "./components/TransparentCollage";

function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inter|Source+Code+Pro"
      ></link>
      <div className="center-content-container">
        <div className="center-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<AboutMe />} />
            <Route path="projects" element={<Grid />} />
            <Route path="projects/space-office" element={<SpaceOffice />} />
            <Route path="projects/ford-fulkerson" element={<FordFulkerson />} />
            <Route path="projects/vr-locomotion" element={<VRLocomotion />} />
            <Route
              path="projects/phenomenal-things"
              element={<PhenomenalThings />}
            />
            <Route path="projects/bookchain" element={<BookChain />} />
            <Route path="projects/resume" element={<Resume />} />
            <Route path="projects/transparent-collage" element={<TransparentCollage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
