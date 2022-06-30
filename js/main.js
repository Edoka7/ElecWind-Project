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

  document.body.addEventListener("click", (e) => {
    if (
      e.target.dataset.city ||
      e.target.dataset.windmill ||
      e.target.dataset.adress
    )
      return;
    else resetClass();
  });

  windmillsMap.forEach((windmill) => {
    windmill.addEventListener("click", (e) => checkClick(e));
  });

  cityList.forEach((city) => {
    city.addEventListener("click", (e) => checkClick(e));
  });

  // ==============================================
});
