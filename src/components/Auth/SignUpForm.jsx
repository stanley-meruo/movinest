import { useState } from "react";
import { supabase } from "../../lib/supabase";
import toast from "react-hot-toast";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa6";


const SignUpForm = ({ onSwitch }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
     if (error) {
       toast.error(error.message);
     } else {
       toast.success("Signed Up Successfully! Now sign in.");
       onSwitch(email); 
     }
  };

  const handleGoogleSignUp = async () => {
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
      <h2 className="text-xl font-bold text-center">Sign Up</h2>
      <form onSubmit={handleEmailSignUp} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md border px-4 py-2 text-sm lg:text-base"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
            className="w-full border rounded-md px-4 py-2 text-sm lg:text-base"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-3 text-lg text-neutral-600"
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

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full border rounded-md px-4 py-2 text-sm lg:text-base"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-2 top-3 text-lg text-neutral-600"
          >
            {showConfirm ? (
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignUp}
        className="w-full border py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer"
      >
        <FcGoogle className="size-6" />
        Sign up with Google
      </button>

      <p className="text-sm text-neutral-600 text-center">
        Already have an account?{" "}
        <button
          className="text-red-600 font-medium cursor-pointer"
          onClick={onSwitch}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
