import { useState, useEffect } from "react";

const BirthDateFilter = ({
  setBirthDateFilter,
}: {
  setBirthDateFilter: (birthDate: string) => void;
}) => {
  const [compare, setCompare] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (compare && date) {
      setBirthDateFilter(`${compare}${date}`);
    } else {
      setBirthDateFilter("");
    }
  }, [compare, date, setBirthDateFilter]);
  return (
    <div className="flex gap-2">
      <p>Date of Birth:</p>
      <select
        className="p-1 text-black border-2"
        onChange={(event) => {
          setCompare(event.target.value);
        }}
      >
        <option />
        <option value="=">{"="}</option>
        <option value="<">{"<"}</option>
        <option value=">">{">"}</option>
      </select>
      <input
        className="border-2"
        type="date"
        onChange={(event) => {
          setDate(event.target.value);
        }}
      />
    </div>
  );
};

export default BirthDateFilter;
