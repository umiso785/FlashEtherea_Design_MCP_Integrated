import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IDELayout from "./layouts/IDELayout";
import ExecutionDashboard from "./pages/ExecutionDashboard";
import MainDashboard from "./pages/MainDashboard";
import Settings from "./pages/Settings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/execution" replace />} />
        <Route path="/execution" element={<ExecutionDashboard />} />
        <Route path="/design" element={<IDELayout />} />
        <Route path="/design" element={<IDELayout />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ide" element={<IDELayout />} />
      </Routes>
    </BrowserRouter>
  );
}