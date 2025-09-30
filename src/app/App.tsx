import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IDELayout from "../ui/layouts/IDELayout";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/ide" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ide" element={<IDELayout />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}