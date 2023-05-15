const toggler=disPlayStyle=>{
    const spinner=document.getElementById('spinner')
    spinner.style.display=disPlayStyle
}

const food=()=>{
    const search=document.getElementById('search')
    const searchText=search.value ;
    search.value=''
    const details=document.getElementById('details')
    details.innerHTML=''
    const eroor=document.getElementById('demo')
    eroor.innerHTML=''
    //disply spinner
    toggler('block')
    if(searchText==""){
        const eroor=document.getElementById('demo')
        eroor.innerHTML='Please Search Any Kinds OF food'
        toggler('none')
    }
    else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(res=>res.json())
        .then(data=>displayData(data.meals))
    }
   
}
const displayData=(id)=>{
    console.log(id);
    const section=document.getElementById('section')
    section.textContent=''
    if(id==null){
        const eroor=document.getElementById('demo')
        eroor.innerHTML='ooppss!Your Search Result is not found'
        //spinner none
        toggler('none')
    }
    else{
        //? channing kora hoice
        id?.forEach(data=>{
            const div=document.createElement('div')
            div.classList.add('col')
        div.innerHTML=`
            <div class="card  m-5">
           
            <img   width="100px" height="200px" src="${data.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data.strMeal}</h5>
            <button onclick="details('${data.idMeal}')" class="btn btn-success" type="">Details</button>
            </div>
        </div>
        `
            section.appendChild(div)
        })
        //stop spinner
        toggler('none')
    }

        
        
}
const details=(id)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>fullDetails(data.meals))
}
const fullDetails=(meals)=>{
// console.log(meals);

const details=document.getElementById('details')
details.textContent=''
meals.forEach(meal=>{
    const div=document.createElement('div')
    div.classList.add('col')
    div.innerHTML=`
    <div class="col-md-4 ">
    <img  width="300px" height="200px" class='text-center m-5' src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class='text-center' class="card-title">${meal.strMeal}</h5>
      <p  class='text-center' class="card-text">${meal.strInstructions}</p>
      
    </div>
  </div>
    `
    details.appendChild(div)
})
}