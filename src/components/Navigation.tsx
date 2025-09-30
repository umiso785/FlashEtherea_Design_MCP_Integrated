import { Link, useLocation } from "react-router-dom";
import { BarChart3, Code, Settings, Zap } from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/editor", icon: Code, label: "Editor" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="w-64 bg-dark-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary-500" />
          <h1 className="font-bold text-lg">FlashEtherea</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">MCP Integrated IDE</p>
      </div>
      
      <div className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? "bg-primary-600 text-white" 
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          <div>System Status: <span className="text-green-400">Online</span></div>
          <div>Version: v1.0.0</div>
        </div>
      </div>
    </nav>
  );
}