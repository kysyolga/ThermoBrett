document.addEventListener('DOMContentLoaded', function(){
    // клик на номера страниц, пагинация
    if(document.getElementById("pagination")) {
        let pagin = document.getElementById("pagination");
        pagin.addEventListener("click", paginationMove, event);
        function paginationMove(e) {
            let pagPage = pagin.children;
            let event = e.target;
            if(event.id == "left" ) {
                for(let i = 2; i < pagPage.length-1; i++) {
                    if(pagPage[i].classList.contains('active')) {
                        for(let k = 2; k < pagPage.length; k++) {
                            pagPage[k].classList.remove("active");
                        }
                        pagPage[i-1].classList.toggle("active");
                        return;
                    }
                }
            }
            if(event.id == "right") {
                for(let i = 1; i < pagPage.length-2; i++) {
                    if(pagPage[i].classList.contains('active')) {
                        for(let k = 1; k < pagPage.length; k++) {
                            pagPage[k].classList.remove("active");
                        }
                        pagPage[i+1].classList.toggle("active");
                        return;
                    }
                }
            }
            if(event.tagName == "SPAN") {
                for(let i = 0; i < pagPage.length; i++) {
                    pagPage[i].classList.remove("active");
                }
                event.classList.toggle("active");
            }
        } 
    }
    

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
