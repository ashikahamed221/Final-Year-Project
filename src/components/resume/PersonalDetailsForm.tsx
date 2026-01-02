import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
}

const PersonalDetailsForm = ({ data, onChange }: PersonalDetailsFormProps) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="New York, NY"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johndoe"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input
            id="portfolio"
            placeholder="johndoe.com"
            value={data.portfolio}
            onChange={(e) => handleChange("portfolio", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
