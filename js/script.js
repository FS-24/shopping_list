var input, button, ul;
input = document.querySelector("input");
button = document.getElementById("enter");
ul = document.querySelector("ul");

/**
 *
 */
function addLiToUL() {
  // creer element li
  if (input.value.trim().length > 0) {
    li = document.createElement("li");
    li.textContent = input.value;

    // ajouter li a la liste ul
    ul.appendChild(li);
    localStorage.setItem(input.value,input.value);
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
