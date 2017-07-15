'use strict'

export let isImageFile = function (file) {
    if (file.type.indexOf('image/') === 0) {
        return true
    }
    return false;
};