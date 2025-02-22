import React from 'react';
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex items-center justify-center w-1/2 px-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(17, 24, 39) 100%)",
        }}
      >
        {/* Animated background shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        />

        <div className="relative z-10 max-w-md space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Welcome to Shop Vibe
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-gray-300 text-lg"
            >
              Your one-stop destination for modern shopping experience
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;