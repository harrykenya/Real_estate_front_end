const apiUrl = 'http://localhost:3000';

function loadpageData(){
  function listsRealtor(){
    const realtorContainerElementId = document.getElementById("feature_realtors");
    fetchRealtor()
    .then((realtors) => { 
      
      // Check if we have any realtors.
      if(realtors.count > 0 ){
        // For each realtor, display a realtor card
        realtors['realtors'].forEach((realtor) => {
          realtorContainerElementId.appendChild(realtorCard(realtor));
        });
      } else {
        realtorContainerElementId.innerText = "No realtors found.";
      }
    })
    .catch((e) => {
      console.log(e);
    });    
  }
  listsRealtor();
}

document.addEventListener('DOMContentLoaded', loadpageData);

async function fetchRealtor(){
  try{
    const response = await fetch(`${apiUrl}/realtors`);
    if (!response.ok){
      throw new Error(`Failed to fech posts: ${response.status}`);
    }
    return await response.json();
  }catch(e){
    console.log(e);
  }
}

function realtorCard(realtor){
  console.log(realtor);
  const realtorCard = document.createElement('div');
  realtorCard.classList.add('realtor_card');
  realtorCard.classList.add('col-md-6');
  realtorCard.classList.add('col-lg-4');
  realtorCard.classList.add('mb-4');
  realtorCard.innerHTML = `
  <div class="card realtor-preview">
      <img class="card-img-top" src="${realtor.realtorImage}" alt="${realtor.name}">
      <div class="card-body">
        <hr>
        <div class="row py-2 text-secondary">
          <div class="col-6">
            <i class="fas fa-th-large"></i> name: ${realtor.name}</div>
          <div class="col-6">
            <i class="fas fa-car"></i> email: ${realtor.email}</div>
        </div>
        <hr>
        <a href="realtor.html" class="btn btn-primary btn-block">More Info</a>
      </div>
  </div>
  `;
  return realtorCard;
}

window.onunload = function(){
  document.removeEventListener('DOMContentLoaded', loadpageData);
}

