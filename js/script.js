var input, button, ul, shoppingItems;
input = document.querySelector("input");
button = document.getElementById("enter");
ul = document.querySelector("ul");

class ShoppingItem {
  constructor(name, state = false) {
    this.name = name;
    this.state = state;
  }
}
/**
 * @returns shopping items Array from local Storage
 */
function getShoppingItemsFromStorage() {
  return localStorage.getItem("shopping_items")
    ? JSON.parse(localStorage.getItem("shopping_items"))
    : [];
}

/**
 * load list of shoppingItems and add them to the li
 */
function loadExistingElements() {
  shoppingItems = getShoppingItemsFromStorage();
  nbreShItem = shoppingItems.length - 1;
  for (const object of shoppingItems) {
    if (object.state) {
      createLiElementAndAppendToUl(object.name).classList.add("done");
    } else {
      createLiElementAndAppendToUl(object.name);
    }
  }
}

loadExistingElements();

/**
 * Create List Element and add it to ul Element
 *
 * @param  {String} textContentValue
 */
function createLiElementAndAppendToUl(textContentValue) {
  let li = document.createElement("li");
  li.textContent = textContentValue;
  li.classList.add("item");
  ul.appendChild(li);
  ul.appendChild(createDeletebutton());
  return li;
}

function createDeletebutton() {
  let btn = document.createElement("button");
  btn.textContent = "x";
  return btn;
}
/**
 * Add input value to the Array and
 * Store shopping list in the localStarage
 * @param  {String} value => text  of the input
 */
function storeShoppingItemInStorage(value) {
  shoppingItems.push(new ShoppingItem(value));
  localStorage.setItem("shopping_items", JSON.stringify(shoppingItems));
}
/**
 * @param  {Number} index => index of the element in the shoppingItems list
 * @param  {Object} value => the object modified
 */
function updateShoppingItemInStorage(index, value) {
  shoppingItems.splice(index, 1, value);
  localStorage.setItem("shopping_items", JSON.stringify(shoppingItems));
}

/**
 * @param  {Number} index => index of the element in the shoppingItems list
 * @param  {Object} value => the object modified
 */
function deleteShoppingItem(index) {
  shoppingItems.splice(index, 1);
  localStorage.setItem("shopping_items", JSON.stringify(shoppingItems));
}
/**
 * check if the input value is empty or not
 * creat an li and add it to ul and store the data in local storage
 */
function addNewItem() {
  if (input.value.trim().length > 0) {
    li = createLiElementAndAppendToUl(input.value);
    storeShoppingItemInStorage(input.value);
    input.value = "";
    addEventsToElement(shoppingItems.length, li);
    console.log(nbreShItem);
  }
}
/**
 * @param  {String} "click": event name
 * @param  {Function} addNewItem : method to add list items
 */
button.addEventListener("click", addNewItem);

/**
 * @param  {String} "keypress"
 * @param  {Event} function(event)
 */
input.addEventListener("keypress", (event) => {
  if (event.code == "Enter") {
    addNewItem();
  }
});

/**
 * Verify if the element classlist contains 'done' class
 * it remove the class if exist and update the value in the local storage
 * @param  {String} list Element (li)
 * @param  {Number} index =>index of Element in shoppingItem list
 */
function checkState(index, element) {
  if (element.classList.contains("done")) {
    element.classList.remove("done");
    shoppingItems[index].state = false;
    updateShoppingItemInStorage(index, shoppingItems[index]);
  } else {
    element.classList.add("done");
    shoppingItems[index].state = true;
    updateShoppingItemInStorage(index, shoppingItems[index]);
  }
}

function addEventsToElement(index, element) {
  var btns = document.querySelectorAll("ul>button");
  element.addEventListener("click", () => {
    checkState(index, element);
  });
  btns[index].addEventListener("click", () => {
    deleteShoppingItem(index);
    element.remove();
    btns[index].remove();
  });
}

/**
 * add class and listener to li element and make checkState
 */
function addClassToListElements() {
  let listElements = document.querySelectorAll("ul>li");
  let btns = document.querySelectorAll("ul>button");
  var nbreListItem = listElements.length;
  console.log(btns);

  for (let i = 0; i < nbreListItem; i++) {
    const element = listElements[i];
    addEventsToElement(i, element);
  }
}

addClassToListElements();
