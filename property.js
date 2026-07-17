const details = document.getElementById("propertyDetails");


const params = new URLSearchParams(window.location.search);

const propertyId = Number(params.get("id"));


const property = properties.find(item => item.id === propertyId);


if (property) {

    details.innerHTML = `

        <img src="${property.image}" style="width:100%; max-width:700px; border-radius:12px;">

        <h2>${property.title}</h2>

        <h3>${property.price}</h3>

        <p>${property.city}</p>

        <p>${property.bedrooms} Bedrooms</p>

        <p>${property.bathrooms} Bathrooms</p>

        <p>Type: ${property.type}</p>

    `;

}
else {

    details.innerHTML = "<h2>Property not found</h2>";

}
