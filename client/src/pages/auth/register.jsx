// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
// import CommonForm from "@/components/common/form";
// import { registerFormControls } from "@/config";
// import { registerUser } from "@/store/auth-slice";

// const initialState = {
//   userName: "",
//   email: "",
//   password: "",
// };

// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 }
// };

// function AuthRegister() {
//   const [formData, setFormData] = useState(initialState);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   async function onSubmit(event) {
//     event.preventDefault();
//     setIsLoading(true);

//     try {
//       const data = await dispatch(registerUser(formData));
      
//       toast({
//         title: data?.payload?.message,
//         variant: data?.payload?.success ? "default" : "destructive",
//         className: data?.payload?.success ? "bg-green-50" : "bg-red-50",
//       });

//       if (data?.payload?.success) {
//         navigate("/auth/login");
//       }
//     } catch (error) {
//       toast({
//         title: "An error occurred during registration",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       className="mx-auto w-full max-w-md space-y-8"
//     >
//       <motion.div 
//         {...fadeInUp} 
//         className="text-center space-y-2"
//       >
//         <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//           Join Shop Vibe
//         </h1>
//         <p className="text-lg text-gray-600">
//           Create your account today
//         </p>
//         <p className="text-sm text-gray-500">
//           Already have an account?{" "}
//           <Link
//             className="font-medium text-primary transition-colors hover:text-primary/80"
//             to="/auth/login"
//           >
//             Sign in here
//           </Link>
//         </p>
//       </motion.div>

//       <motion.div
//         variants={fadeInUp}
//         className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6"
//       >
//         <CommonForm
//           formControls={registerFormControls}
//           buttonText={isLoading ? "Creating account..." : "Create Account"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//           disabled={isLoading}
//         />
//       </motion.div>

//       <motion.div
//         variants={fadeInUp}
//         className="text-center text-sm text-gray-500"
//       >
//         By creating an account, you agree to our{" "}
//         <Link to="/terms" className="text-primary hover:underline">
//           Terms of Service
//         </Link>{" "}
//         and{" "}
//         <Link to="/privacy" className="text-primary hover:underline">
//           Privacy Policy
//         </Link>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default AuthRegister;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { X } from "lucide-react"; // Importing cut (close) icon

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await dispatch(registerUser(formData));

      toast({
        title: data?.payload?.message,
        variant: data?.payload?.success ? "default" : "destructive",
        className: data?.payload?.success ? "bg-green-50" : "bg-red-50",
      });

      if (data?.payload?.success) {
        navigate("/auth/login");
      }
    } catch (error) {
      toast({
        title: "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="mx-auto w-full max-w-md space-y-8 relative"
    >
      {/* Cut (Close) Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={24} />
      </button>

      <motion.div {...fadeInUp} className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Join Shop Vibe
        </h1>
        <p className="text-lg text-gray-600">Create your account today</p>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary transition-colors hover:text-primary/80"
            to="/auth/login"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="bg-white/50 backdrop-blur-sm rounded-lg shadow-lg p-6 space-y-6"
      >
        <CommonForm
          formControls={registerFormControls}
          buttonText={isLoading ? "Creating account..." : "Create Account"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          disabled={isLoading}
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="text-center text-sm text-gray-500">
        By creating an account, you agree to our{" "}
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

export default AuthRegister;
