import { motion as Motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    
    <div className="min-h-screen flex justify-center items-center bg-white">
      <Motion.div
        className="w-16 h-16 border-4 border-t-4 
                   border-t-black border-blue-200 
                   rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      </div>
    
  );
};

export default LoadingSpinner;
