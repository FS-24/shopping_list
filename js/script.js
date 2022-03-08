var input, button, ul;
input = document.querySelector("input");
button = document.getElementById("enter");
ul = document.querySelector("ul");

var shoppingItems = localStorage.getItem("shopping_items")
  ? JSON.parse(localStorage.getItem("shopping_items"))
  : [];
for (const item of shoppingItems) {
  li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
}

function storeShoppingItemInStorage(value) {
  shoppingItems.push(value);
  console.log(typeof shoppingItems);
  localStorage.setItem("shopping_items", JSON.stringify(shoppingItems));
}

function addLiToUL() {
  // creer element li
  if (input.value.trim().length > 0) {
    li = document.createElement("li");
    li.textContent = input.value;
    storeShoppingItemInStorage(input.value);
    // ajouter li a la liste ul
    ul.appendChild(li);
    input.value = "";
  }
}
/**
 * @param  {String} "click": event name
 * @param  {Function} addLiToUL : method to add list items
 */
button.addEventListener("click", addLiToUL);

/**
 * @param  {String} "keypress"
 * @param  {} function(event)
 */
input.addEventListener("keypress", (event) => {
  if (event.code == "Enter") {
    addLiToUL();
  }
});
