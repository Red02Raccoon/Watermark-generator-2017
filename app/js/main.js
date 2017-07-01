function pushImg_1(evt) {
    var file = document.querySelector('#fileToChange').files[0];
		read(file);
        document.getElementById('fileToTop').setAttribute('onclick', 'return true');
    	document.querySelector('.settings__button--noactive').classList.toggle("settings__button--noactive");
 };

 function pushImg_2(evt) {
    var file = document.querySelector('#fileToTop').files[0];
   		alert("Еще не сделала...работаю");
 };


 function read(file) {
 		var  reader = new FileReader();

    	reader.onload = function(event) {
    		var dataURI = event.target.result,

    		    canvas = document.querySelector('.watermark__canvas'),
                canvasWidth = document.querySelector('.watermark__area').offsetWidth,
                canvasHeight = document.querySelector('.watermark__area').offsetHeight,
    			ctx = canvas.getContext('2d'),
    			img = new Image(),
                ratioImg,
                widthImg,
                imgPosX,
                imgPosY,
                heightImg;

                canvas.setAttribute("width", canvasWidth);
                canvas.setAttribute("height", canvasHeight);

			img.onload = function(){

                widthImg = this.width;
                heightImg = this.height;

                console.log(widthImg+'x'+heightImg); 

                ratioImg = widthImg / heightImg;
                widthImgCanvas = canvasWidth;
                heightImgCanvas = widthImgCanvas / ratioImg;

                console.log(widthImgCanvas+'x'+heightImgCanvas); 

                imgPosX = canvas.width / 2 - widthImgCanvas / 2;
                imgPosY = canvas.height / 2 - heightImgCanvas / 2;

				ctx.drawImage(img, imgPosX, imgPosY, widthImgCanvas, heightImgCanvas);
			};

			img.src = dataURI;
    	};

    	reader.readAsDataURL(file);
 };



if (window.File && window.FileReader && window.FileList && window.Blob) {
	document.getElementById('fileToChange').addEventListener('change', pushImg_1, false);
	document.getElementById('fileToTop').addEventListener('change', pushImg_2, false);
} else {
	alert('The File APIs are not fully supported in this browser.');
};