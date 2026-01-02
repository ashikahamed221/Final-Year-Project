import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  technologies: string;
  link: string;
  description: string;
}

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm = ({ data, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        name: "",
        technologies: "",
        link: "",
        description: "",
      },
    ]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Projects</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addProject}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {data.map((proj, index) => (
        <div
          key={proj.id}
          className="p-4 rounded-lg bg-secondary/30 border border-border space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Project #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeProject(proj.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name *</Label>
              <Input
                placeholder="E-commerce Platform"
                value={proj.name}
                onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies</Label>
              <Input
                placeholder="React, Node.js, MongoDB"
                value={proj.technologies}
                onChange={(e) => updateProject(proj.id, "technologies", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Project Link</Label>
              <Input
                placeholder="https://github.com/username/project"
                value={proj.link}
                onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                className="bg-secondary/50 border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe the project, your role, and key achievements..."
              value={proj.description}
              onChange={(e) => updateProject(proj.id, "description", e.target.value)}
              className="bg-secondary/50 border-border min-h-[100px]"
            />
          </div>
        </div>
      ))}

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No projects added yet. Click "Add" to get started.
        </p>
      )}
    </div>
  );
};

export default ProjectsForm;
