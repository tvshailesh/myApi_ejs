// let warningTimeout = 10000;
// let warningTimerID;
// let counterDisplay = document.getElementById("numCount");
// logoutUrl = "./login.ejs";

// function startTimer() {
//   // window.setTimeout returns an ID that can be used to start and stop the timer
//   warningTimerID = window.setTimeout(idleLogout, warningTimeout);

//   animate(counterDisplay, 5, 0, warningTimeout);
//   //function for resetting the timer
//   function resetTimer() {
//     window.clearTimeout(warningTimerID);
//     startTimer();
//   }

//   // Logout the user.
//   function idleLogout() {
//     window.location = logoutUrl;
//   }

//   function startCountdown() {
//     console.log("i am call");
//     document.addEventListener("mousemove", resetTimer);
//     document.addEventListener("mousedown", resetTimer);
//     document.addEventListener("keypress", resetTimer);
//     document.addEventListener("touchmove", resetTimer);
//     document.addEventListener("onscroll", resetTimer);
//     document.addEventListener("wheel", resetTimer);
//     startTimer();

//     //the animating function
//   }

//   function animate(obj, initVal, lastVal, duration) {
//     let startTime = null;
//      var currentTime = Date.now();
//     const step = (currentTime) => {
//       if (!startTime) {
//         startTime = currentTime;
//       }
//       const progress = Math.min((currentTime - startTime) / duration, 1);
//       displayValue = Math.floor(progress * (lastVal - initVal) + initVal);
//       obj.innerHTML = displayValue;
//       if (progress < 1) {
//         window.requestAnimationFrame(step);
//       } else {
//         window.cancelAnimationFrame(window.requestAnimationFrame(step));
//       }
//     };

//     //start animating
//     window.requestAnimationFrame(step);
//   }
// }

function startTimer() {
    var t;
    //window.onload = resetTimer;
    console.log("i am call");
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions

    function logout() {
        window.location.href = '/views/login.ejs';  //Adapt to actual logout script
    }

   function reload() {
          window.location = self.location.href;  //Reloads the current page
   }

   function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 60000);  // time is in milliseconds (1000 is 1 second)
        t= setTimeout(reload, 120000);  // time is in milliseconds (1000 is 1 second)
    }
}