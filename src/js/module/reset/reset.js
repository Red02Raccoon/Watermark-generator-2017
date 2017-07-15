
import {$mainFileInput} from '../get-file-form/get-file-form';
import {$mainImgPrev} from '../get-file-form/get-file-form';
import {$markFileInput} from '../get-file-form/get-file-form';



export function reset () {
    $($mainImgPrev[0]).attr("src", '');
    $($mainFileInput[0]).val('');
    $($markFileInput[0]).val('');
    console.log('$mainFileInput', $mainFileInput);
};
