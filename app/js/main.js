function pushImg_1(evt) {
    var file = document.querySelector('#fileToChange').files[0];
		read(file, 300, 300);
    	document.getElementById('fileToTop').setAttribute('onclick', 'return true');
 };

 function pushImg_2(evt) {
    var file = document.querySelector('#fileToTop').files[0];
   		read(file, 200, 200);
 };


 function read(file, width, height) {
 		var  reader = new FileReader();

    	reader.onload = function(event) {
    		var dataURI = event.target.result,
    		    canvas = document.querySelector('.watermark__canvas'),
    			ctx = canvas.getContext('2d'),
    			img = new Image();

			img.onload = function(){
				ctx.drawImage(img, 0, 0, width, height);
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