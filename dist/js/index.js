(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _getFileForm = require('./module/get-file-form/get-file-form');

var _reset = require('./module/reset/reset');

var _dragHandlers = require('./module/drag-handlers/drag-handlers');

var $globalArea = $('.watermark__area');

$globalArea.on('dragover', (0, _dragHandlers.dragHandlers)().dragOverHandler).on('dragleave', (0, _dragHandlers.dragHandlers)().dragleaveHandler).on('drop', (0, _dragHandlers.dragHandlers)().dropHandler);

_getFileForm.$resetBtn.click(function (e) {
    (0, _reset.reset)();
});

},{"./module/drag-handlers/drag-handlers":2,"./module/get-file-form/get-file-form":3,"./module/reset/reset":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dragHandlers = undefined;

var _setDroppedFile = require('../set-dropped-file/set-dropped-file');

var isDragging = false,
    fileUploadContainer = $('.watermark__area'),
    dragOverClass = 'dragover';

var dragHandlers = exports.dragHandlers = function dragHandlers() {
    var removeDragging = function removeDragging() {
        if (isDragging) {
            fileUploadContainer.removeClass(dragOverClass);
            isDragging = false;
        }
    };

    return {
        dragOverHandler: function dragOverHandler(e) {
            e.stopPropagation();
            e.preventDefault();

            if (!isDragging) {
                fileUploadContainer.addClass(dragOverClass);
                isDragging = true;
            }
        },
        dragleaveHandler: function dragleaveHandler(e) {
            e.stopPropagation();
            e.preventDefault();

            removeDragging();
        },
        dropHandler: function dropHandler(e) {
            if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files) {
                e.stopPropagation();
                e.preventDefault();

                (0, _setDroppedFile.dropSelectFile)(e.originalEvent.dataTransfer.files);

                removeDragging();
            }
        }
    };
};

},{"../set-dropped-file/set-dropped-file":6}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setImage = setImage;
var $mainFileInput = exports.$mainFileInput = $('#fileToChange'),
    $mainImgPrev = exports.$mainImgPrev = $('.main-img-prev'),
    $waterImagePrev = exports.$waterImagePrev = $('.water-img-prev'),
    $markFileInput = exports.$markFileInput = $('#fileToTop'),
    $resetBtn = exports.$resetBtn = $('.button-reset');

function pushImg_1(evt) {
    var file = $mainFileInput[0].files[0];
    setImage(file, 300, 300);
    $markFileInput[0].setAttribute('onclick', 'return true');
};

function pushImg_2(evt) {
    var file = document.querySelector('#fileToTop').files[0];
    setImage(file, 200, 200);
};

var isMainImagePresent = exports.isMainImagePresent = function isMainImagePresent(mainTrue) {
    var present = false;

    return {
        isMainImage: function isMainImage() {
            if (mainTrue) {
                present = true;
            }
            return present;
        }
    };
};
var mainPresent = false;
function setImage(file, width, height) {
    var reader = new FileReader();

    reader.onload = function (event) {
        var dataURI = event.target.result,
            canvas = document.querySelector('.watermark__canvas'),
            ctx = canvas.getContext('2d'),
            img = new Image();

        img.onload = function () {
            ctx.drawImage(img, 0, 0, width, height);
        };
        img.src = dataURI;

        if (!mainPresent) {
            $mainImgPrev.attr("src", dataURI);
            if (!$mainImgPrev.hasClass('main-img-prev_show')) {
                $mainImgPrev.addClass('main-img-prev_show');
            };
            mainPresent = true;
        } else {
            $waterImagePrev.attr("src", dataURI);
            if (!$waterImagePrev.hasClass('water-img-prev_show')) {
                $waterImagePrev.addClass('water-img-prev_show');
            };
        }
    };
    reader.readAsDataURL(file);
};

if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('fileToChange').addEventListener('change', pushImg_1, false);
    document.getElementById('fileToTop').addEventListener('change', pushImg_2, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isImageFile = exports.isImageFile = function isImageFile(file) {
    if (file.type.indexOf('image/') === 0) {
        return true;
    }
    return false;
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reset = reset;

var _getFileForm = require('../get-file-form/get-file-form');

function reset() {
    $(_getFileForm.$mainImgPrev[0]).attr("src", '');
    $(_getFileForm.$mainFileInput[0]).val('');
    $(_getFileForm.$markFileInput[0]).val('');
    console.log('$mainFileInput', _getFileForm.$mainFileInput);
};

},{"../get-file-form/get-file-form":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dropSelectFile = undefined;

var _isImageFile = require("../is-image-file/is-image-file");

var _getFileForm = require("../get-file-form/get-file-form");

var dropSelectFile = exports.dropSelectFile = function dropSelectFile(files) {
    if (files && files[0]) {
        for (var i = 0; i < files.length; i++) {
            if ((0, _isImageFile.isImageFile)(files[i])) {
                (0, _getFileForm.setImage)(files[i]);
            }
        }
    }
};

},{"../get-file-form/get-file-form":3,"../is-image-file/is-image-file":4}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2RyYWctaGFuZGxlcnMvZHJhZy1oYW5kbGVycy5qcyIsInNyYy9qcy9tb2R1bGUvZ2V0LWZpbGUtZm9ybS9nZXQtZmlsZS1mb3JtLmpzIiwic3JjL2pzL21vZHVsZS9pcy1pbWFnZS1maWxlL2lzLWltYWdlLWZpbGUuanMiLCJzcmMvanMvbW9kdWxlL3Jlc2V0L3Jlc2V0LmpzIiwic3JjL2pzL21vZHVsZS9zZXQtZHJvcHBlZC1maWxlL3NldC1kcm9wcGVkLWZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUVBLElBQUksY0FBYyxFQUFFLGtCQUFGLENBQWxCOztBQUVBLFlBQ0ssRUFETCxDQUNRLFVBRFIsRUFDb0Isa0NBQWUsZUFEbkMsRUFFSyxFQUZMLENBRVEsV0FGUixFQUVxQixrQ0FBZSxnQkFGcEMsRUFHSyxFQUhMLENBR1EsTUFIUixFQUdnQixrQ0FBZSxXQUgvQjs7QUFLQSx1QkFBVSxLQUFWLENBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3ZCO0FBQ0gsQ0FGRDs7O0FDYkE7Ozs7Ozs7QUFFQTs7QUFFQSxJQUFJLGFBQWEsS0FBakI7QUFBQSxJQUNJLHNCQUFzQixFQUFFLGtCQUFGLENBRDFCO0FBQUEsSUFFSSxnQkFBZ0IsVUFGcEI7O0FBTU8sSUFBSSxzQ0FBZSxTQUFmLFlBQWUsR0FBVTtBQUNoQyxRQUFJLGlCQUFpQixTQUFqQixjQUFpQixHQUFVO0FBQzNCLFlBQUksVUFBSixFQUFnQjtBQUNaLGdDQUFvQixXQUFwQixDQUFnQyxhQUFoQztBQUNBLHlCQUFhLEtBQWI7QUFDSDtBQUNKLEtBTEQ7O0FBT0EsV0FBTztBQUNILHlCQUFpQix5QkFBVSxDQUFWLEVBQVk7QUFDekIsY0FBRSxlQUFGO0FBQ0EsY0FBRSxj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QUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNuQyxnQkFBSSw4QkFBWSxNQUFNLENBQU4sQ0FBWixDQUFKLEVBQTJCO0FBQ3ZCLDJDQUFTLE1BQU0sQ0FBTixDQUFUO0FBQ0g7QUFDSjtBQUNKO0FBQ0osQ0FSTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblxuaW1wb3J0IHskcmVzZXRCdG59IGZyb20gJy4vbW9kdWxlL2dldC1maWxlLWZvcm0vZ2V0LWZpbGUtZm9ybSc7XG5pbXBvcnQge3Jlc2V0fSBmcm9tICcuL21vZHVsZS9yZXNldC9yZXNldCc7XG5pbXBvcnQge2RyYWdIYW5kbGVyc30gZnJvbSAnLi9tb2R1bGUvZHJhZy1oYW5kbGVycy9kcmFnLWhhbmRsZXJzJ1xuXG5sZXQgJGdsb2JhbEFyZWEgPSAkKCcud2F0ZXJtYXJrX19hcmVhJyk7XG5cbiRnbG9iYWxBcmVhXG4gICAgLm9uKCdkcmFnb3ZlcicsIGRyYWdIYW5kbGVycygpLmRyYWdPdmVySGFuZGxlcilcbiAgICAub24oJ2RyYWdsZWF2ZScsIGRyYWdIYW5kbGVycygpLmRyYWdsZWF2ZUhhbmRsZXIpXG4gICAgLm9uKCdkcm9wJywgZHJhZ0hhbmRsZXJzKCkuZHJvcEhhbmRsZXIpO1xuXG4kcmVzZXRCdG4uY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgcmVzZXQoKTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge2Ryb3BTZWxlY3RGaWxlfSBmcm9tIFwiLi4vc2V0LWRyb3BwZWQtZmlsZS9zZXQtZHJvcHBlZC1maWxlXCI7XG5cbmxldCBpc0RyYWdnaW5nID0gZmFsc2UsXG4gICAgZmlsZVVwbG9hZENvbnRhaW5lciA9ICQoJy53YXRlcm1hcmtfX2FyZWEnKSxcbiAgICBkcmFnT3ZlckNsYXNzID0gJ2RyYWdvdmVyJztcbiAgICBcblxuXG5leHBvcnQgbGV0IGRyYWdIYW5kbGVycyA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHJlbW92ZURyYWdnaW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGZpbGVVcGxvYWRDb250YWluZXIucmVtb3ZlQ2xhc3MoZHJhZ092ZXJDbGFzcyk7XG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZHJhZ092ZXJIYW5kbGVyOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRDb250YWluZXIuYWRkQ2xhc3MoZHJhZ092ZXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdsZWF2ZUhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIHJlbW92ZURyYWdnaW5nKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRyb3BIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgJiYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcykge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBkcm9wU2VsZWN0RmlsZShlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVtb3ZlRHJhZ2dpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn07IiwiZXhwb3J0IGxldCAkbWFpbkZpbGVJbnB1dCA9ICQoJyNmaWxlVG9DaGFuZ2UnKSxcbiAgICAkbWFpbkltZ1ByZXYgPSAkKCcubWFpbi1pbWctcHJldicpLFxuICAgICR3YXRlckltYWdlUHJldiA9ICQoJy53YXRlci1pbWctcHJldicpLFxuICAgICRtYXJrRmlsZUlucHV0ID0gJCgnI2ZpbGVUb1RvcCcpLFxuICAgICRyZXNldEJ0biA9ICQoJy5idXR0b24tcmVzZXQnKTtcbiAgICBcblxuZnVuY3Rpb24gcHVzaEltZ18xKGV2dCkge1xuICAgIHZhciBmaWxlID0gJG1haW5GaWxlSW5wdXRbMF0uZmlsZXNbMF07XG4gICAgc2V0SW1hZ2UoZmlsZSwgMzAwLCAzMDApO1xuICAgICAgICAkbWFya0ZpbGVJbnB1dFswXS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCAncmV0dXJuIHRydWUnKTtcbiB9O1xuXG4gZnVuY3Rpb24gcHVzaEltZ18yKGV2dCkge1xuICAgICB2YXIgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlVG9Ub3AnKS5maWxlc1swXTtcbiAgICAgc2V0SW1hZ2UoZmlsZSwgMjAwLCAyMDApO1xuIH07XG4gXG4gZXhwb3J0IGxldCBpc01haW5JbWFnZVByZXNlbnQgPSBmdW5jdGlvbihtYWluVHJ1ZSl7XG4gICAgIGxldCBwcmVzZW50ID0gZmFsc2U7XG4gICAgIFxuICAgICByZXR1cm4ge1xuICAgICAgICAgaXNNYWluSW1hZ2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgaWYobWFpblRydWUpe1xuICAgICAgICAgICAgICAgICBwcmVzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgcmV0dXJuIHByZXNlbnQ7XG4gICAgICAgICB9XG4gICAgIH1cbiB9O1xubGV0IG1haW5QcmVzZW50ID0gZmFsc2U7XG4gZXhwb3J0IGZ1bmN0aW9uIHNldEltYWdlKGZpbGUsIHdpZHRoLCBoZWlnaHQpIHtcbiBcdFx0bGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cblxuICAgIFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHRcdHZhciBkYXRhVVJJID0gZXZlbnQudGFyZ2V0LnJlc3VsdCxcbiAgICBcdFx0ICAgIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXRlcm1hcmtfX2NhbnZhcycpLFxuICAgIFx0XHQgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgXHRcdFx0aW1nID0gbmV3IEltYWdlKCk7XG5cblx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHR9O1xuXHRcdFx0aW1nLnNyYyA9IGRhdGFVUkk7XG5cdFx0XHRcblx0XHRcdFxuXHRcdFx0aWYoIW1haW5QcmVzZW50KXtcblx0XHRcdCAgICAkbWFpbkltZ1ByZXYuYXR0cihcInNyY1wiLCBkYXRhVVJJKTtcbiAgICAgICAgICAgICAgICBpZighJG1haW5JbWdQcmV2Lmhhc0NsYXNzKCdtYWluLWltZy1wcmV2X3Nob3cnKSl7XG4gICAgICAgICAgICAgICAgICAgICRtYWluSW1nUHJldi5hZGRDbGFzcygnbWFpbi1pbWctcHJldl9zaG93JylcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG1haW5QcmVzZW50ID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHQgICAgJHdhdGVySW1hZ2VQcmV2LmF0dHIoXCJzcmNcIiwgZGF0YVVSSSk7XG5cdFx0XHQgICAgaWYoISR3YXRlckltYWdlUHJldi5oYXNDbGFzcygnd2F0ZXItaW1nLXByZXZfc2hvdycpKXtcbiAgICAgICAgICAgICAgICAgICAgJHdhdGVySW1hZ2VQcmV2LmFkZENsYXNzKCd3YXRlci1pbWctcHJldl9zaG93JylcbiAgICAgICAgICAgICAgICB9O1xuXHRcdFx0ICAgIFxuXHRcdFx0fVxuXHRcdFx0XG4gICAgICAgIFxuICAgIFx0fTtcbiAgICBcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuIH07XG5cblxuaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVRvQ2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcHVzaEltZ18xLCBmYWxzZSk7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlVG9Ub3AnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwdXNoSW1nXzIsIGZhbHNlKTtcbn0gZWxzZSB7XG5cdGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKTtcbn07IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBsZXQgaXNJbWFnZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UvJykgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTsiLCJcbmltcG9ydCB7JG1haW5GaWxlSW5wdXR9IGZyb20gJy4uL2dldC1maWxlLWZvcm0vZ2V0LWZpbGUtZm9ybSc7XG5pbXBvcnQgeyRtYWluSW1nUHJldn0gZnJvbSAnLi4vZ2V0LWZpbGUtZm9ybS9nZXQtZmlsZS1mb3JtJztcbmltcG9ydCB7JG1hcmtGaWxlSW5wdXR9IGZyb20gJy4uL2dldC1maWxlLWZvcm0vZ2V0LWZpbGUtZm9ybSc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgICQoJG1haW5JbWdQcmV2WzBdKS5hdHRyKFwic3JjXCIsICcnKTtcbiAgICAkKCRtYWluRmlsZUlucHV0WzBdKS52YWwoJycpO1xuICAgICQoJG1hcmtGaWxlSW5wdXRbMF0pLnZhbCgnJyk7XG4gICAgY29uc29sZS5sb2coJyRtYWluRmlsZUlucHV0JywgJG1haW5GaWxlSW5wdXQpO1xufTtcbiIsImltcG9ydCB7aXNJbWFnZUZpbGV9IGZyb20gJy4uL2lzLWltYWdlLWZpbGUvaXMtaW1hZ2UtZmlsZSdcbmltcG9ydCB7c2V0SW1hZ2V9IGZyb20gXCIuLi9nZXQtZmlsZS1mb3JtL2dldC1maWxlLWZvcm1cIjtcblxuZXhwb3J0IGxldCBkcm9wU2VsZWN0RmlsZSA9IGZ1bmN0aW9uIChmaWxlcyl7XG4gICAgaWYgKGZpbGVzICYmIGZpbGVzWzBdKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpc0ltYWdlRmlsZShmaWxlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZShmaWxlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59OyJdfQ==

//# sourceMappingURL=maps/index.js.map
