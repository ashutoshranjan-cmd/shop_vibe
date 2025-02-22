
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { FcGoogle } from "react-icons/fc";
import { X } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await dispatch(loginUser(formData));

      toast({
        title: data?.payload?.message,
        variant: data?.payload?.success ? "default" : "destructive",
        className: data?.payload?.success ? "bg-green-50" : "bg-red-50",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/oauth/google"

    console.log("Google Login Clicked");
    // Integrate Google Sign-In (OAuth/Firebase/Auth API)
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="mx-auto w-full max-w-md space-y-8 relative"
    >
      {/* Cut Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <motion.div {...fadeInUp} className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-lg text-gray-600">Sign in to your account</p>
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            className="font-medium text-primary transition-colors hover:text-primary/80"
            to="/auth/register"
          >
            Register here
          </Link>
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6"
      >
        <CommonForm
          formControls={loginFormControls}
          buttonText={isLoading ? "Signing in..." : "Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full bg-white text-gray-700 border border-gray-300 rounded-lg py-2 px-4 shadow-sm hover:bg-gray-100 transition-colors"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>
      </motion.div>

      <motion.div variants={fadeInUp} className="text-center text-sm text-gray-500">
        By signing in, you agree to our{" "}
        <Link to="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default AuthLogin;
