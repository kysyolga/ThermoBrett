document.addEventListener("DOMContentLoaded", function() {
    // выбор количества
    let minus = document.getElementsByClassName("price_quantity_min")[0];
    let num = document.getElementsByClassName("price_quantity_num")[0];
    let plus = document.getElementsByClassName("price_quantity_max")[0];
    minus.addEventListener("click", function() {
        if(num.value > 1) {
            num.value--;
        }
        result.innerHTML = (+num.value)*(+money.innerHTML);
    });
    plus.addEventListener("click", function() {
        num.value++;
        result.innerHTML = (+num.value)*(+money.innerHTML);
    });
    num.addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
          if(num.value <= 0) {
            num.value = 1;
          }
          result.innerHTML = (+num.value)*(+money.innerHTML);
        }
      });
    // метры
    let select = document.getElementsByClassName("price_unit")[0];
    var money = document.getElementsByClassName("product-price_val-money")[0];
    var result = document.getElementsByClassName("product-sum-price")[0].children[0];
    select.addEventListener("click", function(e) {
        e.target = e;
        var optSelect =  select.options[select.selectedIndex].value;
        document.getElementsByClassName("product-price_val-span")[0].innerHTML = optSelect;
        if(optSelect == "m3") {
            money.innerHTML = 1800;
        } else if(optSelect == "m2") {
            money.innerHTML = 1200;
        } else if(optSelect == "m") {
            money.innerHTML = 800;
        }
        result.innerHTML = (+num.value)*(+money.innerHTML);
    });
    // Sliders 
    var height = document.getElementById("slider-container").offsetHeight/4 - 10;
    var slider = document.getElementsByClassName("sliders")[0];
    for(var i = 0; i < slider.children.length; i++) {
        slider.children[i].style.height = height + "px";
    }
    slider.style.height = slider.children.length * height-25 + "px";
    // position
    slider.style.top = -height - 20 + "px";
    slider.insertBefore(slider.children[slider.children.length-1], slider.children[0]);
    let count = 2;
    // move sliders format
    function nextSlide() {
        slider.style.marginTop = -height;
        (function () {
            slider.appendChild(slider.children[0]);
            for (let i = 0; i < slider.children.length; i++) {
                if(i == 2) {
                    slider.children[i].classList.add('active');
                    createPhoto(i);
                } else {
                    slider.children[i].classList.remove('active');
                }
            }
            slider.style.marginTop = 0;
        })();
    }
    // move slide prew
    function prevSlide() {
        slider.style.marginTop = height;
        (function () {
            slider.insertBefore(slider.children[slider.children.length-1], slider.children[0]);
            for (let i = 0; i < slider.children.length; i++) {
                if(i == 2) {
                    slider.children[i].classList.add('active');
                    createPhoto(i);
                } else {
                    slider.children[i].classList.remove('active');
                }
            }
            slider.style.marginTop = 0;
        })();
    }
     // add Photo to Box
    var imgBox = document.getElementsByClassName("product-present_photo")[0];
    var img = document.createElement("img");
    function createPhoto(i) {
        while(imgBox.firstChild) {
            imgBox.removeChild(imgBox.firstChild);
        }
        img.classList.add("photo");
        img.setAttribute("src", slider.children[i].children[0].getAttribute("src"));
        imgBox.appendChild(img);
    }
    createPhoto(2);
    function createPhotoClick(event) {
        while(imgBox.firstChild) {
            imgBox.removeChild(imgBox.firstChild);
        }
        img.classList.add("photo");
        img.setAttribute("src", event.getAttribute("src"));
        imgBox.appendChild(img);
        let li = event.parentNode;
        for(let i = 0; i < li.parentNode.children.length; i++) {
            li.parentNode.children[i].classList.remove('active');
        }
        li.classList.add('active');
    } 
    // controls
    document.getElementsByClassName("next")[0].addEventListener("click", nextSlide);
    document.getElementsByClassName("prev")[0].addEventListener("click", prevSlide);
    slider.addEventListener("click", function(event) {
        let e = event.target;
        if(e.tagName == "IMG") {
            createPhotoClick(e);            
        } else if(e.tagName == "LI") {
            console.log("li");
            createPhotoClick(e.children[0]); 
        } else {
            return;
        }
    });

    // Tabs
    let tab = function() {
        let tabNav = document.querySelectorAll(".tabs-nav__item");
        let tabContent = document.querySelectorAll(".tabs__content__item");
        let tabName;

        tabNav.forEach(function(item) {
            item.addEventListener("click", selectTabNav);
        });
        function selectTabNav() {
            tabNav.forEach(function(item) {
                item.classList.remove("is-active");
            });
            this.classList.add("is-active");
            tabName = this.getAttribute("data-tab-name");
            selectTabContent(tabName);
        }
        function selectTabContent(tabName) {
            tabContent.forEach(function(item) {
                item.classList.contains(tabName)? item.classList.add("is-active"):item.classList.remove("is-active");
            });
        }
    }
    tab();

    // бургер меню
let burgerMenuIcon = document.getElementsByClassName("burger-menu__icon");
let burgerMenuNav = document.getElementsByClassName("burger-menu__nav");

for(let i = 0; i < burgerMenuIcon.length; i++) {
    burgerMenuIcon[i].addEventListener("click", function() {
        // e.preventDefault();
        burgerMenuNav[i].classList.toggle("active-burger");
        burgerMenuIcon[i].classList.toggle("is-active");
    });
}

});