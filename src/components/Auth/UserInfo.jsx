import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Button from "../Button";
import toast from "react-hot-toast";

const SkeletonCard = () => (
  <div className="bg-neutral-700 animate-pulse h-40 rounded-md"></div>
);

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarksLoading, setBookmarksLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [avatarLetter, setAvatarLetter] = useState("");
  const navigate = useNavigate();

  // Fetch user + bookmarks together
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;

        setUser(user);
        if (user?.email) setAvatarLetter(user.email.slice(0, 2).toUpperCase());

        if (user) {
          setBookmarksLoading(true);
          const { data: bmData, error: bmError } = await supabase
            .from("bookmarks")
            .select("*")
            .eq("user_id", user.id);
          if (!bmError) setBookmarks(bmData);
          setBookmarksLoading(false);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ProviderDisplay = ({ provider }) => {
    const providers = {
      email: { icon: <MdEmail className="size-6" /> },
      google: { icon: <FcGoogle className="size-6" /> },
    };
    const { icon } = providers[provider] || { icon: null };
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
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err.message);
    } finally {
      setSigningOut(false);
    }
  };

  // 🗑️ Remove a bookmark
  const handleRemoveBookmark = async (bookmarkId) => {
    // show loading toast
    const toastId = toast.loading("Removing bookmark...");

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", bookmarkId)
        .eq("user_id", user.id);

      if (error) throw error;

      // update state without refetching
      setBookmarks((prev) => prev.filter((bm) => bm.id !== bookmarkId));

      // ✅ Success
      toast.success("Bookmark removed!", { id: toastId });
    } catch (err) {
      console.error("Error removing bookmark:", err.message);
      // ❌ Error
      toast.error("Failed to remove bookmark. Try again.", { id: toastId });
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
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-400">No User Signed In</p>
      </div>
    );
  }

  return (
    <section className="text-white py-20 px-5 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
      <div className="grid font-montserrat">
        <div className="size-28 flex items-center justify-center rounded-full bg-neutral-600 text-white text-6xl mb-4">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url || "/no-image.jpg"}
              alt="User Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            avatarLetter
          )}
        </div>

        <div className="grid gap-2 mb-8">
          <p className="text-2xl font-semibold md:text-3xl">
            {user.user_metadata?.name ? (
              <span>Hi {user.user_metadata.name}</span>
            ) : (
              <span>
                Hi{" "}
                {user.email.split("@")[0].charAt(0).toUpperCase() +
                  user.email.split("@")[0].slice(1)}
              </span>
            )}
          </p>
          <p className="text-sm">{user.email}</p>
          <ProviderDisplay provider={user.app_metadata.provider} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-center my-4 md:text-3xl my:mb-6">
            Your Bookmarks
          </h2>
          <div className="grid grid-cols-2 gap-3 xs:grid-cols-3 xs:gap-4 md:grid-cols-4 xmd:grid-cols-4 xmd:gap-6 lg:grid-cols-5">
            {bookmarksLoading ? (
              Array(4)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            ) : bookmarks.length === 0 ? (
              <p className="text-neutral-500 col-span-full m-auto">
                No bookmarks yet.
              </p>
            ) : (
              bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="relative p-2 min-w-[150px] bg-neutral-800 rounded-md"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title}
                    className="rounded-md w-full object-cover"
                  />
                  <p className="text-sm font-semibold text-center mt-2 line-clamp-2 xl:text-base">
                    {item.title}
                  </p>

                  {/* 🗑️ Remove button */}
                  <Button
                    title="Remove bookmark"
                    onClick={() => handleRemoveBookmark(item.id)}
                    className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition"
                  >
                    <MdDelete className="text-xl md:text-3xl xmd:text-[32px] xl:text-4xl" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>

        <Button
          onClick={handleSignOut}
          disabled={signingOut}
          title="Sign Out"
          className="px-4 py-2 mt-10 text-sm font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition mx-auto flex items-center justify-center gap-2 disabled:opacity-50 md:px-6 md:py-3 md:text-base"
        >
          {signingOut ? (
            <>
              <FaSpinner className="animate-spin" /> Signing Out...
            </>
          ) : (
            "Sign Out"
          )}
        </Button>
      </div>
    </section>
  );
};

export default UserInfo;
