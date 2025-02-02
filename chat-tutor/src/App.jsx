import { useState } from "react";
import "./App.css";
import ChatInterface from "./Components/ChatInterface";
import PythonTutor from "./Components/PythonTutor";
import PythonLessonsUI from "./Components/PythonLessonsUI";
import KidsQuizUI from "./Components/KidsQuizUI";
import HomeworkEditor from "./Components/HomeworkEditor";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PythonTutor /> ,
                <PythonLessonsUI />,
                <KidsQuizUI />
                <Footer />
              </>
            }
          />
          <Route path="/chatAI" element={<ChatInterface />} />
          <Route path="/codeEditor" element={<HomeworkEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
