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

var hashtagsInput = uploadImage.querySelector(".text__hashtags")
var uploadImageSubmitButton = uploadImage.querySelector("#upload-submit");

var currentEffect = document.querySelector("input:checked").id;
var newEffect;

var isDuplicateValues = function(arr) {
  var sortedArray = arr.slice(0).sort();
  var previousValue;
  for (var i = 0; i < sortedArray.length; i++) {
    if (previousValue === sortedArray[i]) {
      return true;
    }
    previousValue = sortedArray[i];
  }
  return false;
};

var  checkHashtags = function () {
  var hashtagsValue = hashtagsInput.value.trim().toLowerCase();

  if (hashtagsValue.length === 0) {
    hashtagsInput.classList.remove("error");
    hashtagsInput.setCustomValidity("");
    return;
  };

  var hashtags = hashtagsValue.split(" ");

  var isHashtagWithoutHash = hashtags.some(function(item) {
    return item[0] !== "#";
  });

  if (isHashtagWithoutHash) {
    hashtagsInput.classList.add("error");
    hashtagsInput.setCustomValidity("Хэш-тег должен начинается с символа # (решётки)");
    return;
  }

  var isHashtagContainOnlyHash = hashtags.some(function(item) {
    return item === "#";
  });

  if (isHashtagContainOnlyHash) {
    hashtagsInput.classList.add("error");
    hashtagsInput.setCustomValidity("Хеш-тег не может состоять только из одной решётки");
    return;
  };

  var isHashtagVeryLong = hashtags.some(function(item) {
    return item.length > 20;
  });

  if (isHashtagVeryLong) {
    hashtagsInput.classList.add("error");
    hashtagsInput.setCustomValidity("Максимальная длина одного хэш-тега 20 символов, включая решётку");
    return;
  };


  if (hashtags.length > 5) {
    hashtagsInput.classList.add("error");
    hashtagsInput.setCustomValidity("Нельзя указать больше пяти хэш-тегов");
    return;
  };

  if (isDuplicateValues(hashtags)) {
    hashtagsInput.classList.add("error");
    hashtagsInput.setCustomValidity("Один и тот же хэш-тег не может быть использован дважды");
    return;
  };

  hashtagsInput.classList.remove("error");
  hashtagsInput.setCustomValidity("");
}; 

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
  if (evt.keyCode === 27 && !evt.target.classList.contains("img-upload__text")) {
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

  hashtagsInput.addEventListener("input", function () {
    hashtagsInput.setCustomValidity("");
  });  

  uploadImageSubmitButton.addEventListener("click", function () {
      checkHashtags ();
  });
}; 

uploadFile.addEventListener("change", function () {
  openUploadImage();
});

uploadCancel.addEventListener("click", function () {
  cancelUploadImage();
});


