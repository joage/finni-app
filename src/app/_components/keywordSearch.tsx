import { useState } from "react";

const KeywordSearch = ({
  setKeyword,
}: {
  setKeyword: (status: string) => void;
}) => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="flex gap-2">
      <input
        className="border-2"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      ></input>
      <button
        className="bg-gray-300 p-1 rounded-md text-sm font-bold hover:bg-gray-400"
        onClick={() => setKeyword(searchInput)}
      >
        Search
      </button>
    </div>
  );
};

export default KeywordSearch;
