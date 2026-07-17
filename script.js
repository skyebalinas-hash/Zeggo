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
        `;

        propertyList.appendChild(card);

    });
}


displayProperties(properties);



searchButton.addEventListener("click", function() {

    const searchText = searchInput.value.toLowerCase();


    const filteredProperties = properties.filter(property =>

        property.city.toLowerCase().includes(searchText) ||
        property.title.toLowerCase().includes(searchText)

    );


    displayProperties(filteredProperties);

});
