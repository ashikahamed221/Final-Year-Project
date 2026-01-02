import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Skills {
  technical: string;
  soft: string;
  languages: string;
  certifications: string;
}

interface SkillsFormProps {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
  const handleChange = (field: keyof Skills, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technical">Technical Skills</Label>
          <Textarea
            id="technical"
            placeholder="JavaScript, React, Node.js, Python, SQL, AWS..."
            value={data.technical}
            onChange={(e) => handleChange("technical", e.target.value)}
            className="bg-secondary/50 border-border min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="soft">Soft Skills</Label>
          <Textarea
            id="soft"
            placeholder="Leadership, Communication, Problem-solving..."
            value={data.soft}
            onChange={(e) => handleChange("soft", e.target.value)}
            className="bg-secondary/50 border-border min-h-[80px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="languages">Languages</Label>
          <Input
            id="languages"
            placeholder="English (Native), Spanish (Fluent)"
            value={data.languages}
            onChange={(e) => handleChange("languages", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="certifications">Certifications</Label>
          <Input
            id="certifications"
            placeholder="AWS Certified, Google Cloud Professional..."
            value={data.certifications}
            onChange={(e) => handleChange("certifications", e.target.value)}
            className="bg-secondary/50 border-border"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
