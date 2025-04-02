import { useState } from "react";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MainWindow from "./pages/main_window";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainWindow/>}></Route>
          <Route path="/:id" element={<MainWindow/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
