// this should not be necessary but there is a known bug: https://github.com/vercel/next.js/issues/49232
"use client";

import { createPatient } from "../actions";

import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-300 hover:bg-blue-400 font-bold py-2 px-4 rounded"
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "..." : "Add Patient"}
    </button>
  );
}

export default function Page() {
  const [state, formAction] = useFormState(createPatient, initialState);
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="font-bold">Add a Patient</h1>
      <p>{"(*) Required Fields"}</p>
      <form className="flex flex-col gap-3" action={formAction}>
        <div className="flex gap-2">
          <label htmlFor="firstName">First Name*</label>
          <input
            className="border flex-grow"
            type="text"
            id="firstName"
            name="firstName"
            required
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="middleName">Middle Name</label>
          <input
            className="border flex-grow"
            type="text"
            id="middleName"
            name="middleName"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="lastName">Last Name*</label>
          <input
            className="border flex-grow"
            type="text"
            id="lastName"
            name="lastName"
            required
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="address1">Primary Address*</label>
          <input
            className="border flex-grow"
            type="text"
            id="address1"
            name="address1"
            required
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="address2">Second Address</label>
          <input
            className="border flex-grow"
            type="text"
            id="address2"
            name="address2"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="address3">Third Address</label>
          <input
            className="border flex-grow"
            type="text"
            id="address3"
            name="address3"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="birthDate">Date of Birth*</label>
          <input
            className="border flex-grow"
            type="date"
            id="birthDate"
            name="birthDate"
            required
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="status">Status*</label>
          <select
            className="p-1 text-black border"
            id="status"
            name="status"
            required
          >
            <option value="inquiry">Inquiry</option>
            <option value="onboarding">Onboarding</option>
            <option value="active">Active</option>
            <option value="churned">Churned</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label htmlFor="extendedData">
            Enter additional data as key-value pairs
          </label>
          <input
            className="p-1 border"
            type="text"
            id="extendedData"
            name="extendedData"
            placeholder='{"key": "value"}'
          />
        </div>
        <SubmitButton />
        <p aria-live="polite" className="text-gray-500" role="status">
          {state?.message}
        </p>
      </form>
    </main>
  );
}
