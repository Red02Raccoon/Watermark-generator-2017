export let $mainFileInput = $('#fileToChange'),
    $mainImgPrev = $('.main-img-prev'),
    $waterImagePrev = $('.water-img-prev'),
    $markFileInput = $('#fileToTop'),
    $resetBtn = $('.button-reset');
    

function pushImg_1(evt) {
    var file = $mainFileInput[0].files[0];
    setImage(file, 300, 300);
        $markFileInput[0].setAttribute('onclick', 'return true');
 };

 function pushImg_2(evt) {
     var file = document.querySelector('#fileToTop').files[0];
     setImage(file, 200, 200);
 };
 
 export let isMainImagePresent = function(mainTrue){
     let present = false;
     
     return {
         isMainImage: function(){
             if(mainTrue){
                 present = true;
             }
             return present;
         }
     }
 };
let mainPresent = false;
 export function setImage(file, width, height) {
 		let reader = new FileReader();


    	reader.onload = function(event) {
    		var dataURI = event.target.result,
    		    canvas = document.querySelector('.watermark__canvas'),
    		    ctx = canvas.getContext('2d'),
    			img = new Image();

			img.onload = function(){
				ctx.drawImage(img, 0, 0, width, height);
			};
			img.src = dataURI;
			
			
			if(!mainPresent){
			    $mainImgPrev.attr("src", dataURI);
                if(!$mainImgPrev.hasClass('main-img-prev_show')){
                    $mainImgPrev.addClass('main-img-prev_show')
                };
                mainPresent = true;
			} else {
			    $waterImagePrev.attr("src", dataURI);
			    if(!$waterImagePrev.hasClass('water-img-prev_show')){
                    $waterImagePrev.addClass('water-img-prev_show')
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