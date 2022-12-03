const baselineGridBackground = document.getElementById(
  "baselineGridBackground"
);
const baselineGridVisibility = document.getElementById(
  "baselineGridVisibility"
);
const toggleLightsAction = document.getElementById("toggleLights");

const textSizeInput = document.getElementById("textSizeInput");
const textSizeRange = document.getElementById("textSizeRange");

const lineHeightRatioInput = document.getElementById("lineHeightRatioInput");
const lineHeightRatioRange = document.getElementById("lineHeightRatioRange");

const baselineGridInput = document.getElementById("baselineGridInput");
const baselineGridRange = document.getElementById("baselineGridRange");

const generatedLineHeight = document.getElementById("generatedLineHeight");

const sample = document.getElementById("sample");

let gridIsVisible = true;

const getTextProps = () => {
  const size = Number(textSizeInput.value);
  const ratio = Number(lineHeightRatioInput.value);
  const grid = Number(baselineGridInput.value);

  return { size, ratio, grid };
};

const getOffsetRect = (el) => {
  let rect = el.getBoundingClientRect();

  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
  };
};

const calculateBaselineOffset = () => {
  const proxy = document.createElement("span");
  proxy.style.fontSize = "0";
  proxy.innerText = "A";
  sample.insertBefore(proxy, sample.firstChild);

  const offset = getOffsetRect(proxy).bottom - getOffsetRect(sample).top;

  proxy.remove();

  return offset;
};

const calculateLineHeight = ({ size, ratio, grid }) => {
  const lineHeight = Math.round((size * ratio) / grid) * grid;

  return lineHeight;
};

const renderBaselineGrid = () => {
  const { grid } = getTextProps();
  baselineGridBackground.style.backgroundSize = `100% ${grid * 2}px`;
};

const setSampleStyles = (textProps, lineHeight) => {
  sample.style.fontSize = `${textProps.size}px`;
  sample.style.lineHeight = `${lineHeight}px`;
};

const setBaselineGrid = (textProps) => {
  let adjustedOffset =
    -Math.abs(calculateBaselineOffset()) + lineHeight - textProps.grid;
  sample.style.marginTop = `${adjustedOffset}px`;
};

let updateSample = () => {
  // Get text properties
  let textProps = getTextProps();
  let lineHeight = calculateLineHeight(textProps);

  sample.style.fontSize = `${textProps.size}px`;
  sample.style.lineHeight = `${lineHeight}px`;

  let adjustedOffset =
    -Math.abs(calculateBaselineOffset()) + lineHeight - textProps.grid;
  sample.style.marginTop = `${adjustedOffset}px`;

  generatedLineHeight.innerHTML = lineHeight;
  renderBaselineGrid();
};

const setTextProps = (size, ratio, grid) => {
  textSizeInput.value = size;
  textSizeRange.value = size;

  lineHeightRatioInput.value = ratio;
  lineHeightRatioRange.value = ratio;

  baselineGridInput.value = grid;
  baselineGridRange.value = grid;

  updateSample(size);
};

var robotoSlab = new FontFace(
  "Roboto Slab",
  "url(public/fonts/RobotoSlab-Regular.ttf )",
  {
    style: "normal",
    weight: "400",
  }
);

document.fonts.add(robotoSlab);

robotoSlab.loaded.then(() => {
  setTextProps(38, 1.3, 8);
});

const inputs = [
  textSizeInput,
  textSizeRange,
  lineHeightRatioInput,
  lineHeightRatioRange,
  baselineGridInput,
  baselineGridRange,
];

inputs.forEach((input) => {
  input.addEventListener("input", function (e) {
    const siblingInput =
      input === textSizeInput ||
      input === lineHeightRatioInput ||
      input === baselineGridInput
        ? input.nextElementSibling
        : input.previousElementSibling;
    siblingInput.value = this.value;
    updateSample(this.value);
  });
});

// Baseline grid visibility

const toggleBaselineVisibility = () => {
  baselineGridBackground.classList.toggle(
    "baseline-grid-background--not-visible"
  );
  gridIsVisible = !gridIsVisible;

  const actionText = gridIsVisible ? "Hide grid" : "Show grid";
  baselineGridVisibility.innerText = actionText;
  baselineGridVisibility.classList.toggle("action--toggle-visibility--show");
};

// Color themes
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

let localTheme = localStorage.getItem("theme");
let bodyClasses = document.body.classList;
let currentThemes;

if (localTheme) {
  currentTheme = localTheme;
} else {
  currentTheme = isDarkTheme.matches ? "dark" : "light";
}

let switchToLightTheme = () => {
  currentTheme = "light";

  bodyClasses.replace("dark-theme", "light-theme");
  toggleLightsAction.innerText = "Turn off the lights";
  toggleLightsAction.classList.remove("action--lights--on");

  localStorage.setItem("theme", currentTheme);
};

let switchToDarkTheme = () => {
  currentTheme = "dark";

  bodyClasses.replace("light-theme", "dark-theme");
  toggleLightsAction.innerText = "Turn on the lights";
  toggleLightsAction.classList.add("action--lights--on");

  localStorage.setItem("theme", currentTheme);
};

let toggleLights = (e) => {
  e.preventDefault();
  currentTheme == "dark" ? switchToLightTheme() : switchToDarkTheme();
};

toggleLightsAction.addEventListener("click", toggleLights);

if (currentTheme === "dark") {
  switchToDarkTheme();
} else if (currentTheme === "light") {
  switchToLightTheme();
}
bodyClasses.add(currentTheme + "-theme");

// Cicling "good" words

const words = [
  "phenomenal",
  "fantastic",
  "remarkable",
  "fabulous",
  "prodigious",
  "astonishing",
  "good",
  "amazing",
  "astounding",
  "incredible",
  "magnificent",
  "marvelous",
  "stupendous",
  "wonderful",
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const goodWords = document.getElementsByName("word");

let wordIndex = 0;

const cycleWords = () => {
  if (wordIndex === words.length) {
    shuffle(words);
    wordIndex = 0;
  }

  for (const word of goodWords) {
    word.innerText = words[wordIndex];
  }

  wordIndex++;
};

for (const word of goodWords) {
  word.addEventListener("click", cycleWords);
}
