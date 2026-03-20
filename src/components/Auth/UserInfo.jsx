import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdOutlineArrowForwardIos, MdDelete } from "react-icons/md";
import Button from "../Button";
import toast from "react-hot-toast";

// Bookmark skeleton card
const SkeletonCard = () => (
  <div className="min-w-[140px] animate-pulse">
    <div className="w-full h-40 bg-neutral-700 rounded-md" />
    <div className="h-4 bg-neutral-700 rounded mt-2 w-3/4 mx-auto" />
  </div>
);

// UserInfo skeleton
const UserInfoSkeleton = () => (
  <div className=" grid py-6 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
    <div className="grid animate-pulse">
      {/* Avatar */}
      <div className="bg-neutral-700 size-16 rounded-full mb-4 lg:size-20"/>
        {/* Name & Email */}
        <div className="grid gap-3 md:gap-4">
          <div className="bg-neutral-700 w-2/4 h-6 rounded-md md:h-8"/>
          <div className="bg-neutral-700 w-2/5 h-5 rounded-md"/>
          <div className="bg-neutral-700 w-2/6 h-6 rounded-md"/>
        </div>
        {/* Bookmarks */}
        <div className=" mx-auto my-10">
          <div className="bg-neutral-700 w-2/4 h-6 rounded-md mb-4 mx-auto sm:w-2/5 md:h-8"/>
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="grid space-y-4">
                <div className="min-w-[130px] h-56 bg-neutral-700 rounded-md sm:min-w-[150px] xmd:min-w-[180px] lg:min-w-[160px]" />
                <div className="h-5 w-24 bg-neutral-700 rounded-md mx-auto" />
              </div>
            ))}
          </div>
        </div>
    </div>
  </div>
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
      <p className="mx-auto flex items-center justify-center gap-2 bg-neutral-700 rounded-md px-1.5 py-1 text-[13px] xmd:p-1 xmd:text-sm">
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
    if (!confirm("Remove this bookmark?")) return;
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
    return <UserInfoSkeleton />;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">No User Signed In</p>
      </div>
    );
  }

  return (
    <section className="text-white min-h-screen grid px-4 py-12 xs:px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 xxl:px-28">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-neutral-500 mr-auto mb-8"
      >
        <MdOutlineArrowForwardIos className="text-xs rotate-180" />
        <Button
          title="Home"
          className="text-sm font-montserrat font-medium md:text-base"
        />
      </Link>
      <div className="grid font-montserrat">
        {/* Avatar */}
        <div className="mx-auto size-16 flex items-center justify-center rounded-full bg-neutral-700 text-white text-6xl mb-4 lg:size-20">
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

        <div className="grid gap-2 mb-8 mx-auto text-center">
          <p className="text-xl font-semibold md:text-2xl">
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

        {/* Bookmarks */}
        <div>
          <h2 className="text-xl font-semibold text-center my-2 md:text-2xl md:my-3 lg:text-[27px] lg:my-4">
            Your Bookmarks
          </h2>
          <div className="grid grid-cols-2 gap-x-3 gap-y-5 py-2 xs:grid-cols-3 sm:grid-cols-4 md:gap-4 xmd:gap-5 lg:grid-cols-5">
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
                  className="relative min-w-[140px] rounded-md"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title}
                    className="rounded-md w-full object-cover"
                  />
                  <p className="text-[13px] font-semibold text-center mt-2 line-clamp-2 xl:text-sm">
                    {item.title}
                  </p>

                  {/* 🗑️ Remove button */}
                  <div className="absolute top-2 right-2 group xl:top-3 xl:right-3">
                    <Button
                      title="Remove bookmark"
                      aria-label="Remove bookmark"
                      onClick={() => handleRemoveBookmark(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition cursor-pointer"
                    >
                      <MdDelete className="text-xl lg:text-2xl xl:text-[27px]" />
                    </Button>

                    {/* Tooltip */}
                    <span className="absolute right-0 top-10 hidden group-hover:block bg-neutral-700 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap lg:text-xs">
                      Remove bookmark
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sign Out Button */}
        <Button
          onClick={handleSignOut}
          disabled={signingOut}
          title="Sign Out"
          className="px-4 py-2 mt-6 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-md transition mx-auto gap-2 disabled:opacity-50 sm:text-[13px] md:px-6 md:py-2.5 md:text-sm md:mt-10"
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
