import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { CgClose } from "react-icons/cg";

const AuthModal = ({ isOpen, onClose, defaultMode= "signup" }) => {
  const [mode, setMode] = useState(defaultMode);
  const [prefilledEmail, setPrefilledEmail] = useState("");

  const handleClose = () => {
    setPrefilledEmail(""); 
    onClose();
    setMode("signup"); 
  };

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
    }
  }, [isOpen, defaultMode]);


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black"
          />
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-6 top-7 cursor-pointer"
              aria-label="Close modal"
            >
              <CgClose className="size-7" />
            </button>
            {mode === "signin" ? (
              <SignInForm
                prefillEmail={prefilledEmail}
                onSwitch={() => setMode("signup")}
                onClose={handleClose}
              />
            ) : (
              <SignUpForm
                onSwitch={(email) => {
                  setPrefilledEmail(email);
                  setMode("signin");
                }}
                onClose={handleClose}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
