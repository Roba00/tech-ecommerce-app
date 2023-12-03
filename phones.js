fetch("./data.json")
    .then(response => response.json())
    .then(myPhones => loadPhones(myPhones));

function loadPhones(myPhones) {
    var phoneImg1 = document.getElementById("phoneImg1");
    var phoneImg2 = document.getElementById("phoneImg2");
    var phoneImg3 = document.getElementById("phoneImg3");
    var phoneImg4 = document.getElementById("phoneImg4");
    var phoneDesc1 = document.getElementById("phoneDesc1");
    var phoneDesc2 = document.getElementById("phoneDesc2");
    var phoneDesc3 = document.getElementById("phoneDesc3");
    var phoneDesc4 = document.getElementById("phoneDesc4");
    var phonePrice1 = document.getElementById("phonePrice1");
    var phonePrice2 = document.getElementById("phonePrice2");
    var phonePrice3 = document.getElementById("phonePrice3");
    var phonePrice4 = document.getElementById("phonePrice4");

    for (var i = 0; i < myPhones.phones.length; i++){
        let productId = myPhones.phones[i].productId;
        let brand = myPhones.phones[i].brand;
        let price = myPhones.phones[i].price;
        let image = myPhones.phones[i].image;
        let text = myPhones.phones[i].text;
        let phoneImg = document.createElement("div");
        phoneImg.innerHTML = `<img src=${image} width="50%" height="50%" class="catalog-img"/>`;
        let phoneDesc = document.createElement("p");
        phoneDesc.innerHTML = `<p class="lead">${text}</p>`;
        let phonePrice = document.createElement("h3");
        phonePrice.innerHTML = `<h3>$${price}</h3>`;

        if (myPhones.phones[i].productId === "1") {
            phoneImg1.appendChild(phoneImg);
            phoneDesc1.appendChild(phoneDesc);
            phonePrice1.appendChild(phonePrice);
        } else if (myPhones.phones[i].productId === "2") {
            phoneImg2.appendChild(phoneImg);
            phoneDesc2.appendChild(phoneDesc);
            phonePrice2.appendChild(phonePrice);
        } else if (myPhones.phones[i].productId === "3") {
            phoneImg3.appendChild(phoneImg);
            phoneDesc3.appendChild(phoneDesc);
            phonePrice3.appendChild(phonePrice);
        } else if (myPhones.phones[i].productId === "4") {
            phoneImg4.appendChild(phoneImg);
            phoneDesc4.appendChild(phoneDesc);
            phonePrice4.appendChild(phonePrice);
        }
    }
}