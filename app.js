const form = document.querySelector("#my-form");
const clearBtn = document.querySelector("#clear-btn");
const displayDiv = document.querySelector("#display-items");
let newText = [];

(function () {
  if (localStorage.length > 0) {
    if (localStorage.getItem("grocery list") !== null) {
      let storage = localStorage.getItem("grocery list");
      storage = JSON.parse(storage);
      if (storage.length > 0) {
        for (let i = 0; i < storage.length; i++) {
          displayDiv.style.display = "grid";
          newText.push(storage[i]);
          const h3 = document.createElement("h3");
          const createDelete = document.createElement("img");
          displayDiv.append(h3, createDelete);
          h3.innerText = newText[newText.length - 1];
          createDelete.src = "./images/delete.png";
          createDelete.classList.add("delete");
          createDelete.classList.add("clear-all");
          h3.classList.add("clear-all");
        }
      }
    } else {
      displayDiv.style.display = "none";
    }
  }
})();

function getInput(ev) {
  ev.preventDefault();
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (const [key, value] of fd) {
    newText.push(value);
  }
  if (newText[newText.length - 1] != "") {
    addElement();
  }
}

function addElement() {
  displayDiv.style.display = "grid";
  const h3 = document.createElement("h3");
  const createDelete = document.createElement("img");
  displayDiv.append(h3, createDelete);
  h3.innerText = newText[newText.length - 1];
  createDelete.src = "./images/delete.png";
  createDelete.classList.add("delete");
  createDelete.classList.add("clear-all");
  h3.classList.add("clear-all");
  localStorage.setItem("grocery list", JSON.stringify(newText));
  form.reset();
}

function removeElem(e) {
  if (e.target.className === "delete clear-all") {
    const h3 = e.target.previousSibling;
    displayDiv.removeChild(e.target);
    displayDiv.removeChild(h3);
    let currentStorage = localStorage.getItem("grocery list");
    let parsed = JSON.parse(currentStorage);
    let removedLast = parsed.splice(-1);
    newText = parsed;
    localStorage.setItem("grocery list", JSON.stringify(parsed));
  }
  if (newText.length === 0) {
    displayDiv.style.display = "none";
    clearItems();
  }
}

function clearItems() {
  localStorage.removeItem("grocery list");
  const elements = document.querySelectorAll(".clear-all");
  elements.forEach((item) => {
    item.remove();
  });
  newText = [];
  displayDiv.style.display = "none";
}

form.addEventListener("submit", getInput);

clearBtn.addEventListener("click", clearItems);

displayDiv.addEventListener("click", removeElem);
