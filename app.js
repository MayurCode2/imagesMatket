const auth = "563492ad6f917000010000016b2706ccff854d18a446e5734d94895d"; //ADD THE AUTH KEY
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
const tagButton = document.querySelector(".tag-button");
const sky = document.querySelector(".tag-sky");
const nature = document.querySelector(".tag-nature");
const animal = document.querySelector(".tag-animal");
const car = document.querySelector(".tag-car");
const cameara = document.querySelector(".tag-camera");



let page = 1;
let fetchLink;
let currentSearch;

//Event Listeners
 
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", e => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);
tagButton.addEventListener("click",backImg);
sky.addEventListener("click",skyImg);
nature.addEventListener("click",natureImg);
animal.addEventListener("click",animalImg);
car.addEventListener("click",carImg);
cameara.addEventListener("click",cameraImg);



function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth
    }
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach(photo => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}><button class="btn-2"><span>Download</span></button>
            </a>
            </div>
            <img src=${photo.src.large}></img>
            `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function backImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=background&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
async function skyImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=sky&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function natureImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=nature&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function animalImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=animale&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function carImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=car&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

async function cameraImg(){
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=camera&per_page=15`
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
