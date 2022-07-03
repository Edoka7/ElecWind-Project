// OUR OFFICES Animations

const windmillsMap = document.querySelectorAll("[data-windmill]");
const cityList = document.querySelectorAll("[data-city]");
const cityAdress = document.querySelectorAll("[data-adress]");

const checkClick = (e) => {
  const target = e.target.dataset.city || e.target.dataset.windmill;

  if (e.target.className === "active") {
    return resetClass();
  }

  resetClass();

  windmillsMap.forEach((windmill) => {
    if (windmill.dataset.windmill === target) {
      windmill.classList.add("active");
    }
  });

  cityList.forEach((city) => {
    if (city.dataset.city === target) {
      city.classList.add("active");
    }
  });

  cityAdress.forEach((adress) => {
    if (adress.dataset.adress === target) {
      adress.classList.add("showAdress");
    }
  });
};

const resetClass = () => {
  windmillsMap.forEach((windmill) => {
    windmill.classList.remove("active");
  });

  cityList.forEach((city) => {
    city.classList.remove("active");
  });

  cityAdress.forEach((adress) => {
    adress.classList.remove("showAdress");
  });
};

const unClickElement = (e) => {
  if (
    e.target.dataset.city ||
    e.target.dataset.windmill ||
    e.target.dataset.adress
  )
    return;
  else resetClass();
};

document.body.addEventListener("click", (e) => unClickElement(e));

windmillsMap.forEach((windmill) => {
  windmill.addEventListener("click", (e) => checkClick(e));
});

cityList.forEach((city) => {
  city.addEventListener("click", (e) => checkClick(e));
});

// ==============================================

// Slider

const photos = document.querySelectorAll(".sliderContainer img");
const sliderNavContainer = document.querySelector(".sliderInfo__navBar");
const sliderTitle = document.querySelector(".sliderInfo__title");
const sliderParagraph = document.querySelector(".sliderInfo__paragraph");
let dots;
let activeIndex = 0;
let intervalId;

const descriptions = [
  {
    h1: "Wśród fal...",
    p: "Farma morska powstała dzięki współpracy naszej firmy z firmą Ocean Winds. Farma powstała na Morzu Bałtyckim na wysokości zachodniego wybrzeża Polski.",
  },
  {
    h1: "Mała, ale skuteczna...",
    p: "Mała farma, postawiona na jednej z działek w województwie lubuskim.",
  },
  {
    h1: "Farma dla firmy Eco Energy",
    p: "Farma, której budowę zrealizowaliśmy dla firmy Eco Energy. Farma została zbudowana w województwie mazowieckim.",
  },
  {
    h1: "Morska ale nie do końca...",
    p: "Wynik jednej z wielu naszych współprac z firmą OceanWinds. Niestandardowe rozwiązanie zbudowania elektrowni wiatrowej, morskiej na brzegu Norweskich fiordów.",
  },
  {
    h1: "Potężna farma w małopolskiem",
    p: "Farma powstała dzięki współpracy firm ElecWind oraz TurboFLY. Farma ta zajmuje powierzchnię 2 hektarów.",
  },
  {
    h1: "Nie tylko Polska wiatrakiem stoi",
    p: "Zlecenie, które realizowaliśmy na zlecenie firmy WindFarm na terenie Szwajcarii.",
  },
];

const createSliderNav = () => {
  photos.forEach((el) => {
    const sliderNav = document.createElement("div");
    sliderNav.classList.add("sliderDot");
    sliderNavContainer.appendChild(sliderNav);
  });

  dots = [...document.querySelectorAll(".sliderDot")];
};

const changeDot = (e) => {
  if (e.target.className === "sliderDot") {
    activeIndex = dots.indexOf(e.target);
    renderPhoto();
  } else return;
};

const changePhotoClass = () => {
  photos.forEach((photo) => {
    if (photo.className === "active") {
      photo.classList.remove("active");
    }
    photos[activeIndex].classList.add("active");
  });
};

const changeTexts = () => {
  sliderTitle.textContent = descriptions[activeIndex].h1;
  sliderParagraph.textContent = descriptions[activeIndex].p;
};

const renderPhoto = () => {
  changePhotoClass();
  changeTexts();

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  dots[activeIndex].classList.add("active");

  clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (activeIndex >= photos.length - 1) {
      activeIndex = 0;
    } else {
      activeIndex++;
    }

    renderPhoto();
  }, 5000);
};

sliderNavContainer.addEventListener("click", (e) => changeDot(e));

createSliderNav();

renderPhoto();

// ==============================================

// Slider

const showElements = document.querySelectorAll("[data-showelement]");

console.log(showElements);

const fadeIn = () => {
  showElements.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= window.innerHeight / 1.1) {
      showElements[index].dataset.showelement = "";
      showElements[index].classList.add("showElement");
    }
  });
};

window.addEventListener("scroll", fadeIn);

fadeIn();

// ==============================================

// Mobile menu nav bars

const menu = document.querySelector(".header__nav");
const menuBars = document.querySelector(".header__nav-mobileBars");
const menuBg = document.querySelector(".header__nav-mobileBg");

menu.addEventListener("click", () => {
  menuBars.classList.toggle("activeMenu");
  menuBg.classList.toggle("activeMenu");
});

// ==============================================
