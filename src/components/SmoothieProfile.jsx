import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "/src/config/supabaseClient.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SmoothieProfile() {
  const { id } = useParams();
  const [smoothie, setSmoothie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        setError("Could not fetch smoothie details");
        console.log("Fetch failed:", error);
      } else {
        setSmoothie(data);
      }
    };

    fetchSmoothie();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="profile">
        <div className="grid-container">
          <Skeleton height={400} width={400} baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
          <div className="grid-items">
            <Skeleton height={30} width="80%" baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
            <Skeleton height={30} width="60%" baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
            <Skeleton height={30} width="70%" baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile">
      <div className="grid-container">
        <h2 className="grid-title">{smoothie.title}</h2>
        <img src={smoothie.imageUrl} alt={smoothie.title} className="grid-image" />
        <div className="grid-method">
          <h4>INGREDIENTS</h4>
          <p>{smoothie.ingredients}</p>
        </div>
        <div className="grid-rating">
          <p>RATING | {smoothie.rating}</p>
        </div>
      </div>
    </div>
  );
}

export default SmoothieProfile;
