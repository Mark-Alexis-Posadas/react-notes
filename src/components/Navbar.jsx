import React from "react";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-5 border-b border-slate-50 shadow-sm">
      <h1 className="text-4xl font-bold">Notes App</h1>
      <form>
        <input
          type="text"
          placeholder="search note"
          className="border-b-2 p-2 outline-none border-slate-50"
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
