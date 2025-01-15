import { useState } from "react";

export const Navbar = ({ notes, setSubmittedNotes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchNote = (e) => {
    if (e.target.value === "") {
      setSubmittedNotes(notes);
    }
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const noteResult = notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSubmittedNotes(noteResult);
  };

  return (
    <nav className="flex items-center justify-between py-4 px-5 border-b border-slate-50 shadow-sm">
      <h1 className="text-4xl font-bold">Notes App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="search note"
          className="border-b-2 p-2 outline-none border-slate-50"
          value={searchTerm}
          onChange={handleSearchNote}
        />
        <button
          type="submit"
          className="text-white p-2 rounded bg-green-400 ml-3"
        >
          search
        </button>
      </form>
    </nav>
  );
};
