// ======================================
// ZEGGO REAL ESTATE
// SCRIPT.JS
// ======================================

// ---------- GLOBAL ELEMENTS ----------

const propertyGrid = document.getElementById("propertyGrid");
const featuredGrid = document.getElementById("featuredProperties");
const propertyDetails = document.getElementById("propertyDetails");

// ---------- FORMAT PRICE ----------

function formatPrice(price){

    if(price >= 100000){

        return "₱" + price.toLocaleString();

    }

    return "₱" + price.toLocaleString() + "/month";

}

// ---------- CREATE PROPERTY CARD ----------

function createPropertyCard(property){

    return `

    <div class="property-card">

        <div class="property-image">

            <img src="${property.image}" alt="${property.title}">

            <span class="badge">

                ${property.status}

            </span>

        </div>

        <div class="property-info">

            <div class="property-price">

                ${formatPrice(property.price)}

            </div>

            <h3 class="property-title">

                ${property.title}

            </h3>

            <p class="property-location">

                📍 ${property.city}, ${property.province}

            </p>

            <div class="property-details">

                <span>🛏 ${property.bedrooms}</span>

                <span>🛁 ${property.bathrooms}</span>

                <span>🚗 ${property.garage}</span>

            </div>

            <button
                class="view-btn"
                onclick="viewProperty(${property.id})">

                View Details

            </button>

        </div>

    </div>

    `;

}

// ---------- DISPLAY PROPERTIES ----------

function displayProperties(list){

    if(!propertyGrid) return;

    propertyGrid.innerHTML = "";

    if(list.length===0){

        propertyGrid.innerHTML="<h2>No properties found.</h2>";

        return;

    }

    list.forEach(property=>{

        propertyGrid.innerHTML += createPropertyCard(property);

    });

}

// ======================================
// FEATURED PROPERTIES (HOME PAGE)
// ======================================

function loadFeaturedProperties(){

    if(!featuredGrid) return;

    featuredGrid.innerHTML = "";

    const featured = properties.filter(property => property.featured);

    featured.slice(0,6).forEach(property=>{

        featuredGrid.innerHTML += createPropertyCard(property);

    });

}

loadFeaturedProperties();

// ======================================
// LOAD ALL PROPERTIES
// ======================================

if(propertyGrid){

    displayProperties(properties);

}

// ======================================
// SEARCH
// ======================================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchProperties = document.getElementById("searchProperties");

function searchHomes(){

    const keyword = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const filtered = properties.filter(property=>{

        return(

            property.title.toLowerCase().includes(keyword) ||

            property.city.toLowerCase().includes(keyword) ||

            property.province.toLowerCase().includes(keyword)

        );

    });

    displayProperties(filtered);

}

// ======================================
// SEARCH BUTTONS
// ======================================

if(searchButton){

    searchButton.addEventListener("click",searchHomes);

}

if(searchProperties){

    searchProperties.addEventListener("click",searchHomes);

}

// ======================================
// ENTER KEY SEARCH
// ======================================

if(searchInput){

    searchInput.addEventListener("keyup",function(e){

        if(e.key==="Enter"){

            searchHomes();

        }

    });

}

// ======================================
// FILTERS
// ======================================

const priceFilter = document.getElementById("price");
const bedFilter = document.getElementById("beds");
const typeFilter = document.getElementById("type");
const statusFilter = document.getElementById("status");
const sortProperties = document.getElementById("sortProperties");

function filterProperties(){

    let filtered = [...properties];

    // Search keyword
    if(searchInput && searchInput.value.trim() !== ""){

        const keyword = searchInput.value.toLowerCase().trim();

        filtered = filtered.filter(property =>

            property.title.toLowerCase().includes(keyword) ||

            property.city.toLowerCase().includes(keyword) ||

            property.province.toLowerCase().includes(keyword)

        );

    }

    // Status
    if(statusFilter && statusFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.status === statusFilter.value

        );

    }

    // Property Type
    if(typeFilter && typeFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.type === typeFilter.value

        );

    }

    // Bedrooms
    if(bedFilter && bedFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.bedrooms >= Number(bedFilter.value)

        );

    }

    // Price
    if(priceFilter && priceFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.price >= Number(priceFilter.value)

        );

    }

    // Sorting
    if(sortProperties){

        switch(sortProperties.value){

            case "priceLow":

                filtered.sort((a,b)=>a.price-b.price);

                break;

            case "priceHigh":

                filtered.sort((a,b)=>b.price-a.price);

                break;

            case "beds":

                filtered.sort((a,b)=>b.bedrooms-a.bedrooms);

                break;

            case "newest":

                filtered.sort((a,b)=>b.id-a.id);

                break;

        }

    }

    displayProperties(filtered);

}

// ======================================
// FILTER EVENTS
// ======================================

if(priceFilter){

    priceFilter.addEventListener("change",filterProperties);

}

if(bedFilter){

    bedFilter.addEventListener("change",filterProperties);

}

if(typeFilter){

    typeFilter.addEventListener("change",filterProperties);

}

if(statusFilter){

    statusFilter.addEventListener("change",filterProperties);

}

if(sortProperties){

    sortProperties.addEventListener("change",filterProperties);

}

// ======================================
// VIEW PROPERTY
// ======================================

function viewProperty(id){

    localStorage.setItem("selectedProperty", id);

    window.location.href = "property.html";

}

// ======================================
// PROPERTY DETAILS PAGE
// ======================================

if(propertyDetails){

    const selectedId = Number(localStorage.getItem("selectedProperty"));

    const property = properties.find(item => item.id === selectedId);

    if(property){

        propertyDetails.innerHTML = `

        <div class="property-detail">

            <img
                src="${property.image}"
                alt="${property.title}">

            <div class="property-content">

                <span class="badge">

                    ${property.status}

                </span>

                <h1>

                    ${property.title}

                </h1>

                <div class="property-price">

                    ${formatPrice(property.price)}

                </div>

                <p class="property-location">

                    📍 ${property.city}, ${property.province}

                </p>

                <div class="property-details">

                    <span>🛏 ${property.bedrooms} Bedrooms</span>

                    <span>🛁 ${property.bathrooms} Bathrooms</span>

                    <span>🚗 ${property.garage} Garage</span>

                </div>

                <h3>

                    Description

                </h3>

                <p>

                    ${property.description}

                </p>

                <button
                    class="contact-btn">

                    Contact Agent

                </button>

            </div>

        </div>

        `;

        // ==========================
        // RELATED PROPERTIES
        // ==========================

        const relatedGrid =
            document.getElementById("relatedProperties");

        if(relatedGrid){

            const related = properties

                .filter(item=>

                    item.type===property.type &&

                    item.id!==property.id

                )

                .slice(0,3);

            related.forEach(item=>{

                relatedGrid.innerHTML +=

                    createPropertyCard(item);

            });

        }

    }else{

        propertyDetails.innerHTML =

        "<h2>Property not found.</h2>";

    }

}

// ======================================
// FAVORITES
// ======================================

function getFavorites(){

    return JSON.parse(localStorage.getItem("favorites")) || [];

}

function saveFavorites(favorites){

    localStorage.setItem(

        "favorites",

        JSON.stringify(favorites)

    );

}

function toggleFavorite(id){

    let favorites = getFavorites();

    if(favorites.includes(id)){

        favorites = favorites.filter(item => item !== id);

    }else{

        favorites.push(id);

    }

    saveFavorites(favorites);

    alert("Favorites updated!");

}

// ======================================
// LOAD FAVORITES PAGE
// ======================================

const favoritesGrid = document.getElementById("favoritesGrid");

function loadFavorites(){

    if(!favoritesGrid) return;

    const favorites = getFavorites();

    favoritesGrid.innerHTML = "";

    if(favorites.length===0){

        favoritesGrid.innerHTML=`

        <div class="empty-message">

            <h2>No favorite properties yet.</h2>

            <p>Start adding homes to your favorites.</p>

        </div>

        `;

        return;

    }

    const favoriteProperties = properties.filter(property=>

        favorites.includes(property.id)

    );

    favoriteProperties.forEach(property=>{

        favoritesGrid.innerHTML +=

            createPropertyCard(property);

    });

}

loadFavorites();

// ======================================
// PAGE INITIALIZATION
// ======================================

document.addEventListener("DOMContentLoaded",()=>{

    if(featuredGrid){

        loadFeaturedProperties();

    }

    if(propertyGrid){

        displayProperties(properties);

    }

    if(favoritesGrid){

        loadFavorites();

    }

});
