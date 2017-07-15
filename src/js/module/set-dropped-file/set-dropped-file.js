import {isImageFile} from '../is-image-file/is-image-file'
import {setImage} from "../get-file-form/get-file-form";

export let dropSelectFile = function (files){
    if (files && files[0]) {
        for (var i = 0; i < files.length; i++) {
            if (isImageFile(files[i])) {
                setImage(files[i]);
            }
        }
    }
};