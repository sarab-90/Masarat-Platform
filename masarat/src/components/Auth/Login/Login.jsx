import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api.js";
import toast from "react-hot-toast";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);
      const { token, user, message } = response.data;

      localStorage.setItem("token", token);
      if (user.role === "admin") {
      localStorage.setItem("Admin", JSON.stringify(user));
      localStorage.removeItem("User");
      localStorage.removeItem("Provider");
      navigate("/admin/dashboard");
    } else if (user.role === "provider") {
      localStorage.setItem("Provider", JSON.stringify(user));
      localStorage.removeItem("User");
      localStorage.removeItem("Admin");
      navigate("/provider/activities"); 
    } else {
      localStorage.setItem("User", JSON.stringify(user));
      localStorage.removeItem("Admin");
      localStorage.removeItem("Provider");
      navigate("/user/home");
    }

    toast.success(message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue with MASARAT</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-link">
          Don’t have an account?
          <span onClick={() => navigate("/register")}> Register</span>
        </p>
      </div>
    </div>
  );
}
export default Login;