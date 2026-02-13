import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // مسح بيانات المستخدم
    localStorage.removeItem("User");

    navigate("/login");
  }, [navigate]);

  return null; // لا تعرض شيء
}
export default Logout;