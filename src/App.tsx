import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IDELayout from "./ui/layouts/IDELayout";
import ExecutionDashboard from "./pages/ExecutionDashboard";
import DesignDashboard from "./pages/DesignDashboard";
import MainDashboard from "./pages/MainDashboard";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/execution" replace />} />
        <Route path="/execution" element={<ExecutionDashboard />} />
        <Route path="/design" element={<DesignDashboard />} />
        <Route path="/main" element={<MainDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ide" element={<IDELayout />} />
      </Routes>
    </BrowserRouter>
  );
}