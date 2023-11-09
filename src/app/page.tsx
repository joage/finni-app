import type { Patient } from "@prisma/client";
import { headers } from "next/headers";

async function getPatients(): Promise<Patient[]> {
  // for dev purposes
  const host = headers().get("host");
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/patients`);
  const patients = await res.json();

  return patients;
}

export default async function Home() {
  const patients = await getPatients();
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <h1 className="font-bold">Patients</h1>
      <table className="w-full text-sm text-left border">
        <thead className="text-xs">
          <tr>
            <th className="border px-8 py-4">First Name</th>
            <th className="border px-8 py-4">Middle Name</th>
            <th className="border px-8 py-4">Last Name</th>
            <th className="border px-8 py-4">Addresses</th>
            <th className="border px-8 py-4">Status</th>
            <th className="border px-8 py-4">DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr className="border" key={patient.id}>
              <td className="border px-8 py-4">{patient.firstName}</td>
              <td className="border px-8 py-4">{patient.middleName}</td>
              <td className="border px-8 py-4">{patient.lastName}</td>
              <td className="border px-8 py-4">
                <ul className="list-disc">
                  {patient.addresses.map((address, index) => (
                    <li key={index}>{address}</li>
                  ))}
                </ul>
              </td>
              <td className="border px-8 py-4">{patient.status}</td>
              <td className="border px-8 py-4">
                {new Date(patient.birthDate).toISOString().substring(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
