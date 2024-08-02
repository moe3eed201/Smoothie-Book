import { useState, useEffect } from "react";
import supabase from "/src/config/supabaseClient.jsx";
import SmoothieCard from "/src/components/SmoothieCard.jsx";
import SlideShow from "/src/components/SlideShow.jsx";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSmoothies();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const fetchSmoothies = async () => {
    const { data, error } = await supabase.from("smoothies").select();

    if (error) {
      setFetchError("Could not fetch the smoothies");
      setSmoothies([]);
      console.log(error);
    } else {
      setSmoothies(data);
      console.log(data);
      setFetchError(null);
    }
  };

  const handleDelete = (id) => {
    setSmoothies(smoothies.filter((smoothie) => smoothie.id !== id));
  };

  if (loading) {
    return (
      <>
        <div className="image-container">
          <Skeleton height={250} baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
        </div>
        <div className="page">
        <div>
          <Skeleton height={40} width="20%" baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
          <br />
        </div>
          <div className="smoothie-container">
            <div className="smoothies">
              {Array(4).fill().map((_, index) => (
                <div key={index} className="smoothie-card">
                  <Skeleton height={150} baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
                  <Skeleton count={3} baseColor="var(--skeleton-base)" highlightColor="var(--skeleton-highlight)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="home">
      <SlideShow />
      <div className="page">
        {fetchError && <p>{fetchError}</p>}
        <div className="input-container">
          <i className="material-icons"><SearchIcon /></i>
          <input
            className="search"
            type="text"
            placeholder="Find a Smoothie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {smoothies && (
          <div className="smoothie-container">
            <div className="smoothies">
              {smoothies.filter((smoothie) => {
                return search.toLowerCase() === "" ? smoothie : smoothie.title.toLowerCase().includes(search.toLowerCase());
              }).map((smoothie) => (
                <div key={smoothie.id}>
                  <SmoothieCard smoothie={smoothie} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
