import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import SkillBar from "../components/skillbar";
import styles from "./about.module.css";

interface Education {
  degree: string;
  school: string;
  years: string;
  desc: string;
}

interface Experience {
  title: string;
  company: string;
  years: string;
  desc: string;
}

interface Skill {
  name: string;
  level: number;
}

interface AboutData {
  name: string;
  role: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  cvFile: string;
}

const ABOUT: AboutData = {
  name: "Claudia Dolhan",
  role: "Full Stack Developer",
  summary: `Full-Stack Developer passionate about building modern web applications.
  I work across frontend and backend technologies to create scalable, high-performance, and maintainable software with a strong focus on user experience.`,
  education: [
    {
      degree: "Bachelor’s Degree in Computer Science",
      school: "Universitatea Politehnica Timișoara",
      years: "2022 — Prezent",
      desc: "Relevant Courses: Algoritms & Data Structures, POO, Data Bases, Web Technologies, Software Engineering.",
    },
  ],
  experience: [
    {
      title: "Frontend Developer (Project)",
      company: "SmartLink — Medical Dashboard",
      years: "2024 — Prezent",
      desc: "Dashboard medical cu React, MUI, Node.js și Azure SQL. Vizualizare date pacienți în timp real și sistem de alarme.",
    },
    {
      title: "Full Stack Developer",
      company: "Blog Magazine Platform",
      years: "2024",
      desc: "Platformă blog cu Vite + TypeScript, server Node.js HTTP și PostgreSQL.",
    },
  ],
  cvFile: "/cv.pdf",
};

const SKILLS: Skill[] = [
  { name: "JavaScript", level: 85 },
  { name: "React / Vite", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "C Programming", level: 65 },
  { name: "PostgreSQL", level: 85 },
  { name: "HTML & CSS", level: 90 },
  { name: "Git & GitHub", level: 72 },
  { name: "SQL / Azure SQL", level: 75 },
  { name: "Algoritmi & SD", level: 70 },
];

export default function About(): React.ReactElement {
  const navigate = useNavigate();

  const handleDownloadCV = (): void => {
    const link = document.createElement("a");
    link.href = ABOUT.cvFile;
    link.download = `${ABOUT.name.replace(" ", "_")}_CV.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.page}>
      <Sidebar />

      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <button className={styles.backBtn} onClick={() => navigate("/")}>
            ← Back
          </button>

          <h1 className={styles.bannerTitle}>ABOUT ME</h1>
        </div>
      </div>

      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introGrid}>
            <div>
              <h2 className={styles.introName}>{ABOUT.name}</h2>
              <p className={styles.introRole}>{ABOUT.role}</p>
              <p className={styles.introText}>{ABOUT.summary}</p>
              <button className={styles.cvBtn} onClick={handleDownloadCV}>
                DOWNLOAD MY CV
                <span className={styles.cvArrow}>↓</span>
              </button>
              <p className={styles.cvNote}>
                📁 <code>client/public/cv.pdf</code>
              </p>
            </div>
            <div className={styles.statsBox}>
              <div className={styles.stat}>
                <span className={styles.statNum}>3+</span>
                <span className={styles.statLabel}>Years of coding</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>10+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>CS</span>
                <span className={styles.statLabel}>Student at UPT</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNum}>7+</span>
                <span className={styles.statLabel}>Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Professional Skill Highlights</p>
          <h2 className={styles.sectionTitle}>TECHNICAL SKILLS</h2>
          <div className={styles.skillsGrid}>
            {SKILLS.map((s: Skill) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>My Educational Background</p>
          <h2 className={styles.sectionTitle}>Academic Preparation</h2>
          <div className={styles.timeline}>
            {ABOUT.education.map((e: Education, i: number) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{e.years}</span>
                  <h3 className={styles.timelineDegree}>{e.degree}</h3>
                  <p className={styles.timelineSchool}>{e.school}</p>
                  <p className={styles.timelineDesc}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.eyebrow}>Professional Experience</p>
          <h2 className={styles.sectionTitle}>Achievements</h2>
          <div className={styles.timeline}>
            {ABOUT.experience.map((e: Experience, i: number) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{e.years}</span>
                  <h3 className={styles.timelineDegree}>{e.title}</h3>
                  <p className={styles.timelineSchool}>{e.company}</p>
                  <p className={styles.timelineDesc}>{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} {ABOUT.name}. Built with React & ❤️
        </p>
      </footer>
    </div>
  );
}
