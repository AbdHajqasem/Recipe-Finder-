import "./RecipePage.css";
import { apiKey } from "../../Key/Key";
import { useEffect, useState } from "react";
const RecipePage = (prop) => {
  const [infoArr, setInfoArr] = useState({});
  const [similarRecipeArr, setSimilarRecipeArr] = useState([]);
  const [insructionsArr, setInsructionsArr] = useState([]);
  useEffect(() => {
    const getRecipe = async () => {
      try {
        const [recipeResponse, similarRecipeResponse, instructionsResponse] =
          await Promise.all([
            fetch(
              `https://api.spoonacular.com/recipes/${prop.id}/information?apiKey=${apiKey}`
            ),
            fetch(
              `https://api.spoonacular.com/recipes/${prop.id}/similar?apiKey=${apiKey}`
            ),
            fetch(
              ` https://api.spoonacular.com/recipes/${prop.id}/analyzedInstructions?apiKey=${apiKey}`
            ),
          ]);

        const recipeInfoData = await recipeResponse.json();
        const similarRecipeData = await similarRecipeResponse.json();
        const insructionsData = await instructionsResponse.json();
        setInfoArr(recipeInfoData);
        setSimilarRecipeArr(similarRecipeData);
        setInsructionsArr(insructionsData);
      } catch (e) {
        console.log(e);
      }
    };

    getRecipe();
  }, []);
  if (Object.keys(infoArr).length == 0) {
    return <h1>Loading</h1>;
  }
  return (
    <>
      <div className="container">
        <div>
          <img src={infoArr.image} alt="" />
        </div>
        <h1>{infoArr.title}</h1>
        <h2>Ingredients</h2>
        {infoArr.extendedIngredients.map((ingredient, index) => (
          <p key={index}>{ingredient.original}</p>
        ))}
        <h2>Steps</h2>
        {insructionsArr.map((item, index) => (
          <div key={index}>
            {item.steps.map((step, index) => (
              <p key={index}>{step.step}</p>
            ))}
          </div>
        ))}
        <h2>Similar Recipe</h2>
        {similarRecipeArr.map((similar, index) => (
          <p key={index}>{similar.title}</p>
        ))}
      </div>
    </>
  );
};
export default RecipePage;
