import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { toast } from "react-hot-toast";

const BookmarkButton = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // ✅ Derive media type
  const mediaType = item.media_type || (item.title ? "movie" : "tv");

  // ✅ Check if this movie/tv show is already bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("movie_id", item.id)
        .eq("media_type", mediaType)
        .maybeSingle(); // ✅ safer than .single()

      if (error) {
        console.error("❌ Error fetching bookmark:", error);
      } else if (data) {
        setBookmarked(true);
      }
    };

    if (item?.id) checkBookmark();
  }, [item, mediaType]);

  const handleBookmark = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please log in to bookmark movies.");
        setLoading(false);
        return;
      }

      if (bookmarked) {
        // ✅ Instead of inserting again, block with toast
        toast.error("Already Bookmarked");
        setLoading(false);
        return;
      }

      // --- Optimistic update ---
      setBookmarked(true);
      toast.success("Bookmarked!");

      const { error } = await supabase.from("bookmarks").insert([
        {
          user_id: user.id,
          movie_id: item.id,
          movie_title: item.title || item.name,
          movie_poster: item.poster_path,
          media_type: mediaType,
        },
      ]);

      if (error) {
        setBookmarked(false); // rollback
        toast.error("Failed to bookmark.");
      }
    } catch (err) {
      setBookmarked(false);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <button
      onClick={handleBookmark}
      disabled={loading}
      className="absolute top-2 left-2 text-white text-2xl hover:text-red-500 transition"
      aria-label="Bookmark"
    >
      {bookmarked ? <BsBookmarkFill /> : <BsBookmark />}
    </button>
  );
};

export default BookmarkButton;
