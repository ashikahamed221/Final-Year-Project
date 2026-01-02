import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm = ({ data, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Experience</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExperience}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {data.map((exp, index) => (
        <div
          key={exp.id}
          className="p-4 rounded-lg bg-secondary/30 border border-border space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Experience #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Job Title *</Label>
              <Input
                placeholder="Software Engineer"
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Company *</Label>
              <Input
                placeholder="Tech Company Inc."
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="San Francisco, CA"
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  placeholder="Jan 2022"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  placeholder="Present"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                  className="bg-secondary/50 border-border"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              className="bg-secondary/50 border-border min-h-[100px]"
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No experience added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
};

export default ExperienceForm;
