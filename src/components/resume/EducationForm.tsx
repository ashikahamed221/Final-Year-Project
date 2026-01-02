import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {data.map((edu, index) => (
        <div
          key={edu.id}
          className="p-4 rounded-lg bg-secondary/30 border border-border space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Education #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Input
                placeholder="Bachelor of Science in Computer Science"
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Institution *</Label>
              <Input
                placeholder="University of Technology"
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Boston, MA"
                value={edu.location}
                onChange={(e) => updateEducation(edu.id, "location", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>GPA</Label>
              <Input
                placeholder="3.8/4.0"
                value={edu.gpa}
                onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                placeholder="Sep 2018"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                placeholder="May 2022"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No education added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
};

export default EducationForm;
