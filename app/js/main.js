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



//////

let $globalArea = $('.watermark__area'),
    fileUploadContainer = $('.watermark__area'),
    isDragging = false,
    dragOverClass = 'dragover';

$globalArea
    .on('dragover', dragOverHandler)
    .on('dragleave', dragleaveHandler)
    .on('drop', dropHandler);

function dragOverHandler (e){
    e.stopPropagation();
    e.preventDefault();

    if (!isDragging) {
        fileUploadContainer.addClass(dragOverClass);
        isDragging = true;
    }
};

function dragleaveHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('dragleave');
    if (isDragging) {
        console.log('dragleave1');
        fileUploadContainer.removeClass(dragOverClass);
        isDragging = false;
    }
};

function dropHandler(e) {
    if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files) {
        e.stopPropagation();
        e.preventDefault();

        dropSelectFile(e.originalEvent.dataTransfer.files);

        if (isDragging) {
            fileUploadContainer.removeClass(dragOverClass);
            isDragging = false;
        }
    }
};

function dropSelectFile(files){
    if (files && files[0]) {
        for (var i = 0; i < files.length; i++) {
            if (isImageFile(files[i])) {
                var file = files[i];

                setImage(file);
            }
        }
    }
};

function setImage(file) {
    // $scope.files.push(file);
     var reader = new FileReader();
    reader.onload = function (e) {

        var uri = e.target.result;

        let $mainImgPrev = $('.main-img-prev');

        $mainImgPrev.attr("src", uri).addClass('main-img-prev_show');

        // $rootScope.safeApply(function () {
        //     $scope.previewImages.push(uri);
        //
        // });
    };

    reader.readAsDataURL(file);
};

function isImageFile(file) {
    if (file.type.indexOf('image/') === 0) {
        return true
    }

    return false;
};
