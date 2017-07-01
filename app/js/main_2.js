function pushImg_1(evt) {
	if (document.querySelector(".mainImg")) {
      	document.querySelector(".mainImg").remove();  			
      	document.querySelector(".secondImg").remove();  			
    };

    var file = document.querySelector('#fileToChange').files[0];
		setMainImg(file);
        document.getElementById('fileToTop').setAttribute('onclick', 'return true');
	  	document.querySelector('.settings__button--noactive').classList.remove("settings__button--noactive");
};


function pushImg_2(evt) {
	if (document.querySelector(".secondImg")) {
      	document.querySelector(".secondImg").remove();  			
    }
    var file = document.querySelector('#fileToTop').files[0];
        setWatermark(file);
};

function setMainImg(file) {
 		var  reader = new FileReader();
    	reader.onload = function(e) {
    		var mainImg = document.createElement('img'),
    			containerWidth = document.querySelector('.watermark__area').offsetWidth,
                containerHeight = document.querySelector('.watermark__area').offsetHeight,
                ratioImg,
                mainImgWidth,
                mainImgHeight;

                mainImg.onload = function() {
					var mainImgWidthStart = this.width,
						mainImgHeightStart = this.height;
						ratioImg = mainImgWidthStart / mainImgHeightStart;

					 	if (mainImgWidthStart > mainImgHeightStart) {
							mainImgWidth = containerWidth;
			                mainImgHeight = containerWidth / ratioImg;

		               		mainImg.setAttribute("width", mainImgWidth);
		               		mainImg.setAttribute("height", mainImgHeight);

					 	} else {
							mainImgHeight = containerHeight;
			                mainImgWidth = mainImgHeight / (1 / ratioImg);

		               		mainImg.setAttribute("width", mainImgWidth);
		               		mainImg.setAttribute("height", mainImgHeight);
					 	}
      			};

                mainImg.src = e.target.result;
                mainImg.className = "mainImg";
                document.querySelector(".mainImgContainer").appendChild(mainImg);
    	};
    	reader.readAsDataURL(file);
 };



 function setWatermark(file) {
 		alert("еще нету");
 };


if (window.File && window.FileReader && window.FileList && window.Blob) {
	document.getElementById('fileToChange').addEventListener('change', pushImg_1, false);
	document.getElementById('fileToTop').addEventListener('change', pushImg_2, false);
} else {
	alert('The File APIs are not fully supported in this browser.');
};