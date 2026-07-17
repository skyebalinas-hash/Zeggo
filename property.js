const details = document.getElementById("propertyDetails");


const params = new URLSearchParams(window.location.search);

const propertyId = Number(params.get("id"));


const property = properties.find(item => item.id === propertyId);


if (property) {

    details.innerHTML = `

        <div class="property-detail-card">

            <img class="detail-image" src="${property.image}" alt="${property.title}">


            <h2>${property.title}</h2>


            <h3 class="detail-price">${property.price}</h3>


            <p class="detail-location">
                📍 ${property.city}
            </p>


            <div class="detail-info">

                <p>
                    🛏 ${property.bedrooms} Bedrooms
                </p>

                <p>
                    🚿 ${property.bathrooms} Bathrooms
                </p>

                <p>
                    🏠 ${property.type}
                </p>

            </div>


            <button class="favorite-button" onclick="addFavorite(${property.id})">
                ♡ Save Property
            </button>


        </div>

    `;

}
else {

    details.innerHTML = "<h2>Property not found</h2>";

}



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
