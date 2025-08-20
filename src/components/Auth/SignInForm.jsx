import { useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa6";


const SignInForm = ({ onSwitch, onClose, prefillEmail ="" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(prefillEmail);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);
    if (error) {
      if (error.message === "Invalid login credentials") {
        toast.error("No account found with that email. Please sign up.");
        // Optionally auto-switch to sign-up modal after a delay
        setTimeout(() => {
          onSwitch();
        }, 1500);
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Signed in successfully!");
      onClose();
    }
  };


  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Redirecting to Google...");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-center">Sign In</h2>
      <form onSubmit={handleEmailSignIn} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 text-sm lg:text-base"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full border rounded px-4 py-2 pr-10 text-sm lg:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-3 text-lg text-gray-500"
          >
            {showPassword ? (
              <>
                <RxEyeClosed />
              </>
            ) : (
              <>
                <RxEyeOpen />
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md flex justify-center items-center gap-2 cursor-pointer "
          disabled={loading}
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="w-full border py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <FcGoogle className="size-6" />
        Sign in with Google
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <button
          className="text-red-600 font-medium cursor-pointer"
          onClick={onSwitch}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
