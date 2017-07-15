'use strict'

import {dropSelectFile} from "../set-dropped-file/set-dropped-file";

let isDragging = false,
    fileUploadContainer = $('.watermark__area'),
    dragOverClass = 'dragover';
    


export let dragHandlers = function(){
    let removeDragging = function(){
        if (isDragging) {
            fileUploadContainer.removeClass(dragOverClass);
            isDragging = false;
        }
    }
    
    return {
        dragOverHandler: function (e){
            e.stopPropagation();
            e.preventDefault();
        
            if (!isDragging) {
                fileUploadContainer.addClass(dragOverClass);
                isDragging = true;
            }
        },
        dragleaveHandler: function (e) {
            e.stopPropagation();
            e.preventDefault();
        
            removeDragging();
        },
        dropHandler: function (e) {
            if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files) {
                e.stopPropagation();
                e.preventDefault();
        
                dropSelectFile(e.originalEvent.dataTransfer.files);
        
                removeDragging();
            }
        }
    }
    
};