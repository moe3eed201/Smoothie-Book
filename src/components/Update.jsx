import { useState, useEffect } from "react";
import supabase from "/src/config/supabaseClient.jsx";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSmoothie();
  }, [id, navigate]);

  const fetchSmoothie = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      navigate("/", { replace: true });
    } else {
      setTitle(data.title.toUpperCase());
      setIngredients(data.ingredients);
      setRating(data.rating);
      setImage(data.imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !rating || !image) {
      setError("Please fill in all fields correctly");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update([
        {
          title: title,
          ingredients: ingredients,
          rating: rating,
          imageUrl: image,
        },
      ])
      .eq("id", id);

    if (error) {
      console.log("Update failed:", error);
    } else {
      console.log("Update success:", data);
      navigate("/");
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Update {title}</h2>
        <input
          required
          type="text"
          placeholder="Title:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
          rows="5"
          placeholder="Ingredients:"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <input
          required
          type="number"
          placeholder="Rating:"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
          step="0.1"
        />
        <input
          required
          type="url"
          placeholder="Image-url:"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Update;
