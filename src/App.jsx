import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Notes } from "./components/Notes";
import { notes } from "./data";

const App = () => {
  const [submittedNotes, setSubmittedNotes] = useState(notes);

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
