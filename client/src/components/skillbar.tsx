import { useEffect, useRef, useState } from "react";
import styles from "./skillbar.module.css";

interface SkillBarProps {
  name: string;
  level: number;
}

export default function SkillBar({
  name,
  level,
}: SkillBarProps): React.ReactElement {
  const [animated, setAnimated] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.skill} ref={ref}>
      <div className={styles.header}>
        <span className={styles.name}>{name}</span>
        <span className={styles.percent}>{level}%</span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.bar}
          style={{ width: animated ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}
