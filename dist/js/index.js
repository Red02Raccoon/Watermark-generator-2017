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

        $mainImgPrev.attr("src", dataURI);
        if (!$mainImgPrev.hasClass('main-img-prev_show')) {
            $mainImgPrev.addClass('main-img-prev_show');
        };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2RyYWctaGFuZGxlcnMvZHJhZy1oYW5kbGVycy5qcyIsInNyYy9qcy9tb2R1bGUvZ2V0LWZpbGUtZm9ybS9nZXQtZmlsZS1mb3JtLmpzIiwic3JjL2pzL21vZHVsZS9pcy1pbWFnZS1maWxlL2lzLWltYWdlLWZpbGUuanMiLCJzcmMvanMvbW9kdWxlL3Jlc2V0L3Jlc2V0LmpzIiwic3JjL2pzL21vZHVsZS9zZXQtZHJvcHBlZC1maWxlL3NldC1kcm9wcGVkLWZpbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBOztBQUNBOztBQUNBOztBQUVBLElBQUksY0FBYyxFQUFFLGtCQUFGLENBQWxCOztBQUVBLFlBQ0ssRUFETCxDQUNRLFVBRFIsRUFDb0Isa0NBQWUsZUFEbkMsRUFFSyxFQUZMLENBRVEsV0FGUixFQUVxQixrQ0FBZSxnQkFGcEMsRUFHSyxFQUhMLENBR1EsTUFIUixFQUdnQixrQ0FBZSxXQUgvQjs7QUFTQSx1QkFBVSxLQUFWLENBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQ3ZCO0FBQ0gsQ0FGRDs7O0FDakJBOzs7Ozs7O0FBRUE7O0FBRUEsSUFBSSxhQUFhLEtBQWpCO0FBQUEsSUFDSSxzQkFBc0IsRUFBRSxrQkFBRixDQUQxQjtBQUFBLElBRUksZ0JBQWdCLFVBRnBCOztBQU1PLElBQUksc0NBQWUsU0FBZixZQUFlLEdBQVU7QUFDaEMsUUFBSSxpQkFBaUIsU0FBakIsY0FBaUIsR0FBVTtBQUMzQixZQUFJLFVBQUosRUFBZ0I7QUFDWixnQ0FBb0IsV0FBcEIsQ0FBZ0MsYUFBaEM7QUFDQSx5QkFBYSxLQUFiO0FBQ0g7QUFDSixLQUxEOztBQU9BLFdBQU87QUFDSCx5QkFBaUIseUJBQVUsQ0FBVixFQUFZO0FBQ3pCLGNBQUUsZUFBRjtBQUNBLGNBQUUs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LE9BQVYsQ0FBa0IsUUFBbEIsTUFBZ0MsQ0FBcEMsRUFBdUM7QUFDbkMsZUFBTyxJQUFQO0FBQ0g7QUFDRCxXQUFPLEtBQVA7QUFDSCxDQUxNOzs7Ozs7OztRQ0tTLEssR0FBQSxLOztBQU5oQjs7QUFNTyxTQUFTLEtBQVQsR0FBa0I7QUFDckIsTUFBRSwwQkFBYSxDQUFiLENBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsS0FBeEIsRUFBK0IsRUFBL0I7QUFDQSxNQUFFLDRCQUFlLENBQWYsQ0FBRixFQUFxQixHQUFyQixDQUF5QixFQUF6QjtBQUNBLE1BQUUsNEJBQWUsQ0FBZixDQUFGLEVBQXFCLEdBQXJCLENBQXlCLEVBQXpCO0FBQ0EsWUFBUSxHQUFSLENBQVksZ0JBQVo7QUFDSDs7Ozs7Ozs7OztBQ1pEOztBQUNBOztBQUVPLElBQUksMENBQWlCLFNBQWpCLGNBQWlCLENBQVUsS0FBVixFQUFnQjtBQUN4QyxRQUFJLFNBQVMsTUFBTSxDQUFOLENBQWIsRUFBdUI7QUFDbkIsYUFBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDbkMsZ0JBQUksOEJBQVksTUFBTSxDQUFOLENBQVosQ0FBSixFQUEyQjtBQUN2QiwyQ0FBUyxNQUFNLENBQU4sQ0FBVDtBQUNIO0FBQ0o7QUFDSjtBQUNKLENBUk0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5cbmltcG9ydCB7JHJlc2V0QnRufSBmcm9tICcuL21vZHVsZS9nZXQtZmlsZS1mb3JtL2dldC1maWxlLWZvcm0nO1xuaW1wb3J0IHtyZXNldH0gZnJvbSAnLi9tb2R1bGUvcmVzZXQvcmVzZXQnO1xuaW1wb3J0IHtkcmFnSGFuZGxlcnN9IGZyb20gJy4vbW9kdWxlL2RyYWctaGFuZGxlcnMvZHJhZy1oYW5kbGVycydcblxubGV0ICRnbG9iYWxBcmVhID0gJCgnLndhdGVybWFya19fYXJlYScpO1xuXG4kZ2xvYmFsQXJlYVxuICAgIC5vbignZHJhZ292ZXInLCBkcmFnSGFuZGxlcnMoKS5kcmFnT3ZlckhhbmRsZXIpXG4gICAgLm9uKCdkcmFnbGVhdmUnLCBkcmFnSGFuZGxlcnMoKS5kcmFnbGVhdmVIYW5kbGVyKVxuICAgIC5vbignZHJvcCcsIGRyYWdIYW5kbGVycygpLmRyb3BIYW5kbGVyKTtcblxuXG5cblxuXG4kcmVzZXRCdG4uY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgcmVzZXQoKTtcbn0pO1xuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQge2Ryb3BTZWxlY3RGaWxlfSBmcm9tIFwiLi4vc2V0LWRyb3BwZWQtZmlsZS9zZXQtZHJvcHBlZC1maWxlXCI7XG5cbmxldCBpc0RyYWdnaW5nID0gZmFsc2UsXG4gICAgZmlsZVVwbG9hZENvbnRhaW5lciA9ICQoJy53YXRlcm1hcmtfX2FyZWEnKSxcbiAgICBkcmFnT3ZlckNsYXNzID0gJ2RyYWdvdmVyJztcbiAgICBcblxuXG5leHBvcnQgbGV0IGRyYWdIYW5kbGVycyA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHJlbW92ZURyYWdnaW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIGZpbGVVcGxvYWRDb250YWluZXIucmVtb3ZlQ2xhc3MoZHJhZ092ZXJDbGFzcyk7XG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZHJhZ092ZXJIYW5kbGVyOiBmdW5jdGlvbiAoZSl7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRDb250YWluZXIuYWRkQ2xhc3MoZHJhZ092ZXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGRyYWdsZWF2ZUhhbmRsZXI6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIHJlbW92ZURyYWdnaW5nKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGRyb3BIYW5kbGVyOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIgJiYgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcykge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBkcm9wU2VsZWN0RmlsZShlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcmVtb3ZlRHJhZ2dpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn07IiwiZXhwb3J0IGxldCAkbWFpbkZpbGVJbnB1dCA9ICQoJyNmaWxlVG9DaGFuZ2UnKSxcbiAgICAkbWFpbkltZ1ByZXYgPSAkKCcubWFpbi1pbWctcHJldicpLFxuICAgICRtYXJrRmlsZUlucHV0ID0gJCgnI2ZpbGVUb1RvcCcpLFxuICAgICRyZXNldEJ0biA9ICQoJy5idXR0b24tcmVzZXQnKTtcbiAgICBcblxuZnVuY3Rpb24gcHVzaEltZ18xKGV2dCkge1xuICAgIHZhciBmaWxlID0gJG1haW5GaWxlSW5wdXRbMF0uZmlsZXNbMF07XG4gICAgc2V0SW1hZ2UoZmlsZSwgMzAwLCAzMDApO1xuICAgICAgICAkbWFya0ZpbGVJbnB1dFswXS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCAncmV0dXJuIHRydWUnKTtcbiB9O1xuXG4gZnVuY3Rpb24gcHVzaEltZ18yKGV2dCkge1xuICAgICB2YXIgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlVG9Ub3AnKS5maWxlc1swXTtcbiAgICAgc2V0SW1hZ2UoZmlsZSwgMjAwLCAyMDApO1xuIH07XG5cbiBleHBvcnQgZnVuY3Rpb24gc2V0SW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCkge1xuIFx0XHR2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHRcdHZhciBkYXRhVVJJID0gZXZlbnQudGFyZ2V0LnJlc3VsdCxcbiAgICBcdFx0ICAgIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXRlcm1hcmtfX2NhbnZhcycpLFxuICAgIFx0XHQgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgXHRcdFx0aW1nID0gbmV3IEltYWdlKCk7XG5cblx0XHRcdGltZy5vbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0XHR9O1xuXHRcdFx0aW1nLnNyYyA9IGRhdGFVUkk7XG5cdFx0XHRcblx0XHRcdCRtYWluSW1nUHJldi5hdHRyKFwic3JjXCIsIGRhdGFVUkkpO1xuICAgICAgICAgICAgaWYoISRtYWluSW1nUHJldi5oYXNDbGFzcygnbWFpbi1pbWctcHJldl9zaG93Jykpe1xuICAgICAgICAgICAgICAgICRtYWluSW1nUHJldi5hZGRDbGFzcygnbWFpbi1pbWctcHJldl9zaG93JylcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgIFx0fTtcbiAgICBcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuIH07XG5cblxuaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVRvQ2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcHVzaEltZ18xLCBmYWxzZSk7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlVG9Ub3AnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwdXNoSW1nXzIsIGZhbHNlKTtcbn0gZWxzZSB7XG5cdGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKTtcbn07IiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBsZXQgaXNJbWFnZUZpbGUgPSBmdW5jdGlvbiAoZmlsZSkge1xuICAgIGlmIChmaWxlLnR5cGUuaW5kZXhPZignaW1hZ2UvJykgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTsiLCJcbmltcG9ydCB7JG1haW5GaWxlSW5wdXR9IGZyb20gJy4uL2dldC1maWxlLWZvcm0vZ2V0LWZpbGUtZm9ybSc7XG5pbXBvcnQgeyRtYWluSW1nUHJldn0gZnJvbSAnLi4vZ2V0LWZpbGUtZm9ybS9nZXQtZmlsZS1mb3JtJztcbmltcG9ydCB7JG1hcmtGaWxlSW5wdXR9IGZyb20gJy4uL2dldC1maWxlLWZvcm0vZ2V0LWZpbGUtZm9ybSc7XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgICQoJG1haW5JbWdQcmV2WzBdKS5hdHRyKFwic3JjXCIsICcnKTtcbiAgICAkKCRtYWluRmlsZUlucHV0WzBdKS52YWwoJycpO1xuICAgICQoJG1hcmtGaWxlSW5wdXRbMF0pLnZhbCgnJyk7XG4gICAgY29uc29sZS5sb2coJyRtYWluRmlsZUlucHV0JywgJG1haW5GaWxlSW5wdXQpO1xufTtcbiIsImltcG9ydCB7aXNJbWFnZUZpbGV9IGZyb20gJy4uL2lzLWltYWdlLWZpbGUvaXMtaW1hZ2UtZmlsZSdcbmltcG9ydCB7c2V0SW1hZ2V9IGZyb20gXCIuLi9nZXQtZmlsZS1mb3JtL2dldC1maWxlLWZvcm1cIjtcblxuZXhwb3J0IGxldCBkcm9wU2VsZWN0RmlsZSA9IGZ1bmN0aW9uIChmaWxlcyl7XG4gICAgaWYgKGZpbGVzICYmIGZpbGVzWzBdKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpc0ltYWdlRmlsZShmaWxlc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBzZXRJbWFnZShmaWxlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59OyJdfQ==

//# sourceMappingURL=maps/index.js.map
