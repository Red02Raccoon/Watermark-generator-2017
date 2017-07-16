

import {$resetBtn} from './module/get-file-form/get-file-form';
import {reset} from './module/reset/reset';
import {dragHandlers} from './module/drag-handlers/drag-handlers'

let $globalArea = $('.watermark__area');

$globalArea
    .on('dragover', dragHandlers().dragOverHandler)
    .on('dragleave', dragHandlers().dragleaveHandler)
    .on('drop', dragHandlers().dropHandler);

$resetBtn.click(function(e){
    reset();
});


