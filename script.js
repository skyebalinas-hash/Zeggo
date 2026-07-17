const propertyList = document.getElementById("propertyList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");


function displayProperties(propertyArray) {

    propertyList.innerHTML = "";

    propertyArray.forEach(property => {

        const card = document.createElement("div");

        card.className = "property-card";

        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">

            <h3>${property.title}</h3>

            <p>${property.city}</p>

            <p>${property.price}</p>

            <p>${property.bedrooms} Bedrooms | ${property.bathrooms} Bathrooms</p>

            <p>${property.type}</p>

            <button class="favorite-button" onclick="addFavorite(${property.id})">
                ♡ Save
            </button>

            <a href="property.html?id=${property.id}">
                <button class="view-button">
                    View Property
                </button>
            </a>
        `;

        propertyList.appendChild(card);

    });

}


// Show all properties when page loads
displayProperties(properties);


// Search system
if (searchButton) {

    searchButton.addEventListener("click", function() {

        const searchText = searchInput.value.toLowerCase();


        const filteredProperties = properties.filter(property =>

            property.city.toLowerCase().includes(searchText) ||
            property.title.toLowerCase().includes(searchText)

        );


        displayProperties(filteredProperties);

    });

}


// Save favorite property
function addFavorite(id) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


    if (!favorites.includes(id)) {

        favorites.push(id);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert("Property saved!");

    } else {

        alert("Property already saved!");

    }

}
