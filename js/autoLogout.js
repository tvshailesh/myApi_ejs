let warningTimeout = 10000;
let warningTimerID;
let counterDisplay = document.getElementById("numCount");
logoutUrl = "./login.ejs";

function startTimer() {
  // window.setTimeout returns an ID that can be used to start and stop the timer
  warningTimerID = window.setTimeout(idleLogout, warningTimeout);

  animate(counterDisplay, 5, 0, warningTimeout);
  //function for resetting the timer
  function resetTimer() {
    window.clearTimeout(warningTimerID);
    startTimer();
  }

  // Logout the user.
  function idleLogout() {
    window.location = logoutUrl;
  }

  function startCountdown() {
    console.log("i am call");
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("mousedown", resetTimer);
    document.addEventListener("keypress", resetTimer);
    document.addEventListener("touchmove", resetTimer);
    document.addEventListener("onscroll", resetTimer);
    document.addEventListener("wheel", resetTimer);
    startTimer();

    //the animating function
  }

  function animate(obj, initVal, lastVal, duration) {
    let startTime = null;
     var currentTime = Date.now();
    const step = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }
      const progress = Math.min((currentTime - startTime) / duration, 1);
      displayValue = Math.floor(progress * (lastVal - initVal) + initVal);
      obj.innerHTML = displayValue;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(window.requestAnimationFrame(step));
      }
    };

    //start animating
    window.requestAnimationFrame(step);
  }
}
