import { useState, type ChangeEvent } from "react";

import styles from "./contactForm.module.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface StatusMsg {
  type: "success" | "error";
  msg: string;
}

export default function ContactForm(): React.ReactElement {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<StatusMsg | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({
          type: "success",
          msg: "Message sent! I will get back to you as soon as possible.",
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          msg: data.error ?? "Something went wrong.",
        });
      }
    } catch {
      setStatus({ type: "error", msg: "Cannot connecxt to server." });
    }
    setLoading(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />
        </div>
        <div className={styles.field}>
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />
        </div>
      </div>
      <div className={styles.field}>
        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message..."
          rows={5}
          required
        />
      </div>
      {status && (
        <div className={`${styles.status} ${styles[status.type]}`}>
          {status.msg}
        </div>
      )}
      <button type="submit" className={styles.btn} disabled={loading}>
        {loading ? "sending the message..." : "Send Message"}
        <span className={styles.arrow}>→</span>
      </button>
    </form>
  );
}
