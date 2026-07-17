const favoriteList = document.getElementById("favoriteList");


const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];


const favoriteProperties = properties.filter(property =>
    savedFavorites.includes(property.id)
);


if (favoriteProperties.length === 0) {

    favoriteList.innerHTML = "<p>No saved properties yet.</p>";

} else {

    favoriteProperties.forEach(property => {

        const card = document.createElement("div");

        card.className = "property-card";


        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">

            <h3>${property.title}</h3>

            <p>${property.city}</p>

            <p>${property.price}</p>

            <p>${property.bedrooms} Bedrooms | ${property.bathrooms} Bathrooms</p>

            <a href="property.html?id=${property.id}">
                <button class="view-button">View Property</button>
            </a>
        `;


        favoriteList.appendChild(card);

    });

}
