const StatusFilter = ({
  setStatusFilter,
}: {
  setStatusFilter: (status: string) => void;
}) => {
  return (
    <div className="flex gap-2">
      <p>Status:</p>
      <select
        className="p-1 text-black border-2"
        onChange={(event) => {
          setStatusFilter(event.target.value);
        }}
      >
        <option value="">All</option>
        <option value="inquiry">Inquiry</option>
        <option value="onboarding">Onboarding</option>
        <option value="active">Active</option>
        <option value="churned">Churned</option>
      </select>
    </div>
  );
};

export default StatusFilter;
