import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogProvider } from "@posthog/react";
import App from "./App.tsx";
import "./index.css";

const posthogProjectToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim();
const posthogApiHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";

const posthogOptions = {
  api_host: posthogApiHost,
  defaults: "2026-01-30" as const,
};

function Root() {
  if (posthogProjectToken) {
    return (
      <PostHogProvider apiKey={posthogProjectToken} options={posthogOptions}>
        <App />
      </PostHogProvider>
    );
  }
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
