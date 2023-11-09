import type { Patient } from "@prisma/client";

const PatientList = ({ patients }: { patients: Patient[] }) => (
  <table className="w-full text-sm text-left border-black">
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
);

export default PatientList;
