document.addEventListener("DOMContentLoaded", () => {
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

  cityList.forEach((city) => {
    city.addEventListener("focus", (e) => {
      city.addEventListener("keydown", (key) => {
        switch (key.keyCode) {
          case 13:
            checkClick(e);
            break;
          default:
        }
      });
    });
  });

  // ==============================================

  // Slider

  const checkSlider = document.querySelector(".realizations");

  if (checkSlider) {
    const photos = document.querySelectorAll(".sliderContainer img");
    const sliderNavContainer = document.querySelector(".sliderInfo__navBar");
    const sliderTitle = document.querySelector(".sliderInfo__title");
    const sliderParagraph = document.querySelector(".sliderInfo__paragraph");
    let dots;
    let activeIndex = 0;
    let intervalId;

    const descriptions = [
      {
        h1: "W??r??d fal...",
        p: "Farma morska powsta??a dzi??ki wsp????pracy naszej firmy z firm?? Ocean Winds. Farma powsta??a na Morzu Ba??tyckim na wysoko??ci zachodniego wybrze??a Polski.",
      },
      {
        h1: "Ma??a, ale skuteczna...",
        p: "Ma??a farma, postawiona na jednej z dzia??ek w wojew??dztwie lubuskim.",
      },
      {
        h1: "Farma dla firmy Eco Energy",
        p: "Farma, kt??rej budow?? zrealizowali??my dla firmy Eco Energy. Farma zosta??a zbudowana w wojew??dztwie mazowieckim.",
      },
      {
        h1: "Morska ale nie do ko??ca...",
        p: "Wynik jednej z wielu naszych wsp????prac z firm?? OceanWinds. Niestandardowe rozwi??zanie zbudowania elektrowni wiatrowej, morskiej na brzegu Norweskich fiord??w.",
      },
      {
        h1: "Pot????na farma w ma??opolskiem",
        p: "Farma powsta??a dzi??ki wsp????pracy firm ElecWind oraz TurboFLY. Farma ta zajmuje powierzchni?? 2 hektar??w.",
      },
      {
        h1: "Nie tylko Polska wiatrakiem stoi",
        p: "Zlecenie, kt??re realizowali??my na zlecenie firmy WindFarm na terenie Szwajcarii.",
      },
    ];

    const sliderKeyControl = () => {
      if (
        checkSlider.getBoundingClientRect().bottom <= window.innerHeight ||
        checkSlider.getBoundingClientRect().top <= window.innerHeight
      ) {
        window.addEventListener("keydown", (e) => {
          switch (e.keyCode) {
            case 37:
              if (activeIndex <= 0) {
                activeIndex = photos.length - 1;
              } else {
                activeIndex--;
              }

              renderPhoto();
              break;

            case 39:
              if (activeIndex >= photos.length - 1) {
                activeIndex = 0;
              } else {
                activeIndex++;
              }

              renderPhoto();
              break;

            default:
              break;
          }
          e.stopImmediatePropagation();
        });
      }
    };

    window.addEventListener("scroll", sliderKeyControl);

    sliderKeyControl();

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
  }

  // ==============================================

  // Show sections

  const showSections = document.querySelectorAll("[data-showsection]");

  let indexOfSections = showSections.length;

  const fadeIn = () => {
    showSections.forEach((section, index) => {
      if (indexOfSections > 0) {
        if (section.getBoundingClientRect().top <= window.innerHeight / 1.2) {
          if (section.dataset.showsection === "hide") {
            indexOfSections--;
          }
          showSections[index].dataset.showsection = "";
          showSections[index].classList.add("showElement");
        }
      } else {
        window.removeEventListener("scroll", fadeIn);
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
});
