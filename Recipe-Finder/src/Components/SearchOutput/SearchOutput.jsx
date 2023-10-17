import "./SearchOutput.css";
import { apiKey } from "../../Key/Key";
import { useEffect, useState } from "react";

const SearchOutput = (prop) => {
  const [itemArr, setItemArr] = useState([]);
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${prop.recipeName}&apiKey=${apiKey}`
        );
        const searchData = await response.json();
        if (searchData.results.length > 0) {
          setItemArr(searchData.results);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getRecipe();
  }, [prop.recipeName]);
  const addToFavorite = (item) => {
    if (localStorage) {
      const favoriteRecipes =
        JSON.parse(localStorage.getItem("favoriteRecipes")) || [];
      let itemExists = false;

      favoriteRecipes.forEach((recipe) => {
        if (recipe.id === item.id) {
          itemExists = true;
        }
      });

      if (!itemExists) {
        favoriteRecipes.push(item);
        localStorage.setItem(
          "favoriteRecipes",
          JSON.stringify(favoriteRecipes)
        );
      }
    }
  };
  return (
    <>
      <div className="elementscontainer">
        {itemArr.map((item, index) => (
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
                prop.disAppearSeacrhOutput("");
                prop.changeRecipeFlag(item.id);
              }}
            />
            <input
              type="button"
              className="ingredients-favotite-btn"
              value={"Add to favorite"}
              onClick={() => {
                addToFavorite(item);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchOutput;
