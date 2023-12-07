const divOptions = document.querySelector(".divOptions");
const inputText = document.querySelector(".inputText");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const apiKey = prompt("Please enter your Api key:");
let temp = "c";

console.log(apiKey);

if (apiKey === "" || apiKey === null) {
  alert("Api Key is required! refresh and give apiKey");
}

async function fetchApiSearch() {
  const area = inputText.value;
  if (area.length === 0) return;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${area}`
    );
    const data = await response.json();

    while (divOptions.firstChild) {
      divOptions.removeChild(divOptions.firstChild);
    }

    data.map((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.textContent = `${item.name} - ${item.country}`;
      itemDiv.onclick = () => {
        inputText.value = item.name;
        divOptions.style.display = "none";
      };
      divOptions.appendChild(itemDiv);
    });

    divOptions.style.display = data.length > 0 ? "block" : "none";
  } catch (error) {
    console.log(error);
  }
}

async function fetchApiShow() {
  const area = inputText.value;
  if (area.length === 0) return;

  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${area}`
    );
    const data = await response.json();

    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    const mainTitle = document.createElement("h2");
    mainTitle.classList.add("mainTitle");
    mainTitle.textContent = `${data.location.name} - ${data.location.country}`;

    const mainGrid = document.createElement("div");
    mainGrid.classList.add("mainGrid");

    const mainTemp = document.createElement("div");
    mainTemp.classList.add("mainTemp");

    const tempTitle = document.createElement("h2");
    tempTitle.classList.add("tempTitle");
    tempTitle.textContent = "Temp: ";

    const tempNum = document.createElement("h2");
    tempNum.classList.add("tempTitle");
    tempNum.textContent = `${temp}: ${data.current.temp_c}°`;

    const tempButton = document.createElement("input");
    tempButton.type = "button";
    tempButton.classList.add("tempButton");
    tempButton.value = "c / f";

    tempButton.addEventListener("click", () => {
      if (temp === "c") {
        temp = "f";
        tempNum.textContent = `${temp}: ${data.current.temp_f}°`;
      } else {
        temp = "c";
        tempNum.textContent = `${temp}: ${data.current.temp_c}°`;
      }
    });

    const mainCon = document.createElement("div");
    mainCon.classList.add("mainCon");

    const conTitle = document.createElement("h2");
    conTitle.classList.add("conTitle");
    conTitle.textContent = "Condition: ";

    const conDes = document.createElement("h2");
    conDes.classList.add("conDes");
    conDes.textContent = data.current.condition.text;

    const mainImg = document.createElement("div");
    mainImg.classList.add("mainImg");

    const conImg = document.createElement("img");
    conImg.classList.add("conImg");
    conImg.src = `https:${data.current.condition.icon}`;
    conImg.alt = `https:${data.current.condition.icon}`;

    main.appendChild(mainTitle);

    mainTemp.appendChild(tempTitle);
    mainTemp.appendChild(tempNum);
    mainTemp.appendChild(tempButton);
    mainGrid.appendChild(mainTemp);

    mainCon.appendChild(conTitle);
    mainCon.appendChild(conDes);
    mainGrid.appendChild(mainCon);

    mainImg.appendChild(conImg);
    mainGrid.appendChild(mainImg);

    main.appendChild(mainGrid);

    inputText.value = "";

    main.style.display = data.length !== "" ? "block" : "none";
  } catch (error) {
    console.log(error);
  }
}

inputText.addEventListener("input", () => fetchApiSearch());

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchApiShow();
});
