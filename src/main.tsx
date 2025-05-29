import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import "./css/modern.css"; // Import our modern styles
import "./index.css";
import Index from "./Index";
import App from "./App";
import About from "./About";
import { GarminCallback } from "./components/GarminCallback";
import { LoginForm } from "./components/auth/LoginForm";
import { SignUpForm } from "./components/auth/SignUpForm";
import { ForgotPasswordForm } from "./components/auth/ForgotPasswordForm";
import { UserProfile } from "./components/auth/UserProfile";
import GarminConnect from "./components/GarminConnect";
import ConnectDevices from "./components/ConnectDevices";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { DndProvider } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { QueryParamProvider } from "use-query-params";
import { WindowHistoryAdapter } from "use-query-params/adapters/window";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Determine the basename based on environment
// In development, use no basename, in production use '/stridr'
const basename = import.meta.env.DEV ? "" : "/stridr";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider options={HTML5toTouch}>
      <QueryParamProvider adapter={WindowHistoryAdapter}>
        <div className="app bg-slate-50 text-slate-900">
          <BrowserRouter basename={basename}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />}>
                  <Route index element={<HomePage />} />
                  <Route path="calendar" element={<App />} />
                  <Route path="about" element={<About />} />
                  <Route path="login" element={<LoginForm />} />
                  <Route path="signup" element={<SignUpForm />} />
                  <Route
                    path="forgot-password"
                    element={<ForgotPasswordForm />}
                  />
                  <Route
                    path="profile"
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="connect"
                    element={
                      <ProtectedRoute>
                        <ConnectDevices />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="connect/garmin"
                    element={
                      <ProtectedRoute>
                        <GarminConnect />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route path="/garmin/callback" element={<GarminCallback />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </QueryParamProvider>
    </DndProvider>
  </StrictMode>
);
