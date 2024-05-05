document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const aside = document.querySelector("aside");
  const filterWrapper = document.querySelector(".filter-wrapper");
  const mainSection = document.querySelector(".main-section");
  var hamburgerOpen = false;

  hamburger.addEventListener('click', function(){
    if(!hamburgerOpen){
      aside.classList.add("hamburger-clicked");
      filterWrapper.style.left = "28px";
      mainSection.style.marginLeft = "278px";
      hamburgerOpen = true;
    }
    else{
      aside.classList.remove("hamburger-clicked");
      filterWrapper.style.left = "100px";
      mainSection.style.marginLeft = "350px";
      hamburgerOpen = false;
    }
    
  })
});
