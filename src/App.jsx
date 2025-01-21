import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Notes } from "./components/Notes";
import { notes } from "./data";

const App = () => {
  const [submittedNotes, setSubmittedNotes] = useState(() => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("submittedNotes"));
      return storedNotes || notes;
    } catch (error) {
      console.error(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("submittedNotes", JSON.stringify(submittedNotes));
  }, [submittedNotes]);

  return (
    <>
      <Navbar notes={notes} setSubmittedNotes={setSubmittedNotes} />
      <Notes
        submittedNotes={submittedNotes}
        setSubmittedNotes={setSubmittedNotes}
      />
    </>
  );
  NoteColors;
};

export default App;
