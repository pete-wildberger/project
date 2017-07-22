const C_X_OFFSET = 250;
const C_Y_OFFSET = 100;
const HALF_ICON_OFFSET = 8; // icons right now are 16x16 so half is 8
const REGISTER_ROUTE = '/register';
const P_ROUTE = '/patients';
const APPOINT_ROUTE = '/appointments';
const MODAL = document.getElementsByClassName('modal');


function openNav() {
  document.getElementById("mySidenav").style.width = "230px";
  document.getElementById("main").style.marginLeft = "230px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// var resizedX = 0;
// var resizedY = 0;
// console.log(resizedX, resizedX);
// var windowSize = function() {
//   console.log('windowSize');
//   var w = window.outerWidth;
//   var h = window.outerHeight;
//   var txt = "Window size: width=" + w + ", height=" + h;
//   console.log(txt);
//   resizedX = (window.outerWidth - 512) / 2;
//   console.log(resizedX, resizedY);
// };
// var sizeUP = function() {
//   console.log('sizeUp');
//   var canvasXY = canvas.getBoundingClientRect();
//   console.log("top: ", canvasXY.top, "right: ", canvasXY.right, "bottom: ", canvasXY.bottom, "left: ", canvasXY.left);
//   resizedX = (canvasXY.left);
//   resizedY = (canvasXY.top);
//
// };
