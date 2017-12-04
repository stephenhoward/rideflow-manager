window.ht = function(selector) {
    return $(selector + '.template').clone().removeClass('template').prop('outerHTML');
};