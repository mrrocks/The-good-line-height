const calculateLineHeightButton = document.getElementById(
  "calculateLineHeightButton"
)
const sample = document.getElementById("sample")
const container = document.getElementById("container")
const baselineGrid = document.getElementById("baselineGrid")

let getTextSize = () => {
  let textSize = Number(document.getElementById("textSize").value)
  return textSize
}

let getBaselineRowHeight = () => {
  let baselineRowHeight = Number(
    document.getElementById("baselineRowHeight").value
  )
  if (baselineRowHeight.length == 0) baselineRowHeight = 8
  return baselineRowHeight
}

let getLineHeightRatio = () => {
  let lineHeightRatio = document.getElementById("lineHeightRatio").value
  if (lineHeightRatio.length == 0) lineHeightRatio = 1.3
  return lineHeightRatio
}

let calculateLineHeight = () => {
  let lineHeight =
    Math.ceil((getTextSize() * getLineHeightRatio()) / getBaselineRowHeight()) *
    getBaselineRowHeight()
  return lineHeight
}

let getBaseline = (element) => {
  let span = document.createElement("span")
  span.setAttribute("style", "font-size:0")
  span.innerText = "A"
  element.insertBefore(span, element.firstChild)

  let computed = span.getBoundingClientRect().bottom - element.offsetTop

  span.remove()

  return computed
}

calculateLineHeightButton.addEventListener("click", (event) => {
  sample.style.top = `0`

  sample.style.fontSize = `${getTextSize()}px`
  sample.style.lineHeight = `${calculateLineHeight()}px`
  sample.style.top = `-${
    getBaseline(sample) - getBaselineRowHeight()
  }px`

  baselineGrid.style.backgroundSize = `100% ${getBaselineRowHeight() * 2}px`

})
