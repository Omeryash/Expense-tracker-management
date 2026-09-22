import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import {
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  CreditCard,
  Download,
  LogOut,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useCurrency } from "../context/CurrencyContext";
import { motion } from "framer-motion";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, currencies } = useCurrency();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    pushNotifications: false,
    twoFactor: false,
    language: "English",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const sections = [
    {
      title: "Appearance",
      icon: theme === "dark" ? Moon : Sun,
      description: "Choose your preferred theme",
      action: (
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-xl bg-muted hover:bg-accent transition text-sm font-medium"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      ),
    },
    {
      title: "Notifications",
      icon: Bell,
      description: "Manage your notification preferences",
      action: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() =>
              setSettings({
                ...settings,
                notifications: !settings.notifications,
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      ),
    },
    {
      title: "Email Alerts",
      icon: Globe,
      description: "Receive email alerts for important updates",
      action: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.emailAlerts}
            onChange={() =>
              setSettings({ ...settings, emailAlerts: !settings.emailAlerts })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      ),
    },
    {
      title: "Security",
      icon: Shield,
      description: "Two-factor authentication",
      action: (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.twoFactor}
            onChange={() =>
              setSettings({ ...settings, twoFactor: !settings.twoFactor })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      ),
    },
    {
      title: "Currency",
      icon: CreditCard,
      description: `Currently: ${currencies[currency]?.name || "US Dollar"}`,
      action: (
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-4 py-2 rounded-xl bg-muted hover:bg-accent transition text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {Object.values(currencies).map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} ({c.symbol})
            </option>
          ))}
        </select>
      ),
    },
    {
      title: "Export Data",
      icon: Download,
      description: "Download your financial data",
      action: (
        <Button variant="outline" size="sm">
          Export
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Customize your application preferences
          </p>
        </div>

        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="flex items-center justify-between p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-muted">
                    <section.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.description}
                    </p>
                  </div>
                </div>
                {section.action}
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="border-destructive/50">
          <div className="text-center py-6">
            <h3 className="font-semibold text-destructive mb-2">
              ⚠️ Danger Zone
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Permanently delete your account and all associated data
            </p>
            <Button
              variant="danger"
              className="flex items-center gap-2 mx-auto"
              onClick={() => setShowDeleteModal(true)}
            >
              <LogOut className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account?"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="text-2xl">⚠️</div>
            <div>
              <p className="font-semibold text-destructive mb-1">
                This action cannot be undone
              </p>
              <p className="text-sm text-muted-foreground">
                All your transactions, income records, and account data will be
                permanently deleted.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="flex-1"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("expenses");
                localStorage.removeItem("currency");
                setShowDeleteModal(false);
                alert("Account deleted successfully!");
                navigate("/login");
              }}
            >
              Yes, Delete Account
            </Button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
