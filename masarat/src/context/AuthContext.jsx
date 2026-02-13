import { createContext, useState, useEffect } from "react";

// إنشاء الـ Context
export const AuthContext = createContext();

// Provider لتغليف التطبيق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // تخزين بيانات المستخدم
  const [loading, setLoading] = useState(true); // للتحقق من تحميل البيانات

  // عند بداية التطبيق، نتحقق من بيانات المستخدم المخزنة في localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // دالة تسجيل الدخول
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // دالة تسجيل الخروج
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  // دالة لتحديث بيانات المستخدم (Profile)
  const updateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};