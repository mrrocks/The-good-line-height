const sample = document.getElementById("sample")
const baselineGridBackground = document.getElementById("baselineGridBackground")

const textSizeInput = document.getElementById("textSizeInput")
const textSizeRange = document.getElementById("textSizeRange")
const lineHeightRatioInput = document.getElementById("lineHeightRatioInput")
const lineHeightRatioRange = document.getElementById("lineHeightRatioRange")
const baselineGridInput = document.getElementById("baselineGridInput")
const baselineGridRange = document.getElementById("baselineGridRange")
const lineHeightDiv = document.getElementById("lineHeightDiv")

let getTextProperties = () => {
  size = Number(textSizeInput.value)
  ratio = Number(lineHeightRatioInput.value)
  grid = Number(baselineGridInput.value)

  return {
    size,
    ratio,
    grid,
  }
}

let calculateOffset = () => {
  let proxy = document.createElement("span")
  proxy.setAttribute("style", "font-size:0")
  proxy.innerText = "A"
  sample.insertBefore(proxy, sample.firstChild)

  let offset =
    proxy.getBoundingClientRect().bottom -
    sample.offsetTop -
    getTextProperties().grid

  proxy.remove()

  return offset
}

let calculateLineHeight = ({ size, ratio, grid }) => {
  let lineHeight = Math.ceil((size * ratio) / grid) * grid

  return lineHeight
}

let renderBaselineGrid = () => {
  baselineGridBackground.style.backgroundSize = `100% ${
    getTextProperties().grid * 2
  }px`
}

let applyTextProperties = () => {
  textProperties = getTextProperties()
  lineHeight = calculateLineHeight(textProperties)

  sample.style.top = `0`

  sample.style.fontSize = `${textProperties.size}px`
  sample.style.lineHeight = `${lineHeight}px`
  sample.style.top = `-${calculateOffset()}px`

  lineHeightDiv.innerHTML = lineHeight

  renderBaselineGrid()
}

textSizeInput.addEventListener("input", function (e) {
  textSizeRange.value = this.value
  applyTextProperties(this.value)
})
textSizeRange.addEventListener("input", function (e) {
  textSizeInput.value = this.value
  applyTextProperties(this.value)
})

lineHeightRatioInput.addEventListener("input", function (e) {
  lineHeightRatioRange.value = this.value
  applyTextProperties(this.value)
})
lineHeightRatioRange.addEventListener("input", function (e) {
  lineHeightRatioInput.value = this.value
  applyTextProperties(this.value)
})

baselineGridInput.addEventListener("input", function (e) {
  baselineGridRange.value = this.value
  applyTextProperties(this.value)
})
baselineGridRange.addEventListener("input", function (e) {
  baselineGridInput.value = this.value
  applyTextProperties(this.value)
})

applyTextProperties(16)
