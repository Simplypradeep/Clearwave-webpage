const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const cards = document.querySelectorAll(".phone__card");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
const pricingToggle = document.getElementById("pricingToggle");

let zoom = 1;

const positions = [
    {
        pos: "left2",
        x: -474,
        rotate: 45,
        scale: 0.64,
        opacity: 0.55
    },
    {
        pos: "left1",
        x: -266,
        rotate: 28,
        scale: 0.82,
        opacity: 1
    },
    {
        pos: "center",
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1
    },
    {
        pos: "right1",
        x: 266,
        rotate: -28,
        scale: 0.82,
        opacity: 1
    },
    {
        pos: "right2",
        x: 474,
        rotate: -45,
        scale: 0.64,
        opacity: 0.55
    }
];

function renderCards() {

    cards.forEach((card, index) => {

        const p = positions[index];

        card.dataset.pos = p.pos;

        card.style.opacity = p.opacity;

        card.style.transform = `
            translateX(${p.x}px)
            rotateY(${p.rotate}deg)
            scale(${p.scale * zoom})
        `;
    });

}

renderCards();

zoomIn.addEventListener("click", () => {

    if (zoom < 1.15) {

        zoom += 0.05;
        renderCards();

    }

});

zoomOut.addEventListener("click", () => {

    if (zoom > 0.9) {

        zoom -= 0.05;
        renderCards();

    }

});

setInterval(() => {

    const last = positions.pop();

    positions.unshift(last);

    renderCards();

}, 3000);

prevBtn.addEventListener("click", () => {

    const first = positions.shift();

    positions.push(first);

    renderCards();

});

nextBtn.addEventListener("click", () => {

    const last = positions.pop();

    positions.unshift(last);

    renderCards();

});

const prices = document.querySelectorAll(
    ".price__amount, .price__amount--feature"
);

const annualTexts = document.querySelectorAll(".price__annual");

let isAnnual = false;

pricingToggle.addEventListener("click", () => {

    isAnnual = !isAnnual;
    
    pricingToggle.classList.toggle("active", isAnnual);

    if(isAnnual) {

        prices[0].textContent = "13";
        prices[1].textContent = "39";
        prices[2].textContent = "98";

        annualTexts[0].textContent = "$156 billed annually"
        annualTexts[1].textContent = "$468 billed annually"
        annualTexts[2].textContent = "$1175 billed annually"

    } else {

        prices[0].textContent = "20";
        prices[1].textContent = "60";
        prices[2].textContent = "150";

        annualTexts[0].textContent = "";
        annualTexts[1].textContent = "";
        annualTexts[2].textContent = "";
    }
});

const faqItems = document.querySelectorAll(".faq__items");

faqItems.forEach((item) => {

    item.addEventListener("click", () => {

        item.classList.toggle("active");
    });
});

const faqToggleAll = document.getElementById("faqToggleAll");

faqToggleAll.addEventListener("click", () => {

    const allExpanded = [...faqItems].every((item) => {
        return item.classList.contains("active");
    });

    faqItems.forEach((item) => {

        if (allExpanded) {
            item.classList.remove("active");
        } else {
            item.classList.add("active");
        }

    });

    if (allExpanded) {
        faqToggleAll.innerHTML = `
            <span>+</span>
            Expand all
        `;
    } else {
        faqToggleAll.innerHTML = `
            <span>−</span>
            Collapse all
        `;
    }

});

