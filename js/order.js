document.addEventListener("DOMContentLoaded", function() {
  var element = document.getElementsByClassName("order-slide__btn");
  var orderBox = document.getElementsByClassName("order-box");
  var orderCheckBoxDelete = document.getElementsByClassName("order-check__box-delete");
  var arrCount = [];
  let orderBoxCard = document.getElementsByClassName("order-box__Cardpay")[0];
  let orderBoxPay = document.getElementsByClassName("order-box__pay-card")[0]; 
  
  // берем полную высоту внутреннего элемента
  function getAbsoluteHeight(el) {
    el = (typeof el === 'string') ? document.querySelector(el) : el; 
    var styles = window.getComputedStyle(el);
    var margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return Math.ceil(el.offsetHeight + margin);
  }
  // просчитываем высоту слайда
  function setSlideHeight() {
    for(var k = 0; k < orderBox.length; k++) {
      var count = 0;
      for(var i = 0; i < orderBox[k].children.length; i++) {
        count += getAbsoluteHeight(orderBox[k].children[i]);
      }
      orderBox[k].style.height = count + "px";
      arrCount.push(count);
    }
  }
  setSlideHeight();  
  // работа слайда при клике
  for(let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function() {
      if(orderBox[i].classList.contains("active-order")) {
        orderBox[i].style.height = 0;
        orderBox[i].classList.toggle("active-order");
      } else {
        orderBox[i].style.height = arrCount[i] + "px";
        orderBox[i].classList.toggle("active-order");
      }
      if(element[i].children[0].getAttribute("src") == "img/svg/slideTop.svg") {
        element[i].children[0].setAttribute("src", "img/svg/slideDown.svg");
      } else {
        element[i].children[0].setAttribute("src", "img/svg/slideTop.svg");
      }
    });
  };
  // работа слайда оплаты картой
  orderBoxCard.addEventListener("click", function() {
    if(orderBoxPay.classList.contains("active-order")) {
      orderBoxPay.style.height = 0;
      orderBoxPay.classList.toggle("active-order");
      orderBox[2].style.height = 115 + "px";
    } else {
      orderBoxPay.style.height = 630 + "px";
      orderBoxPay.classList.toggle("active-order");
      orderBox[2].style.height = orderBoxPay.offsetHeight + "px";
    }
  });
  // удаление товара
  function deleteProduct() {
    for(let i = 0; i < orderCheckBoxDelete.length; i++) {
      orderCheckBoxDelete[i].addEventListener("click", function() {
        arrCount = [];
        this.parentNode.parentNode.parentNode.remove();
        arrCount.pop();
        setSlideHeight();
      });
    }
  }
  deleteProduct();
  // выбор количества
  let minusVolume = document.getElementsByClassName("price_quantity_min");
  let minusTracks = document.getElementsByClassName("number-trucks_min");
  let numVolume = document.getElementsByClassName("price_quantity_num");
  let numTracks = document.getElementsByClassName("number-trucks_num");
  let plusVolume = document.getElementsByClassName("price_quantity_max");
  let plusTracks = document.getElementsByClassName("number-trucks_max");
  let result = document.getElementsByClassName("order-check__box-total-p");
  let select = document.getElementsByClassName("price_unit");
  let money = document.getElementsByClassName("order-check__box-price-money");

  function setQuantity (minus, plus, num, num2) {
    for(let i = 0; i < minus.length; i++) {
      minus[i].addEventListener("click", function() {
        if(num[i].value > 1) {
          num[i].value--;
        }
        result[i].innerHTML = (+num[i].value)*(+money[i].innerHTML)*(+num2[i].value);
      });
      plus[i].addEventListener("click", function() {
          num[i].value++;
          result[i].innerHTML = (+num[i].value)*(+money[i].innerHTML)*(+num2[i].value);
      });
      num[i].addEventListener("keydown", function(e) {
        if (e.keyCode === 13) {
          if(num[i].value <= 0) {
            num[i].value = 1;
          }
          result[i].innerHTML = (+num[i].value)*(+money[i].innerHTML)*(+num2[i].value);
        }
      });
    }
  }
  setQuantity (minusVolume, plusVolume, numVolume, numTracks);
  setQuantity (minusTracks, plusTracks, numTracks, numVolume);

  
  // метры
  for(let i = 0; i < select.length; i++) {
    select[i].addEventListener("click", function(e) {
      e.target = e;
      var optSelect =  select[i].options[select[i].selectedIndex].value;
      console.log(optSelect);
      document.querySelectorAll(".order-check__box-price .power")[i].innerHTML = optSelect;
      if(optSelect == "m3") {
          money[i].innerHTML = 1800;
      } else if(optSelect == "m2") {
          money[i].innerHTML = 1200;
      } else if(optSelect == "m") {
          money[i].innerHTML = 800;
      }
      result[i].innerHTML = (+numVolume[i].value)*(+money[i].innerHTML)*(+numTracks[i].value);
    });
  }
// tabs
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
  // отправить счет фактуру
  let orderBoxBtn = document.getElementsByClassName("order-box__btn")[0];
  let popupInvoice = document.getElementById("popup-invoice");
  let popupBtn = document.getElementsByClassName("popupBtn")[0];
  orderBoxBtn.addEventListener("click", function() {
    popupInvoice.style.display = "block";
  });
  popupBtn.addEventListener("click", function() {
    popupInvoice.style.display = "none";
  });

  // бургер меню
  // let burgerMenuIcon = document.getElementsByClassName("burger-menu__icon");
  //   let burgerMenuNav = document.getElementsByClassName("burger-menu__nav");
  // for(let i = 0; i < burgerMenuIcon.length; i++) {
  //     burgerMenuIcon[i].addEventListener("click", function() {
  //         burgerMenuNav[i].classList.toggle("active-burger");
  //     });
  // }


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
