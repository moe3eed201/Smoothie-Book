import{ Link } from "react-router-dom";
import supabase from "/src/config/supabaseClient.jsx";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';


const SmoothieCard = ({smoothie, onDelete}) => {

    const navigate = useNavigate();

    const handleDelete = async () => {
      const confirmed = window.confirm("Are you sure you want to delete this smoothie?");
      if (!confirmed) {
        return;
      }
      const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      
      if (error) {
        console.log("Delete Failed:", error)
      } else {
        console.log(data)
        onDelete(smoothie.id)
        
      }
  }
  return (
    <div className="smoothie-card">
    <Link to={`/profile/${smoothie.id}`}>
      
      <h3>{smoothie.title}</h3>
      <p>{smoothie.ingredients}</p>
      <div className="hidden-content">
        <img src={smoothie.imageUrl} alt={smoothie.title} />
      </div>
      </Link>
      <div className="rating">{smoothie.rating}</div>
      <div className="update">
        <Link to={"/" + smoothie.id}>     
          <i className="material-icons">
            <Grid item xs={8}>
            <EditSharpIcon />
            </Grid>
          </i>        
        </Link>
      </div>
      <div className="delete" onClick={handleDelete}> 
        <i className="material-icons" >
            <Grid item xs={8}>
            <DeleteSharpIcon />
            </Grid>
        </i>
      </div>
    </div>
  )
}

export default SmoothieCard;