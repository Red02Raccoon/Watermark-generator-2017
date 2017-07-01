let $mainFileInput = $('#fileToChange'),
    $markFileInput = $('#fileToTop'),
    $resetBtn = $('.button-reset'),
    $mainImgPrev = $('.main-img-prev');

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

    if (isDragging) {

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
     var reader = new FileReader();
    reader.onload = function (e) {

        var uri = e.target.result;



        $mainImgPrev.attr("src", uri);
        if(!$mainImgPrev.hasClass('main-img-prev_show')){
            $mainImgPrev.addClass('main-img-prev_show')
        };

    };

    reader.readAsDataURL(file);
};

function isImageFile(file) {
    if (file.type.indexOf('image/') === 0) {
        return true
    }

    return false;
};

$resetBtn.click(function(e){
    resetSelection();
});

function resetSelection () {
    $($mainImgPrev[0]).attr("src", '');
    console.log('$mainFileInput', $mainFileInput);
    $($mainFileInput[0]).val('');
    $($markFileInput[0]).val('');
    console.log('$mainFileInput', $mainFileInput);
};
