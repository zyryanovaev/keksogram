"use strict";

(function() {
  var NEW_PHOTOS_COUNT = 10;
  var DEBOUNCE_INTERVAL = 500;

  var filters = document.querySelector(".img-filters");    
  var filterPopular = document.querySelector("#filter-popular");
  var filterNew = document.querySelector("#filter-new");
  var filterDiscussed = document.querySelector("#filter-discussed");
  var checkedFilter = document.querySelector(".img-filters__button--active");
  var popularPhotos;
  var lastTimeout;

  var setDiscussedFilter = function() {
    checkedFilter.classList.remove("img-filters__button--active");
    filterDiscussed.classList.add("img-filters__button--active");
    checkedFilter = filterDiscussed;

    var discussedPhotos = popularPhotos.slice();
    discussedPhotos.sort (function(left, right) {
      return right.comments.length - left.comments.length;
    });

    window.picture.render(discussedPhotos);
  }; 

  var setNewFilter = function() {
    checkedFilter.classList.remove("img-filters__button--active");
    filterNew.classList.add("img-filters__button--active");
    checkedFilter = filterNew;

    var newPhotos = popularPhotos.slice();
    newPhotos.sort (function() {
      return  Math.random() - 0.5;
    });

    window.picture.render(newPhotos.slice(0, NEW_PHOTOS_COUNT));
  }; 

  var setPopularFilter = function() {
    checkedFilter.classList.remove("img-filters__button--active");
    filterPopular.classList.add("img-filters__button--active");
    checkedFilter = filterPopular;

    window.picture.render(popularPhotos);
  };

  var debounce = function(setFilter) {
    if (lastTimeout)
      window.clearTimeout(lastTimeout);
    lastTimeout = window.setTimeout(function() {
      setFilter();
    }, DEBOUNCE_INTERVAL);
  };

  var showFilters = function() {
    filters.classList.remove("img-filters--inactive");
    filterPopular.addEventListener("click", function(){
      debounce(setPopularFilter)
    });
    filterNew.addEventListener("click", function(){
      debounce(setNewFilter)
    });
    filterDiscussed.addEventListener("click",function(){
      debounce(setDiscussedFilter)
    });
  };

  var renderPhoto = function(photos) {
    popularPhotos = photos;
    showFilters();
    window.picture.render(popularPhotos);
  };

  window.filter = {
    render: renderPhoto
  };
}());