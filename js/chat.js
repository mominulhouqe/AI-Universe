



const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => displayData(data.data.tools))
}

const displayData = info => {
    // console.log(info);
    const divContainer = document.getElementById('div-container')

    info.forEach(element => {

        // console.log(element);

        const div = document.createElement('col');
        div.innerHTML = `
       
        <div class="card">
            <img src="${element.image ? element.image : 'Not Avaible Picture'}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Features:</h5>
                <p>1.${element.features[0] ? element.features[0] : 'Not Availble features'}</p>
                <p>2.${element.features[1] ? element.features[1] : 'Not Availble features'}</p>
                <p>3.${element.features[2] ? element.features[2] : 'Not Availble features'}</p>
    
            </div>
            <hr>
            <div class="d-flex justify-content-between p-2">
                <div>
                    <h5 class="fw-bold">${element.name}</h5>
                    <p><i class="fa-solid fa-calendar-days"></i> ${element.published_in}</p>
                </div>
                <div class="">
                <button onclick="showDescription(${element.id})" type="button" class="btn  bg-light border-5  rounded-3 p-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fa-solid fa-arrow-right text-danger"></i>
  </button>
                  
                </div>
            </div>
        </div>
      </div>
        
        `
        divContainer.appendChild(div);


    });


}

const showDescription = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/0${id}`)
        .then(res => res.json())
        .then(data => displayDescription(data.data))
}

const displayDescription = descriptions => {


    const modalContainer = document.getElementById('modal-description')
    modalContainer.innerHTML = ''

    // console.log(descriptions.integrations[1]);

    const div2 = document.createElement('div');
    div2.innerHTML = `
    <div class="row">
    <div class="col-6 ">
        <div class="card p-3">
        <h5 class="card-text fw-bold ">${descriptions.description} </h5>
            <div class="d-flex">
            <p class="p-3 bg-light text-success">${descriptions.pricing[0].price + "<br>" +
            descriptions.pricing[0].plan}</p>
          <p class="p-3 bg-light text-warning">${descriptions.pricing[1].price + "<br>" +
            descriptions.pricing[1].plan}</p>
          <p class="p-3 bg-light text-danger">${descriptions.pricing[2].price + "<br>" +
            descriptions.pricing[2].plan}</p>
            </div>
            <div class="d-flex justify-content-between"> 
                <div>
                    <h4 class="mb-2">Features</h4>
                    <li class="mx-2 mb-1 text-muted" > ${descriptions.features[1].feature_name}</li>
                    <li class="mx-2 mb-1 text-muted">${descriptions.features[2].feature_name}</li>
                    <li class="mx-2 mb-1 text-muted"> ${descriptions.features[3].feature_name} </li>
                
                </div>
                <div>
                <h4 class="mb-2">Integrations</h4>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[0]} </li>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[1]}</li>
                  <li class="mx-2 mb-1 text-muted">${descriptions.integrations[2]}</li>
                
                </div>
            </div>
        </div>
    </div>

    <div class="col-6">
   <div class="card p-2">
   <img src=" ${descriptions.image_link[0]}" class="img-fluid"  alt="...">
  <div class="text-center mt-2">
   
  <p class="fw-bolder">${descriptions.input_output_examples[0].input}</p>
  <p class="small">${descriptions.input_output_examples[0].output}</p>

  </div>
   </div>
    </div>
</div>

        `

    modalContainer.appendChild(div2);

}




loadData();