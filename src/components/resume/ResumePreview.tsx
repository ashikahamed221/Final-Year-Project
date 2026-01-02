import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import type { Education } from "./EducationForm";
import type { Experience } from "./ExperienceForm";
import type { Project } from "./ProjectsForm";

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

interface Skills {
  technical: string;
  soft: string;
  languages: string;
  certifications: string;
}

interface ResumePreviewProps {
  personalDetails: PersonalDetails;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skills;
  summary: string;
}

const ResumePreview = ({
  personalDetails,
  education,
  experience,
  projects,
  skills,
  summary,
}: ResumePreviewProps) => {
  return (
    <div
      id="resume-preview"
      className="bg-white text-gray-900 p-8 rounded-lg shadow-lg max-w-[800px] mx-auto"
      style={{ fontFamily: "'Georgia', serif" }}
    >
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalDetails.fullName || "Your Name"}
        </h1>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {personalDetails.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personalDetails.email}
            </span>
          )}
          {personalDetails.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personalDetails.phone}
            </span>
          )}
          {personalDetails.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personalDetails.location}
            </span>
          )}
          {personalDetails.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {personalDetails.linkedin}
            </span>
          )}
          {personalDetails.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {personalDetails.portfolio}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            EXPERIENCE
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <p className="text-sm text-gray-600">
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            EDUCATION
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">
                    {edu.institution}
                    {edu.location && ` • ${edu.location}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {edu.startDate} - {edu.endDate || "Present"}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            PROJECTS
          </h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900">{proj.name}</h3>
                {proj.link && (
                  <span className="text-sm text-blue-600">{proj.link}</span>
                )}
              </div>
              {proj.technologies && (
                <p className="text-sm text-gray-500 italic">
                  {proj.technologies}
                </p>
              )}
              {proj.description && (
                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {(skills.technical || skills.soft || skills.languages || skills.certifications) && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            SKILLS
          </h2>
          <div className="space-y-2 text-sm">
            {skills.technical && (
              <p>
                <span className="font-semibold">Technical:</span>{" "}
                {skills.technical}
              </p>
            )}
            {skills.soft && (
              <p>
                <span className="font-semibold">Soft Skills:</span>{" "}
                {skills.soft}
              </p>
            )}
            {skills.languages && (
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {skills.languages}
              </p>
            )}
            {skills.certifications && (
              <p>
                <span className="font-semibold">Certifications:</span>{" "}
                {skills.certifications}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
