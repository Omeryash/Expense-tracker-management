import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Signup successful! Please login with demo@fintrack.com / 123456");
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-background to-purple-600/20" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3')] bg-cover bg-center opacity-5" />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow" />

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
            FinTrackBuddy
          </h1>
          <p className="text-muted-foreground mt-2">
            Join Us and Start Managing Your Finance
          </p>
        </div>

        {/* Signup Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="rounded border-border mt-1"
                required
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-primary hover:underline cursor-pointer">
                  Privacy Policy
                </span>
              </span>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              Sign Up
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
