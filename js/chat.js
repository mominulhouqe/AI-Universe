
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

    // Display All Container Data
    info.forEach((element) => {

        // card Element here

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card">
                <img src="${element.image ? element.image : 'Not Available Picture'}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">Features:</h5>
                    <ol>1. ${element.features[0] ? element.features[0] : 'Not Available features'}</ol>
                    <ol>2. ${element.features[1] ? element.features[1] : 'Not Available features'}</ol>
                    <ol>3. ${element.features[2] ? element.features[2] : 'Not Available features'}</ol>
                </div>
                <hr>
                <div class="d-flex justify-content-between p-2">
                    <div>
                        <h5 class="fw-bold">${element.name}</h5>
                        <p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
                    </div>
                    <div class="">
                        <button onclick="showDescription(${element.id ? element.id : 'No data Found'})" type="button" class="btn bg-light border-5 rounded-3 p-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fa-solid fa-arrow-right text-danger"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        divContainer.appendChild(div);
    });
};

// sort data by date function
const sortByDate = (info) => {
    info.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
};


// sort button event listener
const sortBtn = document.getElementById('sort-btn');
sortBtn.addEventListener('click', () => {
    const divContainer = document.getElementById('div-container');
    const cards = divContainer.querySelectorAll('.card');
    const sortedData = [...cards].map(card => {
        return {
            card,
            date: card.querySelector('p > i.fa-solid.fa-calendar-days').nextSibling.textContent.trim()
        }
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    sortByDate(sortedData);

    sortedData.forEach((item) => {
        divContainer.appendChild(item.card);
    });
});


// added See all Button
document.getElementById("see-more-btn").addEventListener("click", function () {

    // set card  container children length
    const dataLimit = document.getElementById("div-container").children.length + 6;

    // pass dataLimite parameter in loadCardData function
    loadCardsData(dataLimit);
});


// Modal Element Here and Fetching here
const showDescription = (id) => {

    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id < 10 ? '0' : ''}${id}`)

        .then(res => res.json())
        .then(data => displayDescription(data.data, data.data.pricing))
}

// Displaying Modal Card Componnents

const displayDescription = (descriptions, prices) => {

    // modal Body here
    const modalContainer = document.getElementById('modal-description');


    modalContainer.innerHTML = '';

    const div2 = document.createElement('div');
    div2.innerHTML = `
    <div class="row mx-auto">
    <div class="col-12 col-md-6 ">
        <div class="card p-3">
        <h5 class="card-text fw-bold ">${descriptions.description ? descriptions.description : 'Sorry no data found'} </h5>
            <div class="d-flex ">

            <p class="p-3 bg-light text-success">
            ${prices && prices.length > 0 && prices[0].price !== null ? prices[0].price : 'Price not available'} ${prices && prices.length > 0 && prices[0].plan !== null ? prices[0].plan : ''}

            </p>
          <p class="p-3 bg-light text-warning">
          ${prices && prices.length > 0 && prices[1].price !== null ? prices[1].price : 'Price not available'} ${prices && prices.length > 0 && prices[1].plan !== null ? prices[1].plan : ''}

            </p>
          <p class="p-3 bg-light text-danger">
          ${prices && prices.length > 0 && prices[2].price !== null ? prices[2].price : 'Price not available'} ${prices && prices.length > 0 && prices[2].plan !== null ? prices[2].plan : ''}

            </p>
            </div>
            <div class="d-flex flex-wrap justify-content-between"> 
                <div d-flex flex-wrap>
                    <h4 class="mb-2">Features</h4>
                    <li class="mx-2 mb-1 text-muted" > ${descriptions.features[1].feature_name ? descriptions.features[1].feature_name : 'Name Not Found'}</li>
                    <li class="mx-2 mb-1 text-muted">${descriptions.features[2].feature_name ? descriptions.features[2].feature_name : 'Name Not Found'}</li>
                    <li class="mx-2 mb-1 text-muted"> ${descriptions.features[3].feature_name ? descriptions.features[3].feature_name : 'Name Not Found'} </li>
                
                </div>
                <div>
                <h4 class="mb-2">Integrations</h4>
                <li class="mx-2 mb-1 text-muted">
                ${descriptions.integrations ? descriptions.integrations : 'No data Found'}</li>

                  <li class="mx-2 mb-1 text-muted"> ${descriptions.integrations ? descriptions.integrations : 'No data Found'}</li>
                  <li class="mx-2 mb-1 text-muted"> ${descriptions.integrations ? descriptions.integrations : 'No data Found'}</li>
                
                </div>
            </div>
        </div>
    </div>

    <div class="col-12 col-md-6 mx-auto">
   <div class="card p-2  position-relative ">
   
   <img src="${descriptions.image_link[0] ? descriptions.image_link[0] : 'No found Image'}" class="w-100" alt="..." onerror="this.onerror=null;this.src='not_found.jpg';this.alt='Image not found';">


  <div class="text-center mt-2">
   
  <p class="fw-bolder"> <p>
 
  <p class="small">${descriptions.input_output_examples && descriptions.input_output_examples.length ? descriptions.input_output_examples[0].input : 'No! Not Yet! Take a break!!!.'}</p>
  
  <div class="position-absolute top-0 end-0 bg-danger text-white">
  <button class="btn btn-primary" style="${descriptions.accuracy.score !== null ? '' : 'display: none;'}">${descriptions.accuracy.score !== null ? descriptions.accuracy.score * 100 : ''}% accuracy</button>
</div>


  </div>
   </div>
    </div>
</div>

        `

    modalContainer.appendChild(div2);
    return;
}

// Sorted here 

const sortData = () => {
    // Sort data based on published date
    const sortedData = data.data.tools.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateB - dateA;
    });
    displayData(sortedData, dataLimit);
};

// Load All data here
loadCardsData(6);