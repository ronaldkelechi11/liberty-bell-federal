import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeAuth } from "./api/client";

// Initialize authentication from stored tokens
initializeAuth().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
