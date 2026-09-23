import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Check,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "../common/ThemeToggle";
import { AuthContext } from "../../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Dropdown states
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Refs for click outside detection
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // Dummy notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New expense added",
      message: "Grocery Shopping - $245",
      time: "2 min ago",
      read: false,
      icon: "🛒",
    },
    {
      id: 2,
      title: "Income received",
      message: "Salary Deposit - $5,000",
      time: "1 hour ago",
      read: false,
      icon: "💰",
    },
    {
      id: 3,
      title: "Budget alert",
      message: "Food budget 80% used",
      time: "3 hours ago",
      read: false,
      icon: "⚠️",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle navigation from user menu
  const handleNavigate = (path) => {
    setUserMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 right-0 left-72 h-16 border-b border-border bg-card/50 backdrop-blur-xl z-20">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* ✅ Notifications Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl hover:bg-accent transition"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div>
                      <h3 className="font-semibold">Notifications</h3>
                      <p className="text-xs text-muted-foreground">
                        {unreadCount} unread
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-primary hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="w-12 h-12 mx-auto text-muted-foreground mb-2 opacity-50" />
                        <p className="text-sm text-muted-foreground">
                          No notifications
                        </p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex gap-3 p-4 border-b border-border last:border-0 hover:bg-accent/50 transition group cursor-pointer ${
                            !notification.read ? "bg-primary/5" : ""
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}
                              >
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-destructive/10 rounded"
                          >
                            <X className="w-3 h-3 text-destructive" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-border text-center">
                      <button className="text-sm text-primary hover:underline font-medium">
                        View all notifications
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ User Menu Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-accent transition"
            >
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">Premium User</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-purple-600/5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition text-left"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">My Profile</span>
                    </button>

                    <button
                      onClick={() => handleNavigate("/settings")}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent transition text-left"
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 transition text-left text-destructive"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
