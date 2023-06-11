export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createListElement(content) {
  const li = document.createElement("li");
  li.textContent = content;
  return li;
}

export function getDiv(divId) {
  return document.getElementById(divId);
}