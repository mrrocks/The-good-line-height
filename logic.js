const sample = document.getElementById("sample")
const baselineGridBackground = document.getElementById("baselineGridBackground")

const textSizeInput = document.getElementById("textSizeInput")
const textSizeRange = document.getElementById("textSizeRange")

const lineHeightRatioInput = document.getElementById("lineHeightRatioInput")
const lineHeightRatioRange = document.getElementById("lineHeightRatioRange")

const baselineGridInput = document.getElementById("baselineGridInput")
const baselineGridRange = document.getElementById("baselineGridRange")

const generatedLineHeight = document.getElementById("generatedLineHeight")

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

let setTextProperties = (size, ratio, grid) => {
  textSizeInput.value = size
  lineHeightRatioInput.value = ratio
  baselineGridInput.value = grid

  textSizeRange.value = size
  lineHeightRatioRange.value = ratio
  baselineGridRange.value = grid

  updateSample(size)
}

let calculateBaselineOffset = () => {
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

let updateSample = () => {
  let textProperties = getTextProperties()
  let lineHeight = calculateLineHeight(textProperties)

  sample.style.top = `0`

  sample.style.fontSize = `${textProperties.size}px`
  sample.style.lineHeight = `${lineHeight}px`
  sample.style.top = `-${calculateBaselineOffset()}px`

  generatedLineHeight.innerHTML = lineHeight

  renderBaselineGrid()
}

textSizeInput.addEventListener("input", function (e) {
  textSizeRange.value = this.value
  updateSample(this.value)
})
textSizeRange.addEventListener("input", function (e) {
  textSizeInput.value = this.value
  updateSample(this.value)
})

lineHeightRatioInput.addEventListener("input", function (e) {
  lineHeightRatioRange.value = this.value
  updateSample(this.value)
})
lineHeightRatioRange.addEventListener("input", function (e) {
  lineHeightRatioInput.value = this.value
  updateSample(this.value)
})

baselineGridInput.addEventListener("input", function (e) {
  baselineGridRange.value = this.value
  updateSample(this.value)
})
baselineGridRange.addEventListener("input", function (e) {
  baselineGridInput.value = this.value
  updateSample(this.value)
})

setTextProperties(24, 1.3, 8)
