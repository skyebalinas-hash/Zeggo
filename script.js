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

                <button class="view-btn">
                    View Property
                </button>

            </div>

        </div>

        `;

    });

}

displayProperties(properties);
