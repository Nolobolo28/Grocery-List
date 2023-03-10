const form = $("#my-form");
const clearBtn = $("#clear-btn");
const displayDiv = $("#display-items");
let newText = [];

(function () {
  if (localStorage.getItem("grocery list") !== null) {
    let storage = JSON.parse(localStorage.getItem("grocery list"));
    for (let i = 0; i < storage.length; i++) {
      displayDiv.css("display", "grid");
      newText.push(storage[i]);
      let textData = newText[newText.length - 1];
      displayDiv.append($(`<h3>${textData}</h3>`).addClass("clear-all"));
      displayDiv.append(
        $(`<img src="./images/delete.png"></img>`).addClass("delete clear-all")
      );
    }
  } else {
    displayDiv.css("display", "none");
  }
})();

function getInput(ev) {
  ev.preventDefault();
  let myForm = ev.target;
  let fd = new FormData(myForm);
  for (const [key, value] of fd) {
    if (value !== "") {
      newText.push(value);
      addElement();
    }
  }
}

function addElement() {
  const textValue = newText[newText.length - 1];
  displayDiv.css("display", "grid");
  displayDiv.append($(`<h3>${textValue}</h3>`).addClass("clear-all"));
  displayDiv.append(
    $(`<img src='./images/delete.png' alt='trash can image'/>`).addClass(
      "delete clear-all"
    )
  );
  localStorage.setItem("grocery list", JSON.stringify(newText));
  form.trigger("reset");
}

function removeElem(e) {
  if ($(e.target).hasClass("delete clear-all")) {
    const h3 = $(e.target).prev().remove();
    $(e.target).remove();
    let currentStorage = JSON.parse(localStorage.getItem("grocery list"));
    let removedLast = currentStorage.splice(-1);
    newText = currentStorage; // updating the newText array after we removed the associated item that was clicked
    localStorage.setItem("grocery list", JSON.stringify(currentStorage)); // updating storage after removing an item
  }
  if (newText.length === 0) {
    displayDiv.css("display", "none");
    clearItems();
  }
  console.log(newText);
}

function clearItems() {
  localStorage.removeItem("grocery list");
  $(".clear-all").remove();
  newText = [];
  displayDiv.css("display", "none");
}

form.submit(getInput);

clearBtn.click(clearItems);

displayDiv.click(removeElem);
