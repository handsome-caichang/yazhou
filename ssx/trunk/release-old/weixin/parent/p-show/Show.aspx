<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Show.aspx.cs" Inherits="WOne.MVC.weixin.parent.Show" Theme="" StylesheetTheme="" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Expires" content="0">
    <meta name="format-detection" content="telephone=no">

    <!-- <title>分享学习分享快乐</title> -->
    <title>学习时光机</title>

    <link rel="stylesheet" type="text/css" href="./css/jquery.fullpage.min.2.9.4.css">
    <link rel="stylesheet" type="text/css" href="./css/reset.css">
    <link rel="stylesheet" type="text/css" href="./css/style.css">
    <link rel="stylesheet" type="text/css" href="./css/jquery-alert.css">

    <script type="text/javascript" src="./js/lib/flexible.js"></script>
    <script type="text/javascript" src="./js/lib/jquery.min.2.2.4.js"></script>
    <script type="text/javascript" src="./js/lib/jquery-alert.js"></script>
    <script type="text/javascript" src="./js/lib/jquery.fullpage.min.2.9.4.js"></script>

    <script type="text/javascript" src="./js/lib/countUp.min.js"></script>
    <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>

</head>
<body>

    <div class="hint"></div>
    
    <div class="ssx-student ssx-student-hook">

        <div class="section base">
            <div class="ptlr flex flex_column flex_center">
                <div class="portrait" style="background-image: url(img/userpicture.png);"></div>
                <div class="student-name"></div>
                <div class="meet">
                    <div class="meet-date-wrap">
                        <div class="meet-date">2016-09-18</div>
                    </div>
                    <p>我们第一次在师生信相遇</p>
                    <p>记住这个特别的日子哦</p>
                </div>
            </div>
        </div>
    
        <div class="section stu">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">你在<span class="school-name"> </span></p>
                    <p class="p1">学习了<span id="day" class="num">0</span>天</p>
                </div>
                <div class="des"></div>
            </div>
        </div>
    
        <div class="section cont">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">报读了<span id="class" class="num">0</span>个班级</p>
                    <p class="p1">认识了<span id="student" class="num">0</span>名同学</p>
                </div>
                <div class="des"></div>
            </div>
        </div>
    
        <div class="section give">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">上了<span id="lesson" class="num">0</span>节课</p>
                    <p class="p1">共<span id="hour" class="num">0</span>个小时</p>
                </div>
                <div class="des"></div>
            </div>
        </div>
    
        <div class="section arr">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">上课出勤率<span id="arrive" class="num">0%</span></p>
                    <!-- <p class="p1">上课缺勤率<span id="leave" class="num">0%</span></p> -->
                </div>
                <div class="des"></div>
            </div>
        </div>
    
        <div class="section tall">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">参与了<span id="exam" class="num">0</span>次考试</p>
                    <p class="p1">最高分数<span id="surpass" class="num">0</span></p>
                </div>
                <div class="des"></div>
            </div>
        </div>
    
        <div class="section grade">
            <div class="ptlr flex flex_column flex_center">
                <div class="main">
                    <p class="p1">收到老师评价<span id="CommentCount" class="num">0</span>次</p>
                    <p class="p1">最高评分<span id="grade" class="num">0</span><span class="system">(5分制)</span></p>
                </div>
                <div class="grade-des">
                    <p>奋斗没有终点</p>
                    <p>任何时候都是一个起点</p>
                </div>
            </div>
        </div>
    
        <div class="section apply ">
            <div class="apply-box flex flex_column flex_center">
                <div class="apply-body flex flex_column flex_between flex_v_center">
                    <div class="apply-header">我要报名</div>
                
                    <div id="uName-bar" class="apply-item" >
                        <div class="apply-item-title star">姓　名：</div>
                        <input type="" id="uName" name="">
                        <div class="error none">姓名不能为空</div>
                    </div>
                
                    <div id="uPhone-bar" class="apply-item">
                        <div class="apply-item-title star">电　话：</div>
                        <input type="" id="uPhone" name="">
                        <div class="error none">手机号码格式不正确</div>
                    </div>
                
                    <div id="sex-bar" class="apply-item">
                        <div class="apply-item-title star">性　别：</div>
                        <span class="apply-item-sex apply-item-sex-man">
                            男 <img class="select-no" src="img/select-no.png"><img class="select" src="img/select.png">
                        </span>
                        <span class="apply-item-sex">
                            女 <img class="select-no" src="img/select-no.png"><img class="select" src="img/select.png">
                        </span>
                        <div class="error none">请选择性别</div>
                    </div>
                
                    <div id="grade-bar" class="apply-item">
                        <div class="apply-item-title star">年　级：</div>
                        <select id="grade-select" onchange="selectGrade()">
                            <option value="">请选择</option>
                        </select>
                        <div class="error none">请选择年级</div>
                    </div>
                    <div class="apply-item">
                        <div class="apply-item-title">意向课程：</div>
                        <input id="yxkc" type="" name="">
                        <div class="error none">我是错误信息</div>
                    </div>
                    <div class="comment"><img src="./img/star.png"/>必填项目</div>
                </div>
                <div class="apply-btn" onclick="apply_submit()">提交</div>
            </div>            
        </div>
    </div>
    <div id="data" style="display:none;"><%=PagePara%></div>
</body>

    <script type="text/javascript">
        var app = null,
            phoneReg = /^1[34578][0-9]{9}$/,
            anchors = ["an-base", "an-stu", "an-cont", "an-give", "an-arr", "an-tall", "an-grade", "an-apply"],
            forbid = false;

        // 渲染年级列表
        function renderGradeSelect(arr) {
            var str = '<option value="">请选择</option>';
            arr.forEach(function (item, index) {
                str += '<option value="' + item.code + '">' + item.Name + '</option>';
            })
            $('#grade-select').html(str)
        }

        function selectGrade() {
            $('#grade-bar .error').addClass('none')
        }

        // 增加事件监听，处理交互
        function addListener() {
            $('#uName').blur(function(event) {
                if (trim($(this).val())) {
                    $('#uName-bar .error').addClass('none');
                }
            });

            $('#uPhone').blur(function(event) {
                if (phoneReg.test($(this).val())) {
                    $('#uPhone-bar .error').addClass('none');
                }
            });

            $('.apply-item-sex').each(function(index, el) {
                $(el).on('click', function(event) {
                    event.preventDefault();
                    $('.apply-item-sex').removeClass('active')
                    $(this).addClass('active')
                    console.log(index+1);
                    $('#sex-bar').data('sex', index+1).find('.error').addClass('none');
                });
            });
        }

        // 去掉字符串首尾空格
        function trim(str){
            return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
        }

        function createRandom(length) {
            var rnd = "";
            for (var i = 0; i < length; i++) {
                rnd += Math.floor(Math.random()*10);                
            }
            return rnd
        }

        // 提交我要报名表单
        function apply_submit() {
            // 防止连续点击多次提交
            if(forbid){
                return
            }
            forbid = true;
            // let rnd = createRandom(9);
            var o = {
                userId: app.query.id,  // 介绍人id
                userName: trim($('#uName').val()),  //学生姓名
                userMobile: $('#uPhone').val(),  //手机号码
                sex: $('#sex-bar').data('sex'), //性别 1 是男,2是女
                grade: $('#grade-select').val(),  //年级id
                willShift: trim($('#yxkc').val()), //意向课程
                companyId: app.studentInfo.CompanyId,
                campusId: app.studentInfo.CampusID,
                sign: app.sign
            }
            $('#uName').val(o.userName);
            $('#yxkc').val(o.willShift);

            // 检验用户名、手机号、性别、年级是否合法
            if (!o.userName) {
                $('#uName-bar .error').removeClass('none')
                return;
            }
            if (!phoneReg.test(o.userMobile)) {
                $('#uPhone-bar .error').removeClass('none')
                return;
            }
            if (!o.sex) {
                $('#sex-bar .error').removeClass('none')
                return;
            }
            if (!o.grade) {
                $('#grade-bar .error').removeClass('none')
                return;
            }

            $.ajax({
                url: '/api/SSXShow/Post',
                data: o,
                success: function (res) {
                    console.log(res);
                    if (res.ErrorCode === 200) {
                        $.alert('报名成功')
                    } else {
                        $.alert(res.ErrorMsg)
                    }
                },
                 complete:function () {
                     setTimeout(function () {
                         forbid = false;
                     },1000)

                 }
            })
            console.log(o);
        }

        // 随机文案填充
        function fillTextGroup () {
            var textGroupArr = [
                ['人生方向的选择键', '决不让别人来按下'],
                ['没有难度的梦想', '不值得坚持'],
                ['勇敢去发现', '才能看到世界的另一面'],
                ['每一个精彩的未来', '都来自敢于选择的现在'],
                ['选择改变', '才能活出自己想要的样子'],
                ['学习可以从零开始', '就怕从不开始'],
                ['行动在路上', '梦想在前方'],
                ['生命只要充满勇气', '前进就永无止境'],
                ['走自己的路', '残酷总强过庸碌'],
                ['换一种方式去生活', '很难也很值得'],
                ['永不放弃尝试', '你就不是失败者'],
                ['每天奋斗一点', '就离成功更进一步'],
                ['及时当勉励', '岁月不等人'],
                ['树苗如果因为怕痛而拒绝修剪', '那就永远不会成材'],
                ['不求与人相比', '但求超越自己'],
                ['聪明出于勤奋', '天才在于积累'],
                ['书山有路勤为径', '学海无涯苦作舟'],
                ['只有勤勉专注', '你才有机会触碰成功'],
                ['不确定每一次奋斗都能成功', '但每一次都必须认真十分'],
                ['不能预知明天', '但可以把握现在'],
                ['多少梦想丢在了曾经', '多少成功赢在了当下  '],
                ['敢于蛰伏', '才配得上追逐梦想'],
                ['如果人生是一场修行', '那么热爱就是你修行的拐杖'],
                ['与其在思维上跋山涉水', '还不如在现实中快马加鞭']
            ];

            $('.section .des').each(function(index, el) {
                var i = Math.floor(Math.random()*textGroupArr.length);
                var strArr = textGroupArr.splice(i,1)[0];
                var html = '<p>' + strArr[0] + '</p>' + '<p>' + strArr[1] + '</p>';
                $(this).append(html);
            });
        }

        // 根据不同评分数，显示不同文案
        function setStarDesc (scope) {
            var starDescArr = [
                ['只有努力奋斗', '才有机会欣赏自己'],
                ['只有千锤百炼', '才能成为好钢'],
                ['更勤奋地努力', '才能尝到成功的滋味'],
                ['保持奋斗的姿态', '才能解出人生无数的考题'],
                ['今天的成绩是昨天的汗水', '明天的成功还须今天的努力']
            ];

            if (scope < 1) {
                scope = 1;
            }

            var index = Math.round(scope) - 1;
            var str = '<p>' + starDescArr[index][0] + '</p>'
                     +'<p>' + starDescArr[index][1] + '</p>'

            $('.grade-des').html(str);
        }


        // fullpage 初始化
        function initFullpage (data) {
            // 数字动画相关参数
            var decimals = 0, 
                duration = 1.5,
                opt1 = {
                  useEasing : true,
                  useGrouping : true,
                  separator : '',
                  decimal : '.',
                  prefix : '',
                  suffix : ''
                },
                opt2 = {
                  useEasing : true,
                  useGrouping : true,
                  separator : '',
                  decimal : '.',
                  prefix : '',
                  suffix : '%'
                };

            $('.ssx-student').fullpage({
                verticalCentered: false,
                anchors: anchors,
                afterLoad: function (link,index) {
                    console.log(link,index);
                    
                    switch (link) {
                        case "an-stu":
                            new CountUp("day", 0, data.WorkDay, decimals, duration, opt1).start();
                            break;
                        case "an-cont":
                            new CountUp("class", 0, data.ClassCount, decimals, duration, opt1).start();
                            new CountUp("student", 0, data.SchoolmateCount, decimals, duration, opt1).start();
                            break;
                        case "an-give":
                            new CountUp("lesson", 0, data.CourseCount, decimals, duration, opt1).start();
                            new CountUp("hour", 0, data.CourseTime, 1, duration, opt1).start();
                            break;
                        case "an-arr":
                            new CountUp("arrive", 0, data.AttendRate, decimals, duration, opt2).start();
                            // new CountUp("leave", 0, 1, decimals, duration, opt2).start();
                            break;
                        case "an-tall":
                            new CountUp("exam", 0, data.ExamCount, decimals, duration, opt1).start();
                            new CountUp("surpass", 0, data.MaxScore, 2, duration, opt1).start();                           
                            break;
                        case "an-grade":
                            new CountUp("CommentCount", 0, data.CommentCount, decimals, duration, opt1).start();
                            new CountUp("grade", 0, data.MaxCommentScore, 2, duration, opt1).start();
                            $('.hint').show();
                            break;
                        case "an-apply":                            
                            $('.hint').hide();
                            break;
                    }
                }
            });
        }

        // 监听'resize' 刷新fullpage,主要解决有虚拟铵键的安卓手机在切换虚拟铵键的显示隐藏时，调整界面；
        // 一定要在fullpage初始化后进行调用；
        function listen_win_resize() {
            var bh = $("body").height();
            // 当窗口大小发生改变时，调整
            $(window).on('resize', function(event) {
                var bh_r = $("body").height();
                if ((/android/gi).test(navigator.appVersion)) {
                    bh - bh_r < 150 && $.fn.fullpage.reBuild();
                } else {
                    $.fn.fullpage.reBuild();
                }
            });
        }

        // 调用服务端记录分享次数的接口
        function doShareNum(data) {
            $.ajax({
                url: location.protocol + "//" + location.host + "/api/Common/ShowShare",
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res) {
                    console.log(res);
                }
            })
        }

        // 将url查询部分字符串转化为json对象格式并返回
        function getSearchObj(){
            var  qs = location.search.length>0 ? location.search.substr(1):'',
            args = {},  
            items = qs.length>0 ? qs.split('&'):[],
            item = null,name = null,value = null,i = 0,len = items.length;

            for(i = 0;i < len; i++){
                item = items[i].split('=');
                name = decodeURIComponent(item[0]);
                value = decodeURIComponent(item[1]);

                if(name.length){
                    args[name] = value;
                }
            }

            return args;
        }

        // 通过微信菜单分享
        function onMenuShare(opt) {
            // 1 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
            // 2 获取“分享给朋友”按钮点击状态及自定义分享内容接口
            // 3 获取“分享到QQ”按钮点击状态及自定义分享内容接口
            // 4  获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
            // 5  获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口

            // 分享给朋友
            wx.onMenuShareAppMessage({
                title: opt.title, // 分享标题
                desc: opt.desc, // 分享描述
                link: opt.link + '&type=' + 2, // 分享链接
                imgUrl: opt.imgUrl, // 分享图标
                type: opt.type, // 分享类型,music、video或link，不填默认为link
                dataUrl: opt.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    opt.success(2)
                }, // 用户确认分享后执行的回调函数
                cancel: opt.cancel // 用户取消分享后执行的回调函数
            });
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: opt.title, // 分享标题
                link: opt.link + '&type=' + 1, // 分享链接
                imgUrl: opt.imgUrl, // 分享图标
                success: function () {
                    opt.success(1)
                }, // 用户确认分享后执行的回调函数
                cancel: opt.cancel // 用户取消分享后执行的回调函数
            });
            // 分享到QQ
            wx.onMenuShareQQ({
                title: opt.title, // 分享标题
                desc: opt.desc, // 分享描述
                link: opt.link  + '&type=' + 3, // 分享链接
                imgUrl: opt.imgUrl, // 分享图标
                success: function () {
                    opt.success(3)
                }, // 用户确认分享后执行的回调函数
                cancel: opt.cancel // 用户取消分享后执行的回调函数
            });
            // 分享到QQ空间
            wx.onMenuShareQZone({
                title: opt.title, // 分享标题
                desc: opt.desc, // 分享描述
                link: opt.link + '&type=' + 4, // 分享链接
                imgUrl: opt.imgUrl, // 分享图标
                success: function () {
                    opt.success(4)
                }, // 用户确认分享后执行的回调函数
                cancel: opt.cancel // 用户取消分享后执行的回调函数
            });
            // 分享到腾讯微博
            wx.onMenuShareWeibo({
                title: opt.title, // 分享标题
                desc: opt.desc, // 分享描述
                link: opt.link + '&type=' + 5, // 分享链接
                imgUrl: opt.imgUrl, // 分享图标
                success: function () {
                    opt.success(5)
                }, // 用户确认分享后执行的回调函数
                cancel: opt.cancel // 用户取消分享后执行的回调函数
            });
        }
   
        function wxShareInit () {
            wx.config({
                debug: false,
                appId:"<%=WX_config_appId%>",
                timestamp:<%=WX_config_timestamp %>,
                nonceStr:"<%=WX_config_nonceStr %>",
                signature:"<%=WX_config_signature %>",
                jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]
            });
            wx.ready(function () {
                // console.log("通过微信菜单分享");
                var searchObj = getSearchObj();
                var params = JSON.parse($("#data").html()).studentInfo;
                // var other = {
                //     topStr: JSON.parse($("#data").html()).topStr
                // }
                var shareUrl = "", shareImgUrl="", shareTitle = "", shareDesc = "";
                var paraObj = {};
                var titles = [
                    '速来围观，学霸都在看！ ',
                    '时间在变，唯有孩子的努力不变',
                    '爸爸妈妈，我的努力你们看到了吗？ ',
                    '将来的你，一定会感激现在努力的自己！',
                    '世界正在偷偷奖励努力的人，你是其中之一吗？'
                ]

                $.extend(paraObj,params,searchObj);                


                shareUrl = location.protocol + "//" + location.host + location.pathname 
                        + '?id=' + paraObj.id + '&Time=' + paraObj.Time;

                shareImgUrl = location.protocol + "//" + location.host + '/weixin/parent/p-show/img/ShareImg.png';

                // 我在书人教育迈向成功的第一步，
                // shareTitle = paraObj.topStr;
                // shareTitle = "我在" + paraObj.CompanyName + "迈向成功的第一步";
                // shareTitle = "分享学习分享快乐";                

                shareTitle = titles[Math.floor(Math.random()*5)];

                // 我在书人教育学习了326天，报读了6个班认识了386名同学，上了186节课共326个小时。参与18次考试超过全校689位同学。
                shareDesc = "我在" + paraObj.CompanyName 
                    + "学习了" + paraObj.WorkDay + "天，报读了" 
                    + paraObj.ClassCount + "个班认识了" 
                    + paraObj.SchoolmateCount + "名同学，上了" 
                    + paraObj.CourseCount + "节课共" 
                    + paraObj.CourseTime + "个小时。参与" 
                    + paraObj.ExamCount + "次考试,最高分考了" 
                    + paraObj.MaxScore + "。";

                // 通过微信菜单分享
                onMenuShare({
                    title: shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: shareUrl, // 分享链接
                    imgUrl: shareImgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function (shareType) {
                        doShareNum({
                            uid: searchObj.id,
                            type: shareType
                        })
                    },
                    cancel: function () { 
                        // 用户取消分享后执行的回调函数
                    }
                })
            });

            wx.error(function(res){
                // alert(JSON.stringify(res));
                // alert("微信接口不稳定，暂时不能使用图片上传功能");
            });
        }


        $(function(){
            var data = JSON.parse($("#data").html());
            data.query = getSearchObj();
            app = data;

            if (data.studentInfo.ExamCount == 0) {
                $('.section.tall').remove();
                console.log(anchors);
                anchors.splice(5,1)
                console.log(anchors);
            }

            $('.portrait').css('backgroundImage','url(' + data.studentInfo.StudentPhoto + ')');
            $('.meet-date').html(data.studentInfo.BirthDay);
            $('.student-name').html(data.studentInfo.Name);
            $('.school-name').html(data.studentInfo.CompanyName);

            renderGradeSelect(data.gradeList);

            setStarDesc(data.studentInfo.AvgScope);

            fillTextGroup();

            initFullpage(data.studentInfo);

            wxShareInit();

            listen_win_resize();

            addListener();

            // 在有输入框获取焦点，键盘弹出时，阻止滚动
            var hasFocus = false;
            $('.apply-box').on('touchstart', function (e) {
                var l = $(':focus').length;
                if (l > 0) {
                    hasFocus = true;
                    $(':focus').blur();
                    e.stopPropagation();
                }
            })
            $('.apply-box').on('touchmove', function (e) {
                if (hasFocus) {
                    e.stopPropagation();
                }
            })
            $('.apply-box').on('touchend', function (e) {
                hasFocus = false;
            })
        });
    </script>
</html>