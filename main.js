let elm = document.querySelectorAll(".listItem");
let cartOne, cartTwo;
let checkOut = 0;
function flip(e){
    let index = e.target;
    if(index !== cartOne ){
        index.classList.add("flipElm"); 
        if(!cartOne){
            return cartOne = index;
        }
        cartTwo = index;
        disableDeck = true;
        let cartOneImg = cartOne.querySelectorAll("img");
        let cartTwoImg = cartTwo.querySelectorAll("img");
        match(cartOneImg[0].src, cartTwoImg[0].src);
    }
}
function match(cartImg1, cartImg2){
    if(cartImg1 === cartImg2){  
        checkOut++;
        if(checkOut == 8){
            setTimeout(() => {
                return shufferNum();
            }, 1000);
        }
        cartOne.removeEventListener("click",flip);
        cartTwo.removeEventListener("click",flip);
        cartOne=cartTwo="";
        return;
    }
    cartOne.classList.add("shake")
    cartTwo.classList.add("shake")
    setTimeout(() => {
        cartOne.classList.remove("shake","flipElm");
        cartTwo.classList.remove("shake","flipElm"); 
        cartOne = cartTwo = "";
    },400)
    
    
}
function shufferNum(arr){
        arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
        checkOut = 0;
    disableDeck =  false;
    cartOne = cartTwo = "";
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    elm.forEach((num,index)=>{
        num.classList.remove("flipElm");
        let imgSelector = num.querySelectorAll("img");
        imgSelector[0].src = `./Memory Card Game Images/img-${arr[index]}.png`
        num.addEventListener("click",flip);  
    }) 
}
elm.forEach(num => {
    num.addEventListener("click",flip);
});