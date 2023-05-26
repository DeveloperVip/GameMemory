let choose = document.getElementById("choose");
//tạo img ngẫu nhiên 
function run() {
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  let checkOut = 0;
  let disableDeck = false;
  let cartOne, cartTwo;
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  let innerTag = document.getElementById("game");
  innerTag.innerHTML = "";
  arr.forEach((num) => {
    innerTag.innerHTML += `<div class="listItem">
        <div class="flip front-view cartImg">
          <img src="./Memory Card Game Images/img-${num}.png" alt="" />
        </div>
        <div class="flip back-view">
          <img src="./Memory Card Game Images/tải xuống.png" alt="" />
        </div>
      </div>
        `;
  });
  // Tạo bộ đếm thời gian
  let time = document.getElementById("timeOut");
  time.innerHTML = "<span>Time 00:00</span>       ";
  let second = 0,
    minute = 0;
  let timeStart = setInterval(() => {
    second += 1;
    if (second >= 60) {
      minute += 1;
      second = 0;
    }
    else if(minute == 1) {
        clearInterval(timeStart)
        choose.classList.add("afterChoose");
        afterChoosen(choose);
    }
    let secondValue = second < 10 ? `0${second}` : second,
      minuteValue = minute < 10 ? `0${minute}` : minute;
    time.innerHTML = `<span>Time</span>       ${minuteValue}:${secondValue}`;
  }, 1000);
  // Tạo function để lật thẻ
  let elm = document.querySelectorAll(".listItem");
  function flip(e) {
    let index = e.target;
    if (index !== cartOne) {
      index.classList.add("flipElm");
      if (!cartOne) {
        return (cartOne = index);
      }
      cartTwo = index;
      disableDeck = true;
      let cartOneImg = cartOne.querySelectorAll("img");
      let cartTwoImg = cartTwo.querySelectorAll("img");
      match(cartOneImg[0].src, cartTwoImg[0].src);
    }
  }
  function match(cartImg1, cartImg2) {
    if (cartImg1 === cartImg2) {
      checkOut++;
      if (checkOut == 8) {
        choose.classList.add("afterChoose");
        clearInterval(timeStart);
        afterChoosen(choose);
      }
      cartOne.removeEventListener("click", flip);
      cartTwo.removeEventListener("click", flip);
      cartOne = cartTwo = "";
      return;
    }
    cartOne.classList.add("shake");
    cartTwo.classList.add("shake");
    setTimeout(() => {
      cartOne.classList.remove("shake", "flipElm");
      cartTwo.classList.remove("shake", "flipElm");
      cartOne = cartTwo = "";
    }, 400);
  }
  // tạo function lựa chọn statement
  function afterChoosen(num) {
    num.addEventListener("click",function () {
        setTimeout(()=>{
            choose.classList.remove("afterChoose")
            run()
        },1000);
    })
  }
  elm.forEach((num) => {
    num.addEventListener("click", flip);
  });
}
run();
