import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

import type { Education } from "./EducationForm";
import type { Experience } from "./ExperienceForm";
import type { Project } from "./ProjectsForm";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
    lineHeight: 1.4,
  },

  /* ============ Header ============ */
  header: {
    marginBottom: 10,
    alignItems: "center",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  contactWrapper: {
    marginTop: 2,
    alignItems: "center",
    gap: 3,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    fontSize: 9,
    color: "#333",
    gap: 14,
  },
  contactItem: {
    fontSize: 9,
    color: "#333",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },

  divider: {
    marginTop: 12,
    marginBottom: 12,
    height: 1,
    backgroundColor: "#d4d4d4",
  },

  /* ============ Sections ============ */
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  paragraph: {
    color: "#222",
    fontSize: 10,
  },

  /* ============ Entries ============ */
  entry: {
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
  },
  subLine: {
    fontSize: 9.5,
    color: "#444",
    marginTop: 2,
  },

  bullet: {
    marginLeft: 10,
    marginTop: 3,
  },
  bulletText: {
    fontSize: 9.5,
    color: "#222",
    marginBottom: 2,
  },

  label: {
    fontWeight: "bold",
    color: "#111",
  },
});

/* ===== Types ===== */
interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
}

interface Skills {
  technical: string;
  soft: string;
  tools: string;
}

interface ResumePDFProps {
  personalDetails: PersonalDetails;
  summary: string;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  skills: Skills;
}

/* ===== Helpers ===== */
const BulletList = ({ items }: { items: string[] }) => {
  if (!items?.length) return null;

  return (
    <View style={styles.bullet}>
      {items.map((it, idx) => (
        <Text key={idx} style={styles.bulletText}>
          • {it}
        </Text>
      ))}
    </View>
  );
};

/* ===== Main PDF Component ===== */
const ResumePDF = ({
  personalDetails,
  summary,
  projects,
  experience,
  education,
  skills,
}: ResumePDFProps) => {
  const safeName = personalDetails.fullName || "YOUR NAME";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <Text style={styles.fullName}>{safeName}</Text>

          <View style={styles.contactWrapper}>
            {/* Row 1: Email → Phone → Chennai → Linkedin */}
            <View style={styles.contactRow}>
              {personalDetails.email && (
                <Text style={styles.contactItem}>✉ {personalDetails.email}</Text>
              )}

              {personalDetails.phone && (
                <Text style={styles.contactItem}>📞{personalDetails.phone}</Text>
              )}

              {personalDetails.location && (
                <Text style={styles.contactItem}>📍 {personalDetails.location}</Text>
              )}

              {personalDetails.linkedin && (
                <Link style={[styles.contactItem, styles.link]} src={personalDetails.linkedin}>
                  in {personalDetails.linkedin}
                </Link>
              )}
            </View>

            {/* Row 2: Website / Portfolio */}
            {personalDetails.portfolio && (
              <View style={styles.contactRow}>
                <Link style={[styles.contactItem, styles.link]} src={personalDetails.portfolio}>
                  🌐 {personalDetails.portfolio}
                </Link>
              </View>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {/* ================= PROFILE SUMMARY ================= */}
        {summary?.trim() && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROFILE SUMMARY</Text>
            <Text style={styles.paragraph}>{summary}</Text>
          </View>
        )}

        {/* ================= PROJECT ================= */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project</Text>

            {projects.map((proj) => {
              const bullets =
                proj.description?.split("\n").filter(Boolean) ?? [];

              return (
                <View key={proj.id} style={styles.entry}>
                  <Text style={styles.entryTitle}>{proj.name}</Text>

                  {proj.technologies && (
                    <Text style={styles.subLine}>{proj.technologies}</Text>
                  )}

                  <BulletList items={bullets} />

                  {proj.link && (
                    <Text style={styles.subLine}>
                      <Text style={styles.label}>Github: </Text>
                      <Link style={styles.link} src={proj.link}>
                        {proj.link}
                      </Link>
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* ================= WORK EXPERIENCE ================= */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>

            {experience.map((exp) => {
              const bullets =
                exp.description?.split("\n").filter(Boolean) ?? [];

              return (
                <View key={exp.id} style={styles.entry}>
                  <Text style={styles.entryTitle}>
                    {exp.title}
                    {exp.startDate && (
                      <Text style={{ fontWeight: "normal" }}>
                        {" "}
                        Duration: {exp.startDate} - {exp.endDate || "Present"}
                      </Text>
                    )}
                  </Text>

                  <Text style={styles.subLine}>
                    {exp.company}
                    {exp.location ? ` – ${exp.location}` : ""}
                  </Text>

                  <BulletList items={bullets} />
                </View>
              );
            })}
          </View>
        )}

        {/* ================= EDUCATION ================= */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>

            {education.map((edu) => (
              <View key={edu.id} style={styles.entry}>
                <Text style={styles.subLine}>
                  {edu.startDate} - {edu.endDate || "Present"}{" "}
                  <Text style={styles.entryTitle}>{edu.degree}</Text>
                </Text>

                <Text style={styles.subLine}>
                  {edu.institution}
                  {edu.location ? ` | ${edu.location}` : ""}
                  {edu.gpa ? ` | GPA: ${edu.gpa}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ================= SKILLS ================= */}
        {(skills?.technical || skills?.soft || skills?.tools) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            {skills.technical && (
              <Text style={styles.subLine}>
                <Text style={styles.label}>Technical Skills : </Text>
                {skills.technical}
              </Text>
            )}

            {skills.soft && (
              <Text style={styles.subLine}>
                <Text style={styles.label}>Soft Skills : </Text>
                {skills.soft}
              </Text>
            )}

            {skills.tools && (
              <Text style={styles.subLine}>
                <Text style={styles.label}>Tools : </Text>
                {skills.tools}
              </Text>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
