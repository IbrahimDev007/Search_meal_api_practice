let showMore = true;
//  fetch data 
const fetchMeal = (meal, value = true) => {

  if (value === true) {
    try {

      document.getElementById('showButton').innerText = 'show more'
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        .then(res => res.json())
        .then(data => showdata(data.meals.slice(0,6)));

    }
    catch (err) {
      console.log('err', err);
    }
  }
  else {
    document.getElementById('showButton').innerText = 'show less';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then(res => res.json())
      .then(data => showdata(data.meals));

  }
}

// show data 


function showdata(data) {
  document.getElementById('meal-content').innerHTML = '';
  console.log(data);


  data.forEach(el => {
    const foodContainer = document.getElementById('meal-content')
    const { strMeal, strMealThumb, strInstructions ,idMeal} = el;
    foodContainer.innerHTML += `<div class="card w-full   bg-base-100 shadow-xl m-2">
    <figure class="px-10 pt-10">
      <img src="${strMealThumb}" alt="Shoes"  class="rounded-xl mx-4 w-40 h-40" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${strMeal}</h2>
      <p>${strInstructions.slice(0, 150)}</p>
      <div class="card-actions">
      <label for="my-modal-3" onclick='showModal(${idMeal})' class="btn">open modal</label>
      </div>
    </div>
  </div>
  `
  }

  )
  pogress(false)
}
// show pogress 
const pogress = (value) => {
  const pog = document.getElementById('pogress')
  if (value === true) {
    pog.classList.remove('hidden')
  }
  else {
    pog.classList.add('hidden')
  }

}
// search meal 
const searchMeal = (value) => {
  const meal = document.getElementById('search_food').value
  pogress(true)
  fetchMeal(meal, value);

}

// toggle button 
const toggleShow = () => {
  showMore = !showMore;
  if (showMore) {
    // display more items
    searchMeal(true);
  } else {
    // display fewer items
    searchMeal(false);
  }
}

const showModal= async(id)=>{
  console.log(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  
  const idFetch=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const idJSON= await idFetch.json();
    const data=idJSON.meals[0];
    const{strMeal,strInstructions,strYoutube,strMealThumb}=data;
 const modal=document.getElementById('modal');
 modal.innerHTML=`
 <label
 for="my-modal-3"
 class="btn btn-sm btn-circle absolute right-2 top-2"
 >✕</label
>
<img src=${strMealThumb} class="w-full ">
<h3 class="text-lg font-bold">
${strMeal}
</h3>
<p class="py-4">
 ${strInstructions}
</p>
<a href=" ${strYoutube}"> <b>Youtube: </b>${strYoutube}</a>
`
}


