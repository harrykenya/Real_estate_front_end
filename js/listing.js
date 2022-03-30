let apiUrl="http://localhost:3000"

function loadpageData(){
  function listsListing(){
    const listingContainerElementId = document.getElementById("feature_listings");
    fetchListing()
    .then((listings) => { 
      document.getElementById("loader").style.display = "none";
      // Check if we have any listings.
      if(listings.count > 0 ){
        // For each listing, display a listing card
        listings['listings'].forEach((listing) => {
          listingContainerElementId.appendChild(listingCard(listing));
        });
      } else {
        listingContainerElementId.innerText = "No listings found.";
      }
    })
    .catch((e) => {
      console.log(e);
    });    
  }
  listsListing();
}

document.addEventListener('DOMContentLoaded', loadpageData);

async function fetchListing(){
  try{
    const response = await fetch(`${apiUrl}/listings`);
    if (!response.ok){
      throw new Error(`Failed to fech posts: ${response.status}`);
    }
    return await response.json();
  }catch(e){
    console.log(e);
  }
}

function listingCard(listing){
  console.log(listing);
  const listingCard = document.createElement('div');
  listingCard.classList.add('listing_card');
  listingCard.classList.add('col-md-6');
  listingCard.classList.add('col-lg-4');
  listingCard.classList.add('mb-4');
  listingCard.innerHTML = `
  <div class="card listing-preview" style="display:block">
      <img class="card-img-top" src="${listing.listingImage}" alt="${listing.name}">
      <div class="card-img-overlay">
        <h2>
        <span class="badge badge-secondary text-white">KES ${ Number(listing.price).toLocaleString() }</span>
        </h2>
      </div>
      <div class="card-body">
        <div class="listing-heading text-center">
          <h4 class="text-primary">${listing.name}</h4>
         <p><i class="fas fa-map-marker text-secondary"></i> ${listing.location}</p>
        </div>
        <hr>
        <div class="row py-2 text-secondary">
          <div class="col-6">
            <i class="fas fa-th-large"></i> Sqft: ${listing.sqft}</div>
          <div class="col-6">
            <i class="fas fa-car"></i> Garage: ${listing.garage}</div>
        </div>
        <div class="row py-2 text-secondary">
          <div class="col-6">
            <i class="fas fa-bed"></i> Bedrooms: ${listing.bedrooms}</div>
          <div class="col-6">
            <i class="fas fa-bath"></i> Bathrooms: ${listing.bathrooms}</div>
        </div>
        <hr>
        <div class="row py-2 text-secondary">
          <div class="col-12">
            <i class="fas fa-user"></i>${listing.realtor.name[0].toUpperCase()+listing.realtor.name.slice(1)}</div>
        </div>
        <div class="row text-secondary pb-2">
          <div class="col-12">
            <i class="fas fa-clock"></i>${new Date(listing.listingdate).toDateString()}</div>
        </div>
        <hr>
        <a href="listing.html" class="btn btn-primary btn-block">More Info</a>
      </div>
  </div>
  `;
  return listingCard;
}

// var myVar;

// function myFunction() {
//   myVar = setTimeout(showPage, 3000);
// }

// function showPage() {
//   document.getElementById("loader").style.display = "none";
//   document.getElementById("card listing-preview").style.display = "block";
// }

window.onunload = function(){
  document.removeEventListener('DOMContentLoaded', loadpageData);
}

