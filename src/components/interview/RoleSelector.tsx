import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const roles = [
  { value: "frontend", label: "Frontend Developer" },
  { value: "backend", label: "Backend Developer" },
  { value: "fullstack", label: "Full Stack Developer" },
  { value: "data-scientist", label: "Data Scientist" },
  { value: "devops", label: "DevOps Engineer" },
  { value: "product-manager", label: "Product Manager" },
  { value: "ui-ux", label: "UI/UX Designer" },
  { value: "mobile", label: "Mobile Developer" },
];

const RoleSelector = ({ value, onChange, disabled }: RoleSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full sm:w-[220px] bg-secondary/50 border-border">
        <SelectValue placeholder="Select interview role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default RoleSelector;
