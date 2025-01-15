import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Navbar = ({ notes, setSubmittedNotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchNote = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setSubmittedNotes(notes);
    } else {
      const noteResult = notes.filter((note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSubmittedNotes(noteResult);
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-5 border-b border-slate-50 shadow-sm">
      <h1 className="text-4xl font-bold">Notes App</h1>
      <div>
        <input
          type="text"
          placeholder="search note"
          className="border-b-2 p-2 outline-none border-slate-50"
          value={searchTerm}
          onChange={handleSearchNote}
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
    </nav>
  );
};
