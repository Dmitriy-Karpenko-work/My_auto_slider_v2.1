import { imgData } from "./imgData.js";

const arrImgs = imgData;
const containerEl = document.querySelector(".imgboxs");
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const dotsContainerEl = document.querySelector(".navigation-dots");
let currentIndex = 0;
let autoSlideTimer = 2000;
let intervalID;
function createCardHtml(imgOBJ) {
  return `<div class="imgbox">
            <img src="${imgOBJ.img}" alt="" />
          </div>`;
}
function renderImage(index) {
  containerEl.innerHTML = createCardHtml(arrImgs[index]);
  //для отладки
  console.log(arrImgs[index]);
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % arrImgs.length;
  renderImage(currentIndex);
  //обновление точки
  updateDots(currentIndex);
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + arrImgs.length) % arrImgs.length;
  renderImage(currentIndex);
  //обновление точки
  updateDots(currentIndex);
}

rightArrow.addEventListener("click", function (e) {
  showNextImage();
  clearInterval(intervalID);
  intervalID = startAutoSlide();
});
leftArrow.addEventListener("click", function (e) {
  showPrevImage();
  clearInterval(intervalID); //обнуляем интервал
  intervalID = startAutoSlide(); //перезапускаем после обнуления
});
renderImage(currentIndex);
//---------------------------------------------------------------------
// Функция для автоматического переключения изображений каждые три секунды
function startAutoSlide() {
  return (intervalID = setInterval(showNextImage, autoSlideTimer));
}
// Запускаем автоматическое переключение при загрузке страницы
startAutoSlide();

//--------------------------------------------------------------------
dotsContainerEl.innerHTML = createRadioBtnHtml();
function createRadioBtnHtml() {
  return arrImgs
    .map(
      (_, index) =>
        `<input type="radio" name="nav" class="dot" data-index="${index}" ${
          index === 0 ? "checked" : ""
        }>`
    )
    .join("");
}
function goToImage(index) {
  currentIndex = index;
  renderImage(currentIndex);
  updateDots(currentIndex);
}
dotsContainerEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    goToImage(parseInt(e.target.dataset.index));
  }
});

function updateDots(index) {
  const dots = dotsContainerEl.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    // Если текущий индекс (idx) совпадает с переданным индексом (index),
    // устанавливаем атрибут checked в true, иначе false
    dot.checked = idx === index;
  });
}

updateDots(currentIndex);
