import "./SearchBar.css";
import { useState, useRef } from "react";

const SearchBar = () => {
  const [enteredRecipe, setEnteredRecipe] = useState("");
  const [recipePageFlag, setRecipePageFlag] = useState(0);
  const [favoriteFlag, setFavoriteFlag] = useState(false);
  const recipeInputRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    setEnteredRecipe(recipeInputRef.current.value);
  };
  const favoritePageHandler = (event) => {
    event.preventDefault();
    setEnteredRecipe("");
    setRecipePageFlag(0);
    setFavoriteFlag(true);
  };
  return (
    <>
      <form>
        <div className="barcontainer">
          <input
            type="text"
            className="Searchbar"
            placeholder="Search"
            ref={recipeInputRef}
          />
          <input
            type="submit"
            value={"Search"}
            onClick={submit}
            className="searchbtn"
          />
        </div>
        <div className="favoritebtncontainer">
          <button onClick={favoritePageHandler} className="favoritebtn">
            <i className="fa-solid fa-heart" id="heart"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;