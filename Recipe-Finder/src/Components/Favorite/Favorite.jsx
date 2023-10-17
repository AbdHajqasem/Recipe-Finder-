import "./Favorite.css";
import { useState } from "react";
const Favorite = (prop) => {
  const [favoriteArr] = useState(
    JSON.parse(localStorage.getItem("favoriteRecipes"))
  );
  if(!favoriteArr){
    return(<>
      <><h1>Empty</h1></>
    </>
    )
  }
  return (
    <>
      <div className="elementscontainer">
        {favoriteArr.map((item, index) => (
          <div className="recipe-container" key={index}>
            <div className="imgcontainer">
              <img src={item.image} alt="" />
            </div>
            <h2 className="recipe-title ">{item.title}</h2>
            <input
              className="ingredients-favotite-btn"
              type="button"
              value={"show ingredients"}
              onClick={() => {
                prop.changeFavoriteFlag(false);
                prop.changeRecipeFlag(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
export default Favorite;
