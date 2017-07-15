
import {setImage} from "./module/get-file-form/get-file-form";
import {$resetBtn} from './module/get-file-form/get-file-form';
import {reset} from './module/reset/reset';
    

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
                setImage(files[i]);
            }
        }
    }
};

function isImageFile(file) {
    if (file.type.indexOf('image/') === 0) {
        return true
    }
    return false;
};

$resetBtn.click(function(e){
    reset();
});


