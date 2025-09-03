import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-hot-toast";
import { BsBookmarkHeart, BsBookmarkHeartFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button";


const BookmarkButton = ({ media }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  

  // ✅ Check if already bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("user_id", user.id)
        .eq("media_id", media.id)
        .single();

      if (data) setBookmarked(true);
    };

    checkBookmark();
  }, [user, media.id]);

  // ✅ Toggle bookmark
  const handleBookmark = async () => {
    if (!user) {
      toast.error("Please sign in to bookmark");
      return;
    }

    setLoading(true);

    if (bookmarked) {
      // remove bookmark
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("user_id", user.id)
        .eq("media_id", media.id);

      if (error) {
        toast.error("Failed to remove bookmark");
      } else {
        setBookmarked(false);
        toast.success("Removed from bookmarks");
      }
    } else {
      // add bookmark
      const { error } = await supabase.from("bookmarks").insert([
        {
          user_id: user.id,
          media_id: media.id,
          media_type: media.type,
          title: media.title,
          poster_path: media.poster_path,
        },
      ]);

      if (error) {
        toast.error("Failed to add bookmark");
      } else {
        setBookmarked(true);
        toast.success("Added to bookmarks");
      }
    }

    setLoading(false);
  };


  return (
    <Button
      onClick={handleBookmark}
      disabled={loading}
      className="text-[28px] text-white absolute top-2 left-2 cursor-pointer md:text-[32px] xl:text-4xl"
      title={bookmarked ? "Remove bookmark" : "Add to bookmarks"}
      aria-label={bookmarked ? "Remove bookmark" : "Add to bookmarks"}
    >
      {bookmarked ? <BsBookmarkHeartFill /> : <BsBookmarkHeart />}
    </Button>
  );
}
export default BookmarkButton
