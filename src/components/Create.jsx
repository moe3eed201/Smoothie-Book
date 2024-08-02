import { useState } from "react";
import supabase from "/src/config/supabaseClient.jsx";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !ingredients || !rating || !image) {
      setFormError("Please fill in all the fields.");
      return;
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{
        title: title.toUpperCase(),
        ingredients: ingredients,
        rating: rating,
        imageUrl: image
      }]);

    if (error) {
      console.log("Failed:", error);
      setFormError("Error creating smoothie. Please try again.");
    } else {
      setFormError(null);
      console.log("Success:", data);
      navigate("/");
    }
  }

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>ADD NEW SMOOTHIE</h2>
        {formError && <p className="error">{formError}</p>}
        <input
          required
          type="text"
          placeholder="Title:"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          required
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
        <button type="submit">Add New Smoothie</button>
      </form>
    </div>
  );
}

export default Create;
