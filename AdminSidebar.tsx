import { useLanguage } from "@/contexts/LanguageContext";
import { 
  LayoutDashboard, 
  Hospital, 
  Stethoscope, 
  FileText, 
  Star, 
  HelpCircle, 
  Image as ImageIcon, 
  Calendar, 
  Users,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";

type AdminSection = "dashboard" | "clinic" | "services" | "blog" | "testimonials" | "faqs" | "gallery" | "appointments" | "team";

interface AdminSidebarProps {
  activeSection: AdminSection;
  setActiveSection: (section: AdminSection) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen 
}: AdminSidebarProps) {
  const { t } = useLanguage();
  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clinic", label: "Clinic Info", icon: Hospital },
    { id: "services", label: "Services", icon: Stethoscope },
    { id: "blog", label: "Blog Posts", icon: FileText },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "faqs", label: "FAQs", icon: HelpCircle },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "team", label: "Team", icon: Users },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-green-900 text-white transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-green-800">
            <h2 className="text-xl font-bold tracking-wider">AYURVEDA ADMIN</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveSection(item.id as AdminSection);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className={`
                        w-full flex items-center px-4 py-3 rounded-lg transition-colors
                        ${activeSection === item.id 
                          ? 'bg-green-700 text-white' 
                          : 'text-green-100 hover:bg-green-800'}
                      `}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-green-800">
            <button 
              onClick={() => logout()}
              className="w-full flex items-center px-4 py-3 text-green-100 hover:bg-green-800 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
