import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import ContactForm from "../components/contactForm";
import styles from "./home.module.css";

interface Profile {
  name: string;
  title: string;
  subtitle: string;
  intro: string;
  photo: string | null;
}

interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
}

const PROFILE: Profile = {
  name: "Claudia Dolhan",
  title: "Full Stack Developer",
  subtitle: "React · TypeScript · Node.js · PostgreSQL",
  intro:
    "Software Developer passionate about building modern, scalable web applications. Experienced in full-stack development across frontend, backend, and databases, with a strong focus on clean architecture, maintainable code, and user-centered design.",
  photo: "/image_portofoliu.png",
};

const PROJECTS: Project[] = [
  {
    title: "Health Track & Monitor",
    desc: "A medical monitoring dashboard designed for doctors to track patient data in real time. Built with React and Material UI for a clean, responsive interface, connected to a Node.js + Express backend and an Azure SQL database. Features include a sidebar layout, patient table, alarm management system, and a doctor profile page. The app uses React Router for navigation between multiple pages. Focused on usability and Nielsen's 10 heuristics for medical-grade UX. Deployed with a RESTful API architecture for scalable data handling.",
    tags: ["React", "Node.js", "Express", "Azure SQL", "MUI", "React Router"],
    link: "https://smart-link-wine.vercel.app/",
  },
  {
    title: "Travel Blog Magazine",
    desc: "A full-stack blog and magazine platform featuring a dynamic card system powered by PostgreSQL. The frontend uses Vite + TypeScript with reusable components and React Router for seamless navigation. The backend is a pure Node.js HTTP server without Express, handling API requests and contact form submissions. Country data is fetched from an external API using useEffect. Styled with CSS Modules for scoped, maintainable design.",
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "CSS Modules",
      "React Router",
    ],
    link: "https://blog-claudia10.vercel.app",
  },
  {
    title: "AI Across Industries",
    desc: "An informational website exploring the use of Artificial Intelligence across various real-world domains such as healthcare, education, finance, and entertainment. Built with React + Vite for fast performance and smooth navigation between topic sections. Styled entirely with custom CSS, focusing on clean layout and readability. The project highlights how AI technologies are transforming industries and everyday life. Designed as a research and presentation tool with structured content sections. A frontend-only project focused on UI design and content organization.",
    tags: ["React", "Vite", "CSS"],
    link: "#",
  },

  {
    title: "Online Coffe Shop",
    desc: "A coffee e-commerce platform built with React + Vite + TypeScript on the frontend, featuring a modern dark-themed UI with a fully functional shopping cart, product catalog, and order management system. The backend is powered by Node.js + Express, connected to a PostgreSQL database for storing products, orders, and customer data. Each registered user receives a unique security key for authenticated access, ensuring secure session management and data protection. API endpoints were tested and validated using Postman throughout development. The platform supports user registration, login, and a complete checkout flow.",
    tags: [
      "React",
      "Vite",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Postman",
    ],
    link: "https://coffee-shopro.vercel.app",
  },
];

export default function Home(): React.ReactElement {
  const navigate = useNavigate();
  const [modalProject, setModalProject] = useState<Project | null>(null);

  return (
    <div className={styles.page}>
      <Sidebar />

      <section className={styles.hero} id="home">
        <div className={styles.heroPhoto}>
          <div className={styles.heroPhoto}>
            <div className={styles.photoWrapper}>
              <img src={PROFILE.photo!} alt={PROFILE.name} />
              <div className={styles.barBottom} />
            </div>
          </div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroIntro}>
            <span className={styles.dash}>—</span>
            <h1 className={styles.heroName}>
              I'M {PROFILE.name.toUpperCase()}.
            </h1>
          </div>
          <h2 className={styles.heroTitle}>{PROFILE.title.toUpperCase()}</h2>
          <p className={styles.heroSubtitle}>{PROFILE.subtitle}</p>
          <p className={styles.heroText}>{PROFILE.intro}</p>
          <button className={styles.ctaBtn} onClick={() => navigate("/about")}>
            MORE ABOUT ME
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      </section>

      <section className={styles.section} id="portfolio">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>PORTFOLIO</h2>
          <div className={styles.grid}>
            {PROJECTS.map((p: Project, i: number) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardNum}>0{i + 1}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>
                  {p.desc.slice(0, 120)}...{" "}
                  <button
                    className={styles.readMore}
                    onClick={() => setModalProject(p)}
                  >
                    more
                  </button>
                </p>
                <div className={styles.tags}>
                  {p.tags.map((t: string) => (
                    <span key={t} className={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
                <a href={p.link} className={styles.cardLink}>
                  View Project →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="contact">
        <div className={styles.sectionInner}>
          <h2 className={styles.sectionTitle}>CONTACT ME</h2>
          <div className={styles.contactWrap}>
            <div className={styles.contactInfo}>
              <p className={styles.contactText}>
                Looking to start a project or explore new possibilities?{" "}
                <br></br>Contact me, and I will get back to you at the earliest
                convenience.
              </p>
              <div className={styles.contactDetail}>
                <span>✉️</span>
                <span>claudiacristina949@yahoo.com</span>
              </div>
              <div className={styles.contactDetail}>
                <span>📍</span>
                <span>Bucharest, Romania</span>
              </div>
              <div className={styles.contactDetail}>
                <span>💼</span>
                <a
                  href="https://www.linkedin.com/in/claudia-dolhan/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn Profile - Claudia_Dolhan
                </a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Built with React & ☕
        </p>
      </footer>
      {modalProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalProject(null)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setModalProject(null)}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>{modalProject.title}</h2>
            <p className={styles.modalDesc}>{modalProject.desc}</p>
            <div className={styles.tags}>
              {modalProject.tags.map((t: string) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
