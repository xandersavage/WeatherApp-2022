/*fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});*/

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  messageOne.textContent = "loading";
  messageTwo.textContent = " ";

  const location = search.value;

  if (location == " ") {
    console.log("Please type in a location");
  } else {
    const myURL = "/weather?address=" + location;
    fetch(myURL).then(response => {
      response.json().then(({ address, forecast, location, error } = {}) => {
        if (!error) {
          messageOne.textContent = location;
          messageTwo.textContent = forecast;
        } else {
          messageOne.textContent = error;
        }
      });
    });
  }

  //console.log(location);
});
