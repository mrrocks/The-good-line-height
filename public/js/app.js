const baselineGridBackground = document.getElementById("baselineGridBackground")
const baselineGridVisibility = document.getElementById("baselineGridVisibility")
const toggleLightsAction = document.getElementById("toggleLights")

const textSizeInput = document.getElementById("textSizeInput")
const textSizeRange = document.getElementById("textSizeRange")

const lineHeightRatioInput = document.getElementById("lineHeightRatioInput")
const lineHeightRatioRange = document.getElementById("lineHeightRatioRange")

const baselineGridInput = document.getElementById("baselineGridInput")
const baselineGridRange = document.getElementById("baselineGridRange")

const generatedLineHeight = document.getElementById("generatedLineHeight")

const sample = document.getElementById("sample")

let gridIsVisible = true

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

let setTextProps = (size, ratio, grid) => {
  textSizeInput.value = size
  lineHeightRatioInput.value = ratio
  baselineGridInput.value = grid

  textSizeRange.value = size
  lineHeightRatioRange.value = ratio
  baselineGridRange.value = grid

  updateSample(size)
}

var robotoSlab = new FontFace('Roboto Slab', 'url(public/fonts/RobotoSlab-Regular.ttf )', {
  style: 'normal',
  weight: '400'
});

document.fonts.add(robotoSlab);

robotoSlab.loaded.then(() => {
  setTextProps(38, 1.3, 8)
})

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

// Baseline grid visibility

let toggleBaselineVisibility = () => {
  baselineGridBackground.classList.toggle(
    "baseline-grid-background--not-visible"
  )

  if (gridIsVisible === true) {
    baselineGridVisibility.innerText = "Show grid"
    baselineGridVisibility.classList.add("action--toggle-visibility--show")
    gridIsVisible = false
  } else {
    baselineGridVisibility.innerText = "Hide grid"
    baselineGridVisibility.classList.remove("action--toggle-visibility--show")
    gridIsVisible = true
  }
}

// Color themes
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")

let localTheme = localStorage.getItem("theme")
let bodyClasses = document.body.classList
let currentThemes

if (localTheme){
  currentTheme = localTheme
} else {
  currentTheme = isDarkTheme.matches ? "dark" : "light"
}

let switchToLightTheme = () => {
  currentTheme = "light"

  bodyClasses.replace("dark-theme", "light-theme")
  toggleLightsAction.innerText = "Turn off the lights"
  toggleLightsAction.classList.remove("action--lights--on")

  localStorage.setItem("theme", currentTheme)
}

let switchToDarkTheme = () => {
  currentTheme = "dark"

  bodyClasses.replace("light-theme", "dark-theme")
  toggleLightsAction.innerText = "Turn on the lights"
  toggleLightsAction.classList.add("action--lights--on")

  localStorage.setItem("theme", currentTheme)
}

let toggleLights = () => {
  if (currentTheme == "dark") {
    switchToLightTheme()
  } else if (currentTheme == "light") {
    switchToDarkTheme()
  }
}

toggleLightsAction.addEventListener("click", function (e) {
  e.preventDefault()
  toggleLights()
})

if (currentTheme == "dark") {
  bodyClasses.add("dark-theme")
  switchToDarkTheme()
} else if (currentTheme == "light") {
  bodyClasses.add("light-theme")
  switchToLightTheme()
}

// Cicling "good" words

const words = ["phenomenal", "fantastic", "remarkable", "fabulous", "prodigious", "astonishing", "good"]

const goodWords = document.getElementsByName("word")

let count = 0

let cycleWords = () => {
  if (count == words.length) { count = 0 }
  
  for (var word of goodWords) {
    word.innerText = words[count]
  }

  count ++
}

for (var word of goodWords) {
  word.addEventListener("click", cycleWords)
}



