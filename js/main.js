

const loadMeal = (mealName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(res => res.json())
    .then(data => getMeals(data.meals))
}

const getMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerText = '';
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-md-6');
        mealDiv.innerHTML = `

            <div class="card mb-3" style="max-width: 500px;">
                <div class="row g-0">
                    <div class="col-md-5">
                    <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-7">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <h6 class="card-title">${meal.strCategory}</h6>
                        <p class="card-text">${meal.strInstructions.substring(0, 80)}...</p>
                        <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mealDetails">
                        Details
                        </button>
                    </div>
                    </div>
                </div>
            </div>

        `
        mealContainer.appendChild(mealDiv);
        // console.log(meal)
    });
}


const searchMeal = ()=> {
    const inputValue = document.getElementById('input-text').value;
    loadMeal(inputValue);
}


const loadMealDetails = (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    console.log(meal)
    const mealBody = document.getElementById('meal-body');
    mealBody.innerHTML = `
        <img class="img-fluid rounded-start mb-3" src="${meal.strMealThumb}" alt="">
        <h6>Category:  ${meal.strCategory}  </h6>
        <h6>Area: ${meal.strArea}  </h6>
        <h6>Instruction: </h6>
        <p>${meal.strInstructions} </p>
        <p><b> YouTube: </b> <a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a> </p>
    `
}





loadMeal('');