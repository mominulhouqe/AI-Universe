
const loadCardsData = async (dataLimit) => {

    // loader start
    toggleLoader(true);
  
    const url = `https://openapi.programming-hero.com/api/ai/tools?limit=${dataLimit}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
    
    // loader stop
    toggleLoader(false);
  };
 



const displayData = (info, dataLimit) => {

    const divContainer = document.getElementById('div-container')

    divContainer.innerHTML = '';

      // display dataLimit number of cards by default
      const seeMore = document.getElementById("see-more");
      if (info.length > dataLimit) {
        info = info.slice(0, dataLimit);
        seeMore.classList.remove("d-none");
      } else {
        seeMore.classList.add("d-none");
      }

      // clear the existing info
    
    // console.log(info);
    
    // Display All Container Data

    info.forEach((element) => {

        // card Element here

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
       
        <div class="card">
            <img src="${element.image ? element.image : 'Not Avaible Picture'}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Features:</h5>
                <ol>${element.features[0] ? element.features[0] : 'Not Availble features'}</ol>
                <ol>${element.features[1] ? element.features[1] : 'Not Availble features'}</ol>
                <ol>${element.features[2] ? element.features[2] : 'Not Availble features'}</ol>
    
            </div>
            <hr>
            <div class="d-flex justify-content-between p-2">
                <div>
                    <h5 class="fw-bold">${element.name}</h5>
                    <p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
                </div>
                <div class="">
                <button onclick="showDescription(${element.id ? element.id: 'No data Found'})" type="button" class="btn  bg-light border-5  rounded-3 p-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa-solid fa-arrow-right text-danger"></i>
  </button>
                  
                </div>
            </div>
        </div>
      </div>
        
        `
        divContainer.appendChild(div);


    });

// Card Element End here
}

/* document.getElementById('sort').addEventListener('click', function(){
    //    info.sort((a,b) => a.dataLimit - b.dataLimit);
    //    loadCardsData(dataLimit)
    const sortBy = document.getElementById('sorted');
    loadCardsData(sortBy)
    console.log(loadCardsData(sortBy));
    }) */

// added See all Button
document.getElementById("see-more-btn").addEventListener("click", function () {
  
    // set card  container children length
    const dataLimit = document.getElementById("div-container").children.length + 6;
  
    // pass dataLimite parameter in loadCardData function
    loadCardsData(dataLimit);
  });
  


// Modal Element Here And Added step by step
const showDescription = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id<10?'0':''}${id}`)
    
      .then(res => res.json())
      .then(data => displayDescription(data.data , data.data.pricing))
}

/* const facbook = ()=>{

}

 */
// Displaying Modal Card Componnents
const displayDescription = (descriptions , price)=> {
  console.log(price[0]);

// ${descriptions.pricing[2].price + "<br>" +
// descriptions.pricing[2].plan ? descriptions.pricing[2].price +"<br>" + descriptions.pricing[2].plan :'Free of Cost' }


    // modal Body here
    const modalContainer = document.getElementById('modal-description');

    modalContainer.innerHTML = '';

    const div2 = document.createElement('div');
    div2.innerHTML = `
    <div class="row">
    <div class="col-12 col-md-6 ">
        <div class="card p-3">
        <h5 class="card-text fw-bold ">${descriptions.description ? descriptions.description:'Sorry no data found'} </h5>
            <div class="d-flex ">

            <p class="p-3 bg-light text-success">
            ${price[0].price ? price[0].price: 'Free of Cost'} ${price[0].plan ? price[0].plan :''}
            

            </p>
          <p class="p-3 bg-light text-warning">
          
          ${price[1].price ? price[1].price: 'Free of Cost'} ${price[1].plan ? price[1].plan :''}
            
            </p>
          <p class="p-3 bg-light text-danger">
          ${price[2].price.slice(0,10) ? price[2].price: 'Free of Cost'} ${price[2].plan ? price[2].plan :''}
            
            
            </p>
            </div>
            <div class="d-flex justify-content-between"> 
                <div>
                    <h4 class="mb-2">Features</h4>
                    <li class="mx-2 mb-1 text-muted" > ${descriptions.features[1].feature_name ? descriptions.features[1].feature_name:'Name Not Found' }</li>
                    <li class="mx-2 mb-1 text-muted">${descriptions.features[2].feature_name ? descriptions.features[2].feature_name:'Name Not Found'}</li>
                    <li class="mx-2 mb-1 text-muted"> ${descriptions.features[3].feature_name ? descriptions.features[3].feature_name:'Name Not Found'} </li>
                
                </div>
                <div>
                <h4 class="mb-2">Integrations</h4>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[0] ? descriptions.integrations[0] :'No data Found'  } </li>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[1] ? descriptions.integrations[1] :'No data Found'  }</li>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[2] ? descriptions.integrations[2] :'No data Found'  }</li>
                
                </div>
            </div>
        </div>
    </div>

    <div class="col-6">
   <div class="card p-2">
   
   <img src="${descriptions.image_link[0] ? descriptions.image_link[0]:'No found Image' } " class="img-fluid"  alt="...">

  <div class="text-center mt-2">
   
  <p class="fw-bolder">${descriptions.input_output_examples[0].input ? descriptions.input_output_examples[0].input : 'Can you give any example?'}</p>
  <p class="small">${descriptions.input_output_examples[1].output ? descriptions.input_output_examples[1].output :'No! Not Yet! Take a break!!!' }</p>

  </div>
   </div>
    </div>
</div>

        `

    modalContainer.appendChild(div2);

}


loadCardsData(6);