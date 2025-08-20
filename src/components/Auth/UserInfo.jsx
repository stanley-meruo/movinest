import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";


const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signingOut, setSigningOut] = useState(false);
  const [avatarLetter, setAvatarLetter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setUser(data.user);
        }
      })
      .finally(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (user?.email) {
      setAvatarLetter(user.email.slice(0, 2).toUpperCase());
    }
  }, [user]);

  const ProviderDisplay = ({ provider }) => {
    const providers = {
      email: {
        icon: <MdEmail className="size-6" />,
      },
      google: {
        icon: <FcGoogle className="size-6" />,
      },
    };
    const { icon } = providers[provider] || {
      label: provider,
      icon: null,
    };
    return (
      <p className="flex items-center justify-center gap-2 bg-neutral-700 max-w-40 rounded-md p-1 ">
        Signed in with {icon}
      </p>
    );
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await supabase.auth.signOut();
      setUser(null); // instantly clear UI
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err.message);
    } finally {
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-4 h-screen">
        <FaSpinner className="size-8 animate-spin text-red-600 sm:size-10 lg:size-12" />
        <p className="font-semibold text-gray-400 sm:text-lg lg:text-xl">
            Authenticating User
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-400">No User Signed In</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-400">{error}</p>
      </div>
    );
   }

  return (
    <section className="text-white py-32 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
      <div className="grid">
        <div className="size-28 flex items-center justify-center rounded-full bg-neutral-600 text-white text-6xl mb-4">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            avatarLetter
          )}
        </div>
        <div className="grid gap-2">
          <p className="text-2xl font-semibold">
            {user.user_metadata?.name ? (
              <span className="">Hi {user.user_metadata?.name}</span>
            ) : (
              <span className="">
                {" "}
                Hi{" "}
                {user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
              </span>
            )}
          </p>
          <p className="text-sm mb-1">{user.email}</p>
          <ProviderDisplay provider={user.app_metadata.provider} />
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="px-4 py-2 mt-44 bg-red-600 hover:bg-red-700 text-white rounded-md transition mx-auto flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {signingOut ? (
            <>
              <FaSpinner className="animate-spin" /> Signing Out...
            </>
          ) : (
            "Sign Out"
          )}
        </button>
      </div>
    </section>
  );
};

export default UserInfo;
