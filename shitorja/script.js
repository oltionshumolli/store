// Shporta për produktet
let cart = [];

// Funksion për të përditësuar numrin e produkteve në ikonën e shportës
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;
}

// Funksion për të shtuar një produkt në shportë
function addToCart(product) {
    cart.push(product);
    updateCartCount();
    alert(`${product.name} u shtua në shportë!`);
}

// Event listener për butonat "Add to Cart"
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        const product = {
            name: button.dataset.name,
            price: parseFloat(button.dataset.price),
        };
        addToCart(product);
    });
});

// Funksion për të shfaqur shportën dhe kërkimin e të dhënave të klientit
document.querySelector(".cart-icon").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Shporta juaj është bosh!");
    } else {
        let cartDetails = "Produkte në shportë:\n";
        let totalPrice = 0;

        cart.forEach((item, index) => {
            cartDetails += `${index + 1}. ${item.name} - $${item.price.toFixed(2)}\n`;
            totalPrice += item.price;
        });

        cartDetails += `\nTotali: $${totalPrice.toFixed(2)}`;
        alert(cartDetails);

        // Kërkimi i të dhënave të klientit
        const name = prompt("Shkruani emrin tuaj:");
        const surname = prompt("Shkruani mbiemrin tuaj:");
        const address = prompt("Shkruani adresën tuaj:");
        const phone = prompt("Shkruani numrin tuaj të telefonit:");

        if (name && surname && address && phone) {
            alert(`Faleminderit, ${name} ${surname}! Porosia juaj është regjistruar me sukses.\nAdresa: ${address}\nNumri i telefonit: ${phone}`);
            saveOrder(name, surname, address, phone, cart, totalPrice);
        } else {
            alert("Të gjitha fushat janë të detyrueshme. Ju lutem provoni përsëri.");
        }
    }
});

// Funksion për të ruajtur porosinë
function saveOrder(name, surname, address, phone, products, total) {
    const order = {
        name,
        surname,
        address,
        phone,
        products,
        total,
        date: new Date().toLocaleString(),
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Funksion për të fikur dhe ndezur bannerin e reklamave
function toggleAdBanner() {
    var adBanner = document.querySelector('.ad-banner');
    if (adBanner.style.display === "none") {
        adBanner.style.display = "block";
    } else {
        adBanner.style.display = "none";
    }
}

// Funksioni për lëvizjen e reklamave njëra pas tjetrës (slider)
let currentAdIndex = 0;
const ads = document.querySelectorAll('.ad-image');

function slideAds() {
    if (currentAdIndex >= ads.length) {
        currentAdIndex = 0;
    }
    for (let i = 0; i < ads.length; i++) {
        ads[i].style.transform = 'translateX(' + (-100 * currentAdIndex) + '%)';
    }
    currentAdIndex++;
}

setInterval(slideAds, 3000); // Kalimi i reklamave çdo 3 sekonda

// Funksion për galerinë me imazhe
const images = document.querySelectorAll('.carousel-images img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImageIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
}

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    showImage(currentImageIndex);
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    showImage(currentImageIndex);
});

// Inicializo imazhin e parë si të aktivizuar
showImage(currentImageIndex);
