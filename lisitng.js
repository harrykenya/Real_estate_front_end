const apiUrl = 'https://real-estate-new1.herokuapp.com';

async function fetchListing(){
  try{
    const response = await fetch(`${apiUrl}/listing`);

    if (!response.ok){
      throw new Error(`Failed to fech posts: ${response.status}`);
    }
    return await response.json();
  }catch(e){
    console.log(e);
  }
}

function listsListing(postContainerElementId){
  const postContainerElementId = document.getElementById
  (postContainerElementId);

  if (!postContainerElement){
    return;
  }

  fetchListing()
  .then((listing) => { 
    if(!listing){               
      postContainerElementId.innerHTML = 'No lisitngs fetched';
      return;
    }

    for(const listing of listing ){
      postContainerElementId.appendChild(listingElement(listing));
    }
  })
  .catch((e) => {
    console.log(e);
  })
}

function listingElement(listing){
  const anchorElement = document.createElement('a');
  anchorElement.setAttribute('href',`${apiUrl}/${listing.id}`); 
  anchorElement.setAttribute('target', '_blank');
  anchorElement.innerText = post.title;
  
  const listingTitleElement = document.createElement('h3');
  listingTitleElement.appendChild(anchorElement);

  return listingTitleElement;

}
