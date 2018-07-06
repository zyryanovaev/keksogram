"use strict";
(function() {
  var DEFAULT_EFFECT_VALUE = 100;
  var DEFAULT_SCALE_VALUE = 100;
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
  
  var effectRadios = uploadImage.querySelectorAll("input[type=\"radio\"]");
  var effects = uploadImage.querySelector(".img-upload__effects");
  var preview = uploadImage.querySelector(".img-upload__preview");
  var checkedEffect = document.querySelector("input:checked");
  
  var hashtagsInput = uploadImage.querySelector(".text__hashtags")
  var uploadImageSubmitButton = uploadImage.querySelector("#upload-submit");
  
  var startCoord;
  var currentPositionX;
  
  var currentEffect = checkedEffect.value;
  
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
  
  var setPinPosition = function (percent) {
    scalePin.style.left = percent + "%";
    scaleLevel.style.width = percent + "%";
  };
  
  var onChangeEffect = function (evt) {
    var newEffect = evt.target.value;
    hideSlider(newEffect);
    setPinPosition (DEFAULT_EFFECT_VALUE);
    preview.classList.replace("effect-" + currentEffect, "effect-" + newEffect);
    setEffect (newEffect, DEFAULT_EFFECT_VALUE);
    currentEffect = newEffect;
  };
  
  var setEffect = function (effect, persent) {
    switch (effect) {
      case "chrome":
        preview.style.filter = "grayscale(" + persent/100 +")";
        break;
      case "sepia":
      preview.style.filter = "sepia(" + persent/100 +")";
        break;
      case "marvin":
        preview.style.filter = "invert(" + persent +"%)";
        break;
      case "phobos":
        preview.style.filter = "blur(" + persent/100 * 3 +"px)";
        break;
      case "heat":
        preview.style.filter = "brightness(" + (1 + persent/100 * 2) +")";
        break;  
      default:
      preview.style.filter = "";
    };
  };
  
  var onScalePinMouseMove = function (mouseMoveEvt) {
    mouseMoveEvt.preventDefault();
    var shiftX = mouseMoveEvt.clientX - startCoord;
    var newPositionX = currentPositionX + shiftX;
  
    if (newPositionX >= 0 && newPositionX <= scaleLine.clientWidth) {
      var positionInPercent = Math.floor((newPositionX * 100) / scaleLine.clientWidth);
      setPinPosition(positionInPercent);
      setEffect (currentEffect, positionInPercent);
    };
  };
  
  var onScalePinMouseUp = function (mouseUpEvt) {
    mouseUpEvt.preventDefault();
  
    document.removeEventListener("mousemove", onScalePinMouseMove);
    document.removeEventListener("mouseup", onScalePinMouseUp);
  };
  
  var onScalePinMouseDown = function (mouseDownEvt) {
    mouseDownEvt.preventDefault();
  
    startCoord = mouseDownEvt.clientX;
    currentPositionX = scalePin.offsetLeft; 
  
    document.addEventListener("mousemove", onScalePinMouseMove);
    document.addEventListener("mouseup", onScalePinMouseUp);
  };
  
  var hideSlider = function (selectedEffect) {
    selectedEffect === "none" ? scale.classList.add("hidden") : scale.classList.remove("hidden");
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
    effectRadios.forEach(function(radio) {
      radio.removeEventListener("change", onChangeEffect);
    });
    uploadFile.value = "";
    preview.style.transform = "scale(" + DEFAULT_SCALE_VALUE/100 + ")";
  };
  
  var openUploadImage = function () {
    uploadImage.classList.remove("hidden");
    document.addEventListener("keydown", onUploadImageEscPress);
    buttonMinus.addEventListener("click", onMinusClick);
    buttonPlus.addEventListener("click", onPlusClick);
  
    effectRadios.forEach(function(radio) {
      radio.addEventListener("change", onChangeEffect);
    });
  
    setEffect (checkedEffect.value, DEFAULT_EFFECT_VALUE);
    hideSlider(checkedEffect.value);
  
    scalePin.addEventListener("mousedown", onScalePinMouseDown);
  
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
}());



