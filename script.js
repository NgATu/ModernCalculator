const expression = document.getElementById("expression");
const result = document.getElementById("result");

const numBtns = document.getElementsByClassName("num");
const operatorBtns = document.getElementsByClassName("operator");
const operators = new Set(["+", "-", "*", "/"]);

var isCalculated = false;

function calculate() {
  if (
    operators.has(
      expression.innerText.charAt(expression.innerText.length - 1) // If the last character is an operator
    )
  ) {
    result.innerText = ""; // Then don't calculate
  } else {
    const expressionValue = expression.innerText;
    let value = eval(expressionValue);
    value = Math.round((value + Number.EPSILON) * 10000000) / 10000000;
    result.innerText = "=" + value;
  }
}

function updateResultStyle() {
  result.style.fontSize = "100%";
  result.style.opacity = "100%";
}

function resetResultStyle() {
  result.style.fontSize = "75%";
  result.style.opacity = "50%";
}

function isOverInputLimit() {
  return expression.innerText.length > 10;
}

for (let i = 0; i < numBtns.length; i++) {
  numBtns[i].addEventListener("click", () => {
    if (isOverInputLimit()) {
      return;
    }
    if (isCalculated) {
      resetResultStyle();
      expression.innerText = "";
    }
    expression.innerText += numBtns[i].innerText;
    calculate();
  });
}

for (let i = 0; i < operatorBtns.length; i++) {
  operatorBtns[i].addEventListener("click", () => {
    if (isOverInputLimit()) {
      return;
    }
    // Check to see if it's valid to use an operator
    // The only valid scenario is when the last character is not an operator and it's not an empty text
    if (
      !operators.has(
        expression.innerText.charAt(expression.innerText.length - 1)
      ) &&
      expression.innerText !== ""
    ) {
      if (operatorBtns[i].innerText === "=") {
        updateResultStyle();
        calculate();
        isCalculated = true;
      } else {
        if (isCalculated) {
          expression.innerText = result.innerText.substring(1);
          resetResultStyle();
          isCalculated = false;
        }
        expression.innerText += operatorBtns[i].innerText;
      }
    }
  });
}

// Reset button
const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  expression.innerText = "";
  result.innerText = "";
});
// Delete button
const deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", () => {
  expression.innerText = expression.innerText.slice(0, -1);
  if (expression.innerText !== "") {
    calculate();
  } else {
    result.innerText = "";
  }
});

// Light-dark mode button
const swapBtn = document.getElementById("swap");
function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
}

swapBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  const root = document.querySelector(":root");
  root.setAttribute("color-scheme", theme);
});
