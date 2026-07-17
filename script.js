// ===============================
// LOAD PROPERTIES
// ===============================

const propertyGrid = document.getElementById("propertyGrid");

function formatPrice(price) {
    return "₱" + price.toLocaleString();
}

function displayProperties(list) {

    if (!propertyGrid) return;

    propertyGrid.innerHTML = "";

    if (list.length === 0) {

        propertyGrid.innerHTML = `
            <h2>No properties found.</h2>
        `;

        return;
    }

    list.forEach(property => {

        propertyGrid.innerHTML += `

        <div class="property-card">

            <img src="${property.image}" alt="${property.title}">

            <div class="property-info">

                <div class="property-price">
                    ${formatPrice(property.price)}
                </div>

                <div class="property-title">
                    ${property.title}
                </div>

                <div class="property-location">
                    📍 ${property.city}, ${property.province}
                </div>

                <div class="property-details">

                    <span>🛏 ${property.bedrooms} Beds</span>

                    <span>🛁 ${property.bathrooms} Baths</span>

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

    });

}

displayProperties(properties);

// ===============================
// SEARCH FUNCTION
// ===============================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchProperties = document.getElementById("searchProperties");

function searchHomes() {

    const keyword = searchInput.value.toLowerCase().trim();

    const results = properties.filter(property => {

        return (
            property.city.toLowerCase().includes(keyword) ||
            property.province.toLowerCase().includes(keyword) ||
            property.title.toLowerCase().includes(keyword)
        );

    });

    displayProperties(results);

}

// Homepage Search Button
if (searchButton) {

    searchButton.addEventListener("click", searchHomes);

}

// Properties Page Search Button
if (searchProperties) {

    searchProperties.addEventListener("click", searchHomes);

}

// Press Enter to Search
if (searchInput) {

    searchInput.addEventListener("keyup", function(e){

        if(e.key === "Enter"){

            searchHomes();

        }

    });

}

// ===============================
// ADVANCED FILTERS
// ===============================

const priceFilter = document.getElementById("price");
const bedFilter = document.getElementById("beds");
const typeFilter = document.getElementById("type");
const statusFilter = document.getElementById("status");

function filterProperties(){

    let filtered = [...properties];

    // Search
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

    if(keyword){

        filtered = filtered.filter(property =>

            property.city.toLowerCase().includes(keyword) ||

            property.province.toLowerCase().includes(keyword) ||

            property.title.toLowerCase().includes(keyword)

        );

    }

    // Price

    if(priceFilter && priceFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.price >= Number(priceFilter.value)

        );

    }

    // Beds

    if(bedFilter && bedFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.bedrooms >= Number(bedFilter.value)

        );

    }

    // Property Type

    if(typeFilter && typeFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.type === typeFilter.value

        );

    }

    // Status

    if(statusFilter && statusFilter.value !== ""){

        filtered = filtered.filter(property =>

            property.status === statusFilter.value

        );

    }

    displayProperties(filtered);

}

// Replace Search button action

if(searchButton){

    searchButton.onclick = filterProperties;

}

if(searchProperties){

    searchProperties.onclick = filterProperties;

}

// Live filtering

if(priceFilter){

    priceFilter.addEventListener("change", filterProperties);

}

if(bedFilter){

    bedFilter.addEventListener("change", filterProperties);

}

if(typeFilter){

    typeFilter.addEventListener("change", filterProperties);

}

if(statusFilter){

    statusFilter.addEventListener("change", filterProperties);

}

// ===============================
// VIEW PROPERTY
// ===============================

function viewProperty(id){

    localStorage.setItem("selectedProperty", id);

    window.location.href = "property.html";

}
