//collapsing menu left
function collapseMenu(){

   let collapseElement = document.getElementsByClassName("collapseElement");
   let side = document.getElementById("side");
   let main = document.getElementById("main");
   let navigationMenu = document.getElementById("navigation-menu");
   let sideMenu = document.getElementById("side-menu");
   let sideMenuItem = document.getElementsByClassName("side-menu-item");
   let button = document.getElementById("menu-collapse-btn");
   let userIcon = document.getElementsByClassName("fa-user");
   let sideMenuLink = document.getElementsByClassName("side-menu-link");

    if(button.classList.contains('collapsed')){
       //open menu
     
       side.style.flex = "1";
       navigationMenu.style.paddingLeft = "10px";
       main.style.flex ="8";
       //remove class and show elements
       for(i=0; i<collapseElement.length; i++){
         collapseElement[i].classList.remove('hide');
         collapseElement[i].classList.add('show');
       }
       sideMenu.classList.remove('justify-content-center');
       sideMenu.classList.add('j-c-between'); 
       for(i=0; i<sideMenuItem.length; i++){
         sideMenuItem[i].classList.remove('center-centered');
      }
      userIcon[0].classList.remove('ml-2');
      
       button.classList.remove('collapsed');
    }
    else{
      //close menu
      for(i=0; i<collapseElement.length; i++){
         collapseElement[i].classList.add('hide');
         collapseElement[i].classList.remove('show');
       }
   
      button.classList.add('collapsed');
      sideMenu.classList.remove('j-c-between');
      sideMenu.classList.add('justify-content-center');
      for(i=0; i<sideMenuItem.length; i++){
         sideMenuItem[i].classList.add('center-centered');
      }
      for(i=0;i<sideMenuLink.length; i++){
         sideMenuLink[i].style.width = "auto";
      }
      
         userIcon[0].classList.add('ml-2');
      
   //resize div
      side.style.flex = "1";
      navigationMenu.style.paddingLeft ="5px";
      main.style.flex = "20";
   }
}

// mobile menu
function showMobileMenu(){

   let button = document.getElementById('mobile-menu-btn');
   let mobileMenu =  document.getElementById('mobile-menu');
   
   if(button.classList.contains('collapsed')){
      mobileMenu.style.left = "0px";
 
  button.classList.remove('collapsed');
   }
   else{
      mobileMenu.style.left = "-150px";
      button.classList.add('collapsed');
   }
 }

 //utilities



