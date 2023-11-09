"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Patient } from "@prisma/client";

import PatientList from "./_components/patientList";
import BirthDateFilter from "./_components/birthDateFilter";
import StatusFilter from "./_components/statusFilter";
import KeywordSearch from "./_components/keywordSearch";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [birthDateFilter, setBirthDateFilter] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "api/patients?" +
        new URLSearchParams({
          keyword,
          statusFilter,
          birthDateFilter,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);
        setIsLoading(false);
      });
  }, [keyword, statusFilter, birthDateFilter]);

  return (
    <main className="flex min-h-screen flex-col p-24 gap-4">
      <Link
        className="mr-auto rounded-md font-bold bg-blue-300 hover:bg-blue-400 p-3"
        href="/create"
      >
        + Add New
      </Link>
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-col gap-2">
          <KeywordSearch setKeyword={setKeyword} />
        </div>
        <h1 className="font-bold text-xl">Patients</h1>
        <div className="flex flex-col gap-2">
          <StatusFilter setStatusFilter={setStatusFilter} />
          <BirthDateFilter setBirthDateFilter={setBirthDateFilter} />
        </div>
      </div>

      {isLoading ? "Loading patients..." : <PatientList patients={patients} />}
    </main>
  );
}
