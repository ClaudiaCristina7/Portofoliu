import { useNavigate, useLocation } from "react-router-dom";
import styles from "./sidebar.module.css";

interface NavItem {
  icon: string;
  label: string;
  path: string;
}

const icons: NavItem[] = [
  { icon: "🏠", label: "Home", path: "/" },
  { icon: "👤", label: "About", path: "/about" },
  { icon: "💼", label: "Portfolio", path: "/#portfolio" },
  { icon: "✉️", label: "Contact", path: "/#contact" },
];

export default function Sidebar(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string): void => {
    if (path.includes("#")) {
      const [page, hash] = path.split("#");
      if (location.pathname !== page && page !== "") {
        navigate(page);
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={styles.sidebar}>
      {icons.map((item) => (
        <button
          key={item.label}
          className={styles.iconBtn}
          title={item.label}
          onClick={() => handleNav(item.path)}
        >
          <span>{item.icon}</span>
        </button>
      ))}
    </nav>
  );
}
