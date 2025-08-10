import './App.css'
import { useState } from 'react';

function App() {

  const [ingredientsList, setIngredientsList] = useState('');
  const [mealType, setMealType] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setMealType(e.target.value)

  }
  const handleSubmit = async () => {

    setLoading(true);

    const response = await fetch('http://localhost:8000/generate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: ingredientsList,
        mealType: mealType
      })
    });

    const data = await response.json();
    setRecipe(data.recipe);
    setLoading(false);
  }

  return (
    <>
    <div>
      <h1>Generate recipe with indredients from your fridge</h1>
    </div>
    <div>
      <div>
        <h2>Enter ingredients</h2>
      </div>
      <textarea placeholder='Eggs, carrots, chicken...' 
      value={ingredientsList}
      onChange={(e) => setIngredientsList(e.target.value)}/>
    </div>
    <div>
      <h2>Enter meal type</h2>
      <label>
        <input type="radio"
        value="breakfast"
        checked={mealType === "breakfast"}
        onChange={handleChange}/>
        Breakfast
      </label>
      <label>
        <input type="radio"
        value="lunch"
        checked={mealType === "lunch"}
        onChange={handleChange}/>
        Lunch
      </label>
      <label>
        <input type="radio"
        value="dinner"
        checked={mealType === "dinner"}
        onChange={handleChange}/>
        Dinner
      </label>
    </div>
    <div>
      <button type='submit' onClick={handleSubmit} className='submit_prompt-button'>Generate</button>
    </div>
    {loading &&(
      <div>
        <h3>Loading...</h3>
      </div>
    )}
    {!loading && recipe && (
      <div>
        <h2>Generated Recipe</h2>
        <pre>{recipe}</pre>
      </div>
    )}
    </>
  )
}

export default App
