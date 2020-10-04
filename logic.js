const calculateLineHeightButton = document.getElementById("calculateLineHeightButton");
const sample = document.getElementById("sample");

let getTextSize = () => {
  let textSize = Number(document.getElementById("textSize").value);
  return textSize
}

let getBaselineRowHeight = () => {
  let baselineRowHeight = document.getElementById("baselineRowHeight").value
  if (baselineRowHeight.length == 0) baselineRowHeight = 8
  return baselineRowHeight
}

let getLineHeightRatio = () => {
  let lineHeightRatio = document.getElementById("lineHeightRatio").value
  if (lineHeightRatio.length == 0) lineHeightRatio = 1.3
  return lineHeightRatio
}

let calculateLineHeight = () => {
  let lineHeight = Math.ceil((getTextSize() * getLineHeightRatio()) / getBaselineRowHeight()) * getBaselineRowHeight();
  return lineHeight
}

let getCoords = (elem) => {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  }
}

let getBaseline = (element) => {
  let span = document.createElement("span");
  span.setAttribute("style", "font-size:0");
  span.innerText = "A";
  element.insertBefore(span, element.firstChild);

  let computed = getCoords(span).bottom;
  
  //span.remove();
  
  console.log(computed)
  
  return computed;
}

calculateLineHeightButton.addEventListener('click', event => {  
  sample.style.fontSize = `${getTextSize()}px`;
  sample.style.lineHeight = `${calculateLineHeight()}px`;
  sample.style.top = `-${getBaseline(sample)}px`;
})
