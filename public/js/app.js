const sample = document.getElementById("sample")
const baselineGridBackground = document.getElementById("baselineGridBackground")

const textSizeInput = document.getElementById("textSizeInput")
const textSizeRange = document.getElementById("textSizeRange")

const lineHeightRatioInput = document.getElementById("lineHeightRatioInput")
const lineHeightRatioRange = document.getElementById("lineHeightRatioRange")

const baselineGridInput = document.getElementById("baselineGridInput")
const baselineGridRange = document.getElementById("baselineGridRange")

const generatedLineHeight = document.getElementById("generatedLineHeight")

let getTextProps = () => {
  size = Number(textSizeInput.value)
  ratio = Number(lineHeightRatioInput.value)
  grid = Number(baselineGridInput.value)

  return {
    size,
    ratio,
    grid,
  }
}

let setTextProps = (size, ratio, grid) => {
  textSizeInput.value = size
  lineHeightRatioInput.value = ratio
  baselineGridInput.value = grid

  textSizeRange.value = size
  lineHeightRatioRange.value = ratio
  baselineGridRange.value = grid

  updateSample(size)
}

const getOffsetRect = (el) => {
  let rect = el.getBoundingClientRect()

  let left = rect.left + window.pageXOffset
  let top = rect.top + window.pageYOffset
  let right = rect.right + window.pageXOffset
  let bottom = rect.bottom + window.pageYOffset

  return { left, top, right, bottom }
}

let calculateBaselineOffset = () => {
  let proxy = document.createElement("span")
  proxy.setAttribute("style", "font-size:0")
  proxy.innerText = "A"
  sample.insertBefore(proxy, sample.firstChild)

  let offset = getOffsetRect(proxy).bottom - getOffsetRect(sample).top

  proxy.remove()

  return offset
}

let calculateLineHeight = ({ size, ratio, grid }) => {
  let lineHeight = Math.ceil((size * ratio) / grid) * grid

  return lineHeight
}

let renderBaselineGrid = () => {
  baselineGridBackground.style.backgroundSize = `100% ${
    getTextProps().grid * 2
  }px`
}

let updateSample = () => {
  let textProps = getTextProps()
  let lineHeight = calculateLineHeight(textProps)

  sample.style.fontSize = `${textProps.size}px`
  sample.style.lineHeight = `${lineHeight}px`

  let adjustedOffset =
    -Math.abs(calculateBaselineOffset()) + lineHeight - textProps.grid

  sample.style.marginTop = `${adjustedOffset}px`

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

setTextProps(40, 1.3, 8)