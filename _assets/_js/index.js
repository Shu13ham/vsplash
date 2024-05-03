document.addEventListener("DOMContentLoaded", function () {
  //Hamburger icon for mobile
  const hamburgerIcon = document.querySelector(".hamburger-btn");
  const crossIcon = document.querySelector(".close-icon");
  const navbarMobile = document.querySelector(".navbar-mobile-wrapper");

  hamburgerIcon.addEventListener("click", function () {
    hamburgerIcon.style.display == "none";
    navbarMobile.style.display = "block";
  });

  crossIcon.addEventListener("click", function () {
    hamburgerIcon.style.display == "block";
    navbarMobile.style.display = "none";
  });

  //Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll(".testimonial.slide");
  const totalSlides = slides.length;
  const slideWidth = slides[0].clientWidth;
  let startX = 0;
  let endX = 0;

  //One dot for each slide
  slides.forEach((slide, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      showSlide(index);
    });
    document.querySelector(".counter").appendChild(dot);
  });

  //Show slide by index
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        document.querySelector(".counter").children[i].classList.add("active");
      } else {
        document.querySelector(".counter").children[i].classList.remove("active");
      }
    });
    moveSlide(index);
  }

  //use transform for slides
  function moveSlide(index) {
    const slideOffset = -index * slideWidth;
    document.querySelector(".slides").style.transform = `translateX(${slideOffset}px)`;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  document.querySelector(".prev").addEventListener("click", prevSlide);
  document.querySelector(".next").addEventListener("click", nextSlide);

  //Drag functionality for touch screens
  function startDrag(event) {
    startX = event.touches[0].clientX;
  }

  function drag(event) {
    endX = event.touches[0].clientX;
  }

  function endDrag() {
    const sensitivity = 50; // Adjust this value to control the sensitivity of the drag
    const dragDistance = startX - endX;

    if (dragDistance > sensitivity) {
      nextSlide(); // Move to next slide
    } else if (dragDistance < -sensitivity) {
      prevSlide(); // Move to previous slide
    }
  }

  document.querySelector(".slides").addEventListener("touchstart", startDrag);
  document.querySelector(".slides").addEventListener("touchmove", drag);
  document.querySelector(".slides").addEventListener("touchend", endDrag);

  //Video Player Section
  document.querySelector("#play-btn").addEventListener("click", function () {
    document.querySelector("#yt-popup-overlay").style.display = "block";
    var iframe = document.querySelector("#youtube-video");
    iframe.src = "https://www.youtube.com/embed/qcSKba5NVkw?autoplay=1";
  });
  
  document.querySelector("#yt-popup-overlay").addEventListener("click", function () {
    document.querySelector("#yt-popup-overlay").style.display = "none";
    var iframe = document.querySelector("#youtube-video");
    iframe.src = "";
  });

  //Hover effect on the cards
  document.querySelectorAll(".info-card-router").forEach((card) => {
    card.addEventListener("mouseover", (event) => {
      event.currentTarget.querySelector(".on-hover-para").classList.add("d-block");
      event.currentTarget.querySelector(".on-hover-para").classList.remove("d-none");
      event.currentTarget.querySelector(".info-card-router .info-icon").classList.add("d-block");
      event.currentTarget.querySelector(".info-card-router .info-icon").classList.remove("d-none");
    });

    card.addEventListener("mouseout", (event) => {
      event.currentTarget.querySelector(".on-hover-para").classList.add("d-none");
      event.currentTarget.querySelector(".on-hover-para").classList.remove("d-block");
      event.currentTarget.querySelector(".info-card-router .info-icon").classList.add("d-none");
      event.currentTarget.querySelector(".info-card-router .info-icon").classList.remove("d-block");
    });
  });

  document.querySelectorAll(".banner-form form input").forEach((inputField) => {
    inputField.addEventListener("focus", () => {
      if (document.querySelector(`label[for="${inputField.id}"]`)) {
        document
          .querySelector(`label[for="${inputField.id}"]`)
          .classList.add("focused");
      }
      const dropdown = inputField.nextElementSibling;
      if (document.querySelector(`label[for="${dropdown.id}"]`)) {
        document
          .querySelector(`label[for="${dropdown.id}"]`)
          .classList.add("focused");
      }
    });

    inputField.addEventListener("blur", () => {
      if (document.querySelector(`label[for="${inputField.id}"]`)) {
        document
          .querySelector(`label[for="${inputField.id}"]`)
          .classList.remove("focused");
      }
      const dropdown = inputField.nextElementSibling;
      if (document.querySelector(`label[for="${dropdown.id}"]`)) {
        document
          .querySelector(`label[for="${dropdown.id}"]`)
          .classList.remove("focused");
      }
    });
  });

  //For styling the label when user inputs text in input elements
  function validateInput() {
    var inputs = document.querySelectorAll(".form-group input");
    inputs.forEach(function(input) {
        var label = document.querySelector("label[for='" + input.id + "']");
        if (input.value.trim() === "") {
            label.classList.remove("text-added");
        } else {
            label.classList.add("text-added");
        }
    });
  }

  document.querySelectorAll(".form-group input").forEach(function(input) {
    input.addEventListener("input", validateInput);
  });

});

//Form validation and label styling for errors
function validateForm(event) {
  var form = document.getElementById("my-form");
  var elements = form.elements;
  var isValid = true;

  for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.tagName === "INPUT" || element.tagName === "SELECT") {
          if (element.value.trim() === "") {
              isValid = false;
              element.classList.add("invalid");
              var errorPopup = element.nextElementSibling;
              errorPopup.classList.remove("d-none"); 
              var label = document.querySelector("label[for='" + element.id + "']");
              if (label) {
                label.classList.add("invalid");
              }
          } else {
              element.classList.remove("invalid");
              var errorPopup = element.nextElementSibling;
              errorPopup.classList.add("d-none"); 
              var label = document.querySelector("label[for='" + element.id + "']");
              if (label) {
                label.classList.remove("invalid");
              }
          }
      }
  }

  if (!isValid) {
      event.preventDefault();
  }
}

document.getElementById("my-form").addEventListener("submit", function(event) {
  validateForm(event);
});