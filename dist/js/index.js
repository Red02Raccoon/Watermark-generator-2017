(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _js = require("./module/js1");

var _nastya = require("./module/nastya/nastya");

console.log('11111', _js.a);
console.log('read', _nastya.read);

},{"./module/js1":2,"./module/nastya/nastya":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Andrey on 02.07.2017.
 */
var a = 2;

exports.a = a;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.read = read;
var $mainFileInput = $('#fileToChange'),
    $mainImgPrev = $('.main-img-prev'),
    $markFileInput = $('#fileToTop');
var $resetBtn = exports.$resetBtn = $('.button-reset');

function pushImg_1(evt) {
    var file = $mainFileInput[0].files[0];
    setImage(file, 300, 300);
    $markFileInput[0].setAttribute('onclick', 'return true');
};

function pushImg_2(evt) {
    var file = document.querySelector('#fileToTop').files[0];
    setImage(file, 200, 200);
};

function read(file, width, height) {
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

        $mainImgPrev.attr("src", uri);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiLCJzcmMvanMvbW9kdWxlL2pzMS5qcyIsInNyYy9qcy9tb2R1bGUvbmFzdHlhL25hc3R5YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQ0E7O0FBR0E7O0FBSUEsUUFBUSxHQUFSLENBQVksT0FBWjtBQUNBLFFBQVEsR0FBUixDQUFZLE1BQVo7Ozs7Ozs7O0FDVEE7OztBQUdBLElBQUksSUFBSSxDQUFSOztRQUVRLEMsR0FBQSxDOzs7Ozs7OztRQ1lTLEksR0FBQSxJO0FBakJqQixJQUFJLGlCQUFpQixFQUFFLGVBQUYsQ0FBckI7QUFBQSxJQUNJLGVBQWUsRUFBRSxnQkFBRixDQURuQjtBQUFBLElBRUksaUJBQWlCLEVBQUUsWUFBRixDQUZyQjtBQUdXLElBQUksZ0NBQVksRUFBRSxlQUFGLENBQWhCOztBQUdYLFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUNwQixRQUFJLE9BQU8sZUFBZSxDQUFmLEVBQWtCLEtBQWxCLENBQXdCLENBQXhCLENBQVg7QUFDQSxhQUFTLElBQVQsRUFBZSxHQUFmLEVBQW9CLEdBQXBCO0FBQ0ksbUJBQWUsQ0FBZixFQUFrQixZQUFsQixDQUErQixTQUEvQixFQUEwQyxhQUExQztBQUNOOztBQUVELFNBQVMsU0FBVCxDQUFtQixHQUFuQixFQUF3QjtBQUNwQixRQUFJLE9BQU8sU0FBUyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLEtBQXJDLENBQTJDLENBQTNDLENBQVg7QUFDQSxhQUFTLElBQVQsRUFBZSxHQUFmLEVBQW9CLEdBQXBCO0FBQ0g7O0FBRU0sU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQixLQUFwQixFQUEyQixNQUEzQixFQUFtQztBQUN4QyxRQUFLLFNBQVMsSUFBSSxVQUFKLEVBQWQ7O0FBRUUsV0FBTyxNQUFQLEdBQWdCLFVBQVMsS0FBVCxFQUFnQjtBQUMvQixZQUFJLFVBQVUsTUFBTSxNQUFOLENBQWEsTUFBM0I7QUFBQSxZQUNJLFNBQVMsU0FBUyxhQUFULENBQXVCLG9CQUF2QixDQURiO0FBQUEsWUFFQyxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUZQO0FBQUEsWUFHQyxNQUFNLElBQUksS0FBSixFQUhQOztBQUtILFlBQUksTUFBSixHQUFhLFlBQVU7QUFDdEIsZ0JBQUksU0FBSixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsS0FBekIsRUFBZ0MsTUFBaEM7QUFDQSxTQUZEO0FBR0EsWUFBSSxHQUFKLEdBQVUsT0FBVjs7QUFFQSxxQkFBYSxJQUFiLENBQWtCLEtBQWxCLEVBQXlCLEdBQXpCO0FBQ1MsWUFBRyxDQUFDLGFBQWEsUUFBYixDQUFzQixvQkFBdEIsQ0FBSixFQUFnRDtBQUM1Qyx5QkFBYSxRQUFiLENBQXNCLG9CQUF0QjtBQUNIO0FBRVAsS0FoQkQ7QUFpQkEsV0FBTyxhQUFQLENBQXFCLElBQXJCO0FBQ0g7O0FBR0YsSUFBSSxPQUFPLElBQVAsSUFBZSxPQUFPLFVBQXRCLElBQW9DLE9BQU8sUUFBM0MsSUFBdUQsT0FBTyxJQUFsRSxFQUF3RTtBQUN2RSxhQUFTLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0MsZ0JBQXhDLENBQXlELFFBQXpELEVBQW1FLFNBQW5FLEVBQThFLEtBQTlFO0FBQ0EsYUFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGdCQUFyQyxDQUFzRCxRQUF0RCxFQUFnRSxTQUFoRSxFQUEyRSxLQUEzRTtBQUNBLENBSEQsTUFHTztBQUNOLFVBQU0sd0RBQU47QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbmltcG9ydCB7YX0gZnJvbSBcIi4vbW9kdWxlL2pzMVwiO1xuXG5cbmltcG9ydCB7cmVhZCBhcyBzZXRJbWFnZX0gZnJvbSBcIi4vbW9kdWxlL25hc3R5YS9uYXN0eWFcIjtcblxuXG5cbmNvbnNvbGUubG9nKCcxMTExMScsIGEpO1xuY29uc29sZS5sb2coJ3JlYWQnLCBzZXRJbWFnZSk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEFuZHJleSBvbiAwMi4wNy4yMDE3LlxuICovXG5sZXQgYSA9IDI7XG5cbmV4cG9ydCB7YX0iLCJsZXQgJG1haW5GaWxlSW5wdXQgPSAkKCcjZmlsZVRvQ2hhbmdlJyksXG4gICAgJG1haW5JbWdQcmV2ID0gJCgnLm1haW4taW1nLXByZXYnKSxcbiAgICAkbWFya0ZpbGVJbnB1dCA9ICQoJyNmaWxlVG9Ub3AnKTtcbiAgICBleHBvcnQgbGV0ICRyZXNldEJ0biA9ICQoJy5idXR0b24tcmVzZXQnKTtcbiAgICBcblxuZnVuY3Rpb24gcHVzaEltZ18xKGV2dCkge1xuICAgIHZhciBmaWxlID0gJG1haW5GaWxlSW5wdXRbMF0uZmlsZXNbMF07XG4gICAgc2V0SW1hZ2UoZmlsZSwgMzAwLCAzMDApO1xuICAgICAgICAkbWFya0ZpbGVJbnB1dFswXS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCAncmV0dXJuIHRydWUnKTtcbiB9O1xuXG4gZnVuY3Rpb24gcHVzaEltZ18yKGV2dCkge1xuICAgICB2YXIgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlVG9Ub3AnKS5maWxlc1swXTtcbiAgICAgc2V0SW1hZ2UoZmlsZSwgMjAwLCAyMDApO1xuIH07XG5cbiBleHBvcnQgZnVuY3Rpb24gcmVhZChmaWxlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gXHRcdHZhciAgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgIFx0cmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgXHRcdHZhciBkYXRhVVJJID0gZXZlbnQudGFyZ2V0LnJlc3VsdCxcbiAgICBcdFx0ICAgIGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXRlcm1hcmtfX2NhbnZhcycpLFxuICAgIFx0XHRcdGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuICAgIFx0XHRcdGltZyA9IG5ldyBJbWFnZSgpO1xuXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdFx0fTtcblx0XHRcdGltZy5zcmMgPSBkYXRhVVJJO1xuXHRcdFx0XG5cdFx0XHQkbWFpbkltZ1ByZXYuYXR0cihcInNyY1wiLCB1cmkpO1xuICAgICAgICAgICAgaWYoISRtYWluSW1nUHJldi5oYXNDbGFzcygnbWFpbi1pbWctcHJldl9zaG93Jykpe1xuICAgICAgICAgICAgICAgICRtYWluSW1nUHJldi5hZGRDbGFzcygnbWFpbi1pbWctcHJldl9zaG93JylcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgIFx0fTtcbiAgICBcdHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuIH07XG5cblxuaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVRvQ2hhbmdlJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgcHVzaEltZ18xLCBmYWxzZSk7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlVG9Ub3AnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBwdXNoSW1nXzIsIGZhbHNlKTtcbn0gZWxzZSB7XG5cdGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKTtcbn07Il19

//# sourceMappingURL=maps/index.js.map
