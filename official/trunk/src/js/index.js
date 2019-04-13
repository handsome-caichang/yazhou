var _this, t, width, currentBanner = 0,
    bannerLength = 2;
width = $('html').width();
/**
 * @description 暂停Banner
 */
function stopBannerMove() {
    clearInterval(t)
}

function setBannerInfo() {
    // 获取第一张图片
    var cloneImg = $(".banner .banner-container-list  .banner-list-item").first().clone();
    // 将复制的第一张图片插入到banner的最后帧
    $(".banner .banner-container-list").append(cloneImg);
    // 获取到Banner的数量
    bannerLength += 1;
    t = setInterval(function () {
        currentBanner++;
        stepBannerMoving();
    }, 4000)
}

function stepBannerMoving(num) {
    if (num) {
        if (currentBanner === 0 && num === -1) {
            currentBanner = 2
        } else {
            currentBanner += num;
        }
    }
    if (currentBanner === -1) {
        $(".banner .banner-container-list").css({
            left: 2 * 100 + '%'
        }, 0);
        currentBanner = _this.bannerLength - 2;
    } else if (currentBanner === bannerLength) {
        $(".banner .banner-container-list").css({
            left: 0
        });
        currentBanner = 1;
    }
    $('.banner .banner-list-item').eq(currentBanner).addClass('active').siblings().removeClass('active')
    $('.banner .banner-container-list').stop().animate({
        left: -currentBanner * 100 + '%'
    }, 500)
}

function continueBannerMove() {
    t = setInterval(function () {
        currentBanner++;
        stepBannerMoving();
    }, 4000)
}

function changeBanner(num) {
    stepBannerMoving(num)
}

function showVideo() {
    var video = `<iframe height=498 width=810 src='//player.youku.com/embed/XMzcwMTgxNjc5Mg==' frameborder=0 'allowfullscreen'></iframe>`;
    $('.video-content').append(video);
    $('.video-container').css('display', 'block');
}

function hideVideo() {
    $('.video-content').html('');
    $('.video-container').css('display', 'none');
}

setBannerInfo();