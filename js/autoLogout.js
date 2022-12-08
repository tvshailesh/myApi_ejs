function startTimer() {
  var t;
  //window.onload = resetTimer;
  console.log("i am call");
  window.onmousemove = resetTimer; // catches mouse movements
  window.onmousedown = resetTimer; // catches mouse movements
  window.onclick = resetTimer; // catches mouse clicks
  window.onscroll = resetTimer; // catches scrolling
  window.onkeypress = resetTimer; //catches keyboard actions

  function logout() {
    window.location.href = "/views/login.ejs";
  }

  function reload() {
    window.location = self.location.href;
  }

  function resetTimer() {
    clearTimeout(t);
    t = setTimeout(logout, 60000); // time is in milliseconds (1000 is 1 second)
    t = setTimeout(reload, 120000); // time is in milliseconds (1000 is 1 second)
  }
}
