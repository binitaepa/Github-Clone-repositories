



// strats here
const loadRepo = async (searchText='binitaepa', isShowAll) => {
    console.log(searchText)
    console.log(isShowAll)
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `https://api.github.com/users/${searchText}/repos`, true)
    
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
    console.log(data)
     displayRepo(data,isShowAll)
    }
    
    // Send request
    request.send();
   
}
const avatarRepo = async (searchText='binitaepa',isShowAll) => {
    console.log(searchText)
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', `https://api.github.com/users/${searchText}`, true)
    
    request.onload = function () {
      // Begin accessing JSON data here
      var data = JSON.parse(this.response);
    console.log(data)
     displayName(data,isShowAll)
    }
    
    // Send request
    request.send();
   
}
const displayName=(data,isShowAll)=>{
    const avatar=document.getElementById('avatar');
    // clear serach container repo before adding new cards
    avatar.textContent = '';
   
        const name =document.createElement('div');
        name.classList=`card`
        // name.style.width = '18rem';
        name.classList.add('rounded-circle');
        name.style.width = '200px';
        name.style.height = '200px';
        name.classList.add('margin-left');
        name.style.marginLeft='40px'
       
        name.innerHTML =` 
        
        <div class="margin-left"> <img src=${data.avatar_url} class="img-fluid rounded-circle " alt="user_image"></div>
          <div class="margin-left">
          <h5 class="card-title ">${data.name}</h5>
          <p class="card-text width-full"><span class="text-primary">Bio:</span> ${data.bio}</p>
          <p class="card-text"><span class="text-primary"> Location:</span> ${data.location}</p>
         
          <a class="icon-link icon-link-hover" style="--bs-icon-link-transform: translate3d(0, -.125rem, 0);" href="#">
  <svg class="bi" aria-hidden="true"><use xlink:href="#clipboard"></use></svg>GITHUB:
  ${data.url}
</a>
          </div>
        `
      avatar.appendChild(name)
   
    toggleLoadingSpinner(false);
}


const displayRepo = (data, isShowAll) => {
    // console.log(data)

    const repoContainer = document.getElementById('repo-container')
    
    // clear serach container repo before adding new cards
    repoContainer.textContent = '';

    // display show all button if there are more than 12 repo
    const showAllContainer = document.getElementById('show-all-container')
    if (data.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)
    // display only first 10 repo if not show All
    if (!isShowAll) {
        data = data.slice(0, 10);
    }

    data.forEach(element => {
        // console.log(phone);
        // 2 create a div
       
        console.log(element)
          // repo
        const repoCard =document.createElement('div');
        repoCard.classList=`card`
        repoCard.style.width = '18rem';

        repoCard.innerHTML =`<div class=" card-body">
        <h5 class="card-title">${element.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${element.description} </h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">${element.language}</a>
        <a href="#" class="card-link">Another link</a>
      </div>`
      repoContainer.appendChild(repoCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 




// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
      loadRepo(searchText, isShowAll);
      avatarRepo(searchText,isShowAll)
      
}
// handle search recap
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('visually-hidden')
    }
    else {
        loadingSpinner.classList.add('visually-hidden');
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadRepo();
 avatarRepo()