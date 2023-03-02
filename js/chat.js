



const  loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/ai/tools')
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}

const displayData = info =>{
    // console.log(info);
    const divContainer = document.getElementById('div-container')

    info.forEach(element => {

        console.log(element);

        const div = document.createElement('col');
        div.innerHTML = `
       
        <div class="card">
            <img src="${element.image ? element.image: 'Not Avaible Picture'}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Features:</h5>
                <p>1.${element.features[0] ? element.features[0]: 'Not Availble features' }</p>
                <p>2.${element.features[1] ? element.features[1]: 'Not Availble features'}</p>
                <p>3.${element.features[2] ? element.features[2]: 'Not Availble features'}</p>
    
            </div>
            <hr>
            <div class="d-flex justify-content-between p-2">
                <div>
                    <h5 class="fw-bold">${element.name}</h5>
                    <p><i class="fa-solid fa-calendar-days"></i> ${element. published_in}</p>
                </div>
                <div class="">
                <button type="button" class="btn  bg-light border-5  rounded-3 p-3 " data-bs-toggle="modal" data-bs-target="#exampleModal">
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






loadData();