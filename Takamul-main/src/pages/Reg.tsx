import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  const isArabic = lang === 'ar';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else navigate("/dashboard");
  };

  const handleOAuthRegister = async (provider: "google" | "apple") => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/dashboard");
    });
  }, []);

  return (
    <div className={`flex min-h-screen font-[Zain] ${isArabic ? 'flex-row-reverse' : ''}`}> 
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Zain:ital,wght@0,200;0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap');`}
      </style>

      <div className="w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex flex-col justify-center items-center p-10 rounded-r-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isArabic ? 'أنشئ حسابك وابدأ إدارة أعمالك بسهولة.' : 'Create your account and start managing your business easily.'}
        </h2>
        <p className="text-center max-w-md">
          {isArabic ? 'سجّل الآن للوصول إلى لوحة التحكم الخاصة بك.' : 'Sign up now to access your dashboard.'}
        </p>
        <div className="mt-6 bg-white rounded-xl shadow-xl p-4 w-3/4">
          <p className="text-black text-center">
            <img src="/uploads/logo.png" alt="Takamul Logo" className="mx-auto h-20 object-contain" />
          </p>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-gradient-to-br from-white to-gray-100 rounded-l-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <div className="w-full max-w-md shadow-2xl rounded-3xl p-10 bg-white bg-opacity-90">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{isArabic ? 'أنشئ حسابك' : 'Create Account'}</h1>
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-sm text-blue-600 hover:text-blue-800 transition-all duration-150 border px-2 py-1 rounded shadow"
            >
              {isArabic ? 'English' : 'العربية'}
            </button>
          </div>
          <p className="mb-6 text-gray-500">
            {isArabic ? 'أدخل بريدك الإلكتروني وكلمة المرور لإنشاء حساب جديد.' : 'Enter your email and password to register.'}
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={isArabic ? 'البريد الإلكتروني' : 'Email'}
              className="p-3 border rounded-xl shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={isArabic ? 'كلمة المرور' : 'Password'}
              className="p-3 border rounded-xl shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700">
              {isArabic ? 'تسجيل' : 'Register'}
            </button>
          </form>

          <div className="mt-4 text-center text-gray-500 text-sm">
            {isArabic ? 'أو أنشئ الحساب باستخدام' : 'Or Sign Up With'}
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => handleOAuthRegister("google")}
              className="w-full py-2 border rounded-xl text-sm hover:bg-gray-100 shadow"
            >
              Google
            </button>
            <button
              onClick={() => handleOAuthRegister("apple")}
              className="w-full py-2 border rounded-xl text-sm hover:bg-gray-100 shadow"
            >
              Apple
            </button>
          </div>

          <p className="mt-4 text-sm text-center">
            {isArabic ? 'هل لديك حساب؟' : "Already have an account?"} <a href="/login" className="text-blue-600 hover:underline">{isArabic ? 'سجّل الدخول' : 'Log In'}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
