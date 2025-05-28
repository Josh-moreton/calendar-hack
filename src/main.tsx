import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import "./css/modern.css"; // Import our modern styles
import "./index.css";
import Index from "./Index";
import App from "./App";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Determine the basename based on environment
// In development, use no basename, in production use '/hacks/calendarhack'
const basename = import.meta.env.DEV ? "" : "/hacks/calendarhack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider options={HTML5toTouch}>
      <QueryParamProvider adapter={WindowHistoryAdapter}>
        <div className="app bg-slate-50 text-slate-900">
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Index />}>
                <Route index path="/" element={<App />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </QueryParamProvider>
    </DndProvider>
  </StrictMode>
);
