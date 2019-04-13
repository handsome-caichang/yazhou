$.alert = function (text) {
    var str = '<div class="alert-mask">' +
            '<div class="alert-box">' +
                '<div class="alert-title">提示</div>' +
                '<div class="alert-body">' + text + '</div>' +
                '<div class="alert-btn">确定</div>' +
            '</div>' +
        '</div>';

    var $alert = $(str);

    if (text.length < 10) {
        $alert.find('.alert-body').addClass('center');
    }

    $alert.find('.alert-btn').click(function () {
        console.log(this);
        $alert.remove();
    })

    $alert.appendTo('body');
}