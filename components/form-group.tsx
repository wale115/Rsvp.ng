export function FormGroup({ children }: { children: React.ReactNode }) {
  return <div className="ios-group">{children}</div>;
}

export function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ios-row">
      <label>{label}</label>
      {children}
    </div>
  );
}
