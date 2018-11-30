/**
 * Created by lixinjie on 2018/11/27.
 */
/* rem 与 px 之间的转换
 * 当前屏幕宽度 / 375 = 当前屏幕宽度的font-size / 100
 * */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            // if (clientWidth <= 767) {
                docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
            // }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// 侧滑导航切换
$("#menu").on("tap", function(e) {
    $("#navWrapper").toggle();
    $(document).on("tap", function () {
        $("#navWrapper").hide();
    });
    e.stopPropagation();
});
$("#nav").on("tap", function (e) {
    e.stopPropagation();
});


/*回到顶部图标的显示与影藏*/
$(window).scroll(function() {
    if($(window).scrollTop() >= 100) {
        $("#toTop").show(400).css("display", "block"); /* 当滑动到不小于 100px 时，回到顶部图标显示 */
    }else {
        $("#toTop").hide(400); /* 当滑动到小于(页面被卷去的高度) 100px 时，回到顶部图标隐藏 */
    }
});

// 回到顶部
/*$("#toTop").on("tap", function () {
    $("html, body").({scrollTop: 0}, 300);
    return false;
});*/

$.fn.scrollTo =function(options){

    var defaults = {
        toT : 0,    //滚动目标位置
        durTime : 500,  //过渡动画时间
        delay : 30,     //定时器时间
        callback:null   //回调函数
    };
    var opts = $.extend(defaults,options),
        timer = null,
        _this = this,
        curTop = _this.scrollTop(),//滚动条当前的位置
        subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
        index = 0,
        dur = Math.round(opts.durTime / opts.delay),
        smoothScroll = function(t){
            index++;
            var per = Math.round(subTop/dur);
            if(index >= dur){
                _this.scrollTop(t);
                window.clearInterval(timer);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
                _this.scrollTop(curTop + index*per);
            }
        };
    timer = window.setInterval(function(){
        smoothScroll(opts.toT);
    }, opts.delay);
    return _this;
};

$("#toTop").on("tap", function () {
    $("body").scrollTo({toT: 0});
    return false;
});

/*返回*/
$("#back").on("tap", function () {
    history.go(-1);
});

/*子菜单切换*/
$("#subNav").find("li").on("tap", function () {
   var $index = $(this).index();
   var $section = $(this).parents("main").find("section");
   $(this).find("a").addClass("active");
   $(this).siblings("li").find("a").removeClass("active");
   $section.eq($index).addClass("active").siblings("section").removeClass("active");
});

/*美珀优势样式设置*/
(function setStyle() {
    var $body = $(".about-advantage").find(".body");
    var $li = $body.find("li");
    var dlLen = 0;
    // console.log($li.length);
    for(var i = 0; i < $li.length; i++) {
        var $dl = $li.eq(i).find("dl");
        for (var j = 0; j < $dl.length; j++) {
            dlLen += $dl.eq(j).height() + $dl.eq(j).css("marginTop") + $dl.eq(j).css("marginBottom");
        }
        $li.eq(i).height(dlLen);
        dlLen = 0;
    }
})();

/*详情的展开与收起*/
$(".join-section").find("dl").on("tap", function () {
    if ($(this).hasClass("expand")) {
        $(this).removeClass("expand");
    } else {
        $(this).addClass("expand");
    }
});