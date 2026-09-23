import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Demo Credentials
    const demoEmail = "demo@fintrack.com";
    const demoPassword = "123456";

    setTimeout(() => {
      if (formData.email === demoEmail && formData.password === demoPassword) {
        const userData = {
          name: "Demo User",
          email: demoEmail,
        };

        // ✅ AuthContext update karo (localStorage bhi automatically ho jayega)
        login("dummy-token", userData);

        navigate("/dashboard");
      } else {
        alert("Invalid Credentials! Use demo@fintrack.com / 123456");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-purple-600/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-2xl mb-6 shadow-2xl"
          >
            <TrendingUp className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FinTrack
          </h1>
          <p className="text-muted-foreground mt-2">
            Premium Finance Management
          </p>
        </div>

        {/* Login Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

          {/* ✅ Demo Credentials Hint */}
          <div className="mb-5 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-sm">
            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
              🎯 Demo Credentials:
            </p>
            <p className="text-muted-foreground">
              Email:{" "}
              <span className="font-mono font-medium">demo@fintrack.com</span>
            </p>
            <p className="text-muted-foreground">
              Password: <span className="font-mono font-medium">123456</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="demo@fintrack.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              icon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-muted-foreground">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-primary font-semibold hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
