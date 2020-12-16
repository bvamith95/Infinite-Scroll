const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[];
let isInitialLoad = true;

// Unsplash API
const initialCount = 5;
const apiKey='LtY1FjpGZAhCYRP24dii35r2636fJUdhd4gdl6nBAjY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}&orientation=landscape&collections=nature,street-photography,architecture`;

function updateAPIURLWithNewCount (picCount){
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}&orientation=landscape&collections=nature,street-photography,architecture`;
}

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden=true;
    }
}
// Helper function to set Attributes on DOM Elements
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elemetens For Links & Photos, Add to DOM
function displayPhotos (){
    imagesLoaded = 0;
    totalImages=photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        // Create <a> to link too unsplash
        const item= document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.title_description,
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainerElement
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray =await response.json();
        displayPhotos();
        if(isInitialLoad){
            updateAPIURLWithNewCount(30);
            isInitialLoad = false;
        }
    }catch (error){
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window,scrollY >= document.body.offsetHeight-1000 && ready ){
        ready = false;
        getPhotos();     
    }
})

// On Load
getPhotos();