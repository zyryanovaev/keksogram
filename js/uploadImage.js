"use strict";

var DEFAULT_COEFFICIENT = 1;
var pictureScale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

var uploadFile = document.querySelector("#upload-file");
var uploadImage = document.querySelector(".img-upload__overlay");
var uploadCancel = uploadImage.querySelector("#upload-cancel");

var buttonMinus = uploadImage.querySelector(".resize__control--minus");
var buttonPlus = uploadImage.querySelector(".resize__control--plus");
var resizeValue = uploadImage.querySelector(".resize__control--value");

var scale = uploadImage.querySelector(".img-upload__scale");
var scaleLine = uploadImage.querySelector(".scale__line");
var scaleLevel = uploadImage.querySelector(".scale__level");
var scalePin = uploadImage.querySelector(".scale__pin");
var scaleValue = uploadImage.querySelector(".scale__value");

var effectsRadio = uploadImage.querySelector (".effects__radio"); 
var effects = uploadImage.querySelector(".img-upload__effects");
var preview = uploadImage.querySelector(".img-upload__preview");

var currentEffect = document.querySelector("input:checked").id;
var newEffect;

var onScalePinMouseUp = function () {
};

var setEffect = function () {
  var selectedEffect = document.querySelector("input:checked").value;
  switch (selectedEffect) {
    case "chrome":
      newEffect = "effects__preview--chrome";
      break;
    case "sepia":
      newEffect = "effects__preview--sepia";
      break;
    case "marvin":
      newEffect = "effects__preview--marvin";
      break;
    case "phobos":
      newEffect = "effects__preview--phobos";
      break;
    case "heat":
      newEffect = "effects__preview--heat";
      break;  
    default:
      newEffect = "effects__preview--none";
  };
  preview.classList.replace(currentEffect, newEffect);
  newEffect === "effects__preview--none" ? scale.classList.add("hidden") : scale.classList.remove("hidden");
  currentEffect = newEffect;
};

var resizeUploadImage = function (newSize) {
  resizeValue.value = newSize + "%";
  preview.style.transform = "scale(" + newSize/100 + ")";
};

var onPlusClick = function () {
  var size = parseInt(resizeValue.value);
  if (size < pictureScale.MAX)
    resizeUploadImage(size + pictureScale.STEP);
};

var onMinusClick = function () {
  var size = parseInt(resizeValue.value);
  if (size > pictureScale.MIN)
    resizeUploadImage(size - pictureScale.STEP);
};

var onUploadImageEscPress = function (evt) {
  if (evt.keyCode === 27) {
    cancelUploadImage();
  };
};

var cancelUploadImage = function () {
  uploadImage.classList.add("hidden");
  document.removeEventListener("keydown", onUploadImageEscPress);
  buttonMinus.removeEventListener("click", onMinusClick);
  buttonPlus.removeEventListener("click", onPlusClick);
  uploadFile.value = "";
  preview.style.transform = "scale(" + DEFAULT_COEFFICIENT + ")";
};

var openUploadImage = function () {
  uploadImage.classList.remove("hidden");
  document.addEventListener("keydown", onUploadImageEscPress);
  buttonMinus.addEventListener("click", onMinusClick);
  buttonPlus.addEventListener("click", onPlusClick);
  effects.addEventListener("click", function () {
    setEffect ();
  });
  setEffect ();
  scalePin.addEventListener("mouseup", onScalePinMouseUp);
};

uploadFile.addEventListener("change", function () {
  openUploadImage();
});

uploadCancel.addEventListener("click", function () {
  cancelUploadImage();
});

