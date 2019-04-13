<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Show.aspx.cs" Inherits="Xiaogj.Web.weixin.teacher.Show" Theme="" StylesheetTheme="" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>老师秀</title>
    <link rel="stylesheet" type="text/css" href="css/jquery.fullpage.min.css">
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <script type="text/javascript" src="./js/lib/jquery.min.js"></script>
    <script type="text/javascript" src="./js/lib/jquery.fullpage.min.js"></script>
    <script type="text/javascript" src="./js/lib/countUp.min.js"></script>
    <script type="text/javascript" src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
	<script type="text/javascript" src="//g.alicdn.com/dingding/open-develop/1.9.0/dingtalk.js"></script>
</head>
<body>

    <div class="hint"></div>
    
    <div class="ssx-teacher ssx-teacher-hook">
        <div class="section">
            <div class="phome-up flex flex_center">
                <div class="phome-up-content">
                    <div class="phome-title">时光记忆</div>
                    <div class="phome-main flex">
                        <div class="phome-main-left">
                            <div class="portrait"></div>
                        </div>
                        <div class="phome-main-right flex flex_column">
                            <div class="name">刘老师</div>
                            <div><span class="date">2016-06-09</span></div>
                            <div class="meet">我们在<span class="where">师生信</span>相遇</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="phome-down">
                <p>这一路走来，感谢有您相伴</p>
                <p>有些话我想对您说</p>
            </div>
        </div>

        <div class="section">
            <div class="ptlr">
                <div class="main">
                    <p class="p1">感谢您在</p>
                    <p class="p1"><span class="school-name">书人教育</span>奋斗了</p>
                    <div class="wrap1">
                        <div id="num1" class="num">0</div>
                        <div class="sy1">天</div>
                    </div>
                </div>                
                <div class="des"></div>
            </div>
        </div>

        <div class="section">
            <div class="ptlr">
                <div class="main">
                    <div class="work-start"><span class="work-start-date"></span>开始</div>
                    <p class="p1">共带了</p>
                    <div class="wrap1">
                        <div id="num2" class="num">0</div>
                        <div class="sy1">个班级</div>
                    </div>
                </div>
                <div class="des"></div>
            </div>
        </div>

        <div class="section">
            <div class="ptlr">
                <div class="main">
                    <div class="work-start"><span class="work-start-date"></span>开始</div>
                    <p class="p1">共上了</p>
                    <div class="wrap1">
                        <div id="num3" class="num">0</div>
                        <div class="sy1">节课</div>
                    </div>
                </div>
                <div class="des"></div>
            </div>
        </div>

        <div class="section">
            <div class="ptlr">
                <div class="main">
                    <div class="work-start"><span class="work-start-date"></span>开始</div>
                    <p class="p1">付出了</p>
                    <div class="wrap1">
                        <div id="num5" class="num">0</div>
                        <div class="sy1">个小时</div>
                    </div>
                </div>
                <div class="des"></div>
            </div>
        </div>

        <div class="section">
            <div class="ptlr">
                <div class="main">
                    <div class="work-start"><span class="work-start-date"></span>开始</div>
                    <p class="p1">培养了</p>
                    <div class="wrap1">
                        <div id="num4" class="num">0</div>
                        <div class="sy1">名学生</div>
                    </div>
                </div>
                <div class="des"></div>
            </div>
        </div>

        <div class="section">
            <div class="prate flex flex_column">
                <div class="fly-wrap flex_con">
                    <!-- <div class="fly fly1"></div> -->
                    <!-- <div class="fly fly2"></div> -->
                    <div class="fly fly3"></div>
                </div>
                <div class="cloud-bg "></div>
                <div class="rate-wrap flex flex_center">
                    <!-- <div class="rate-item">
                        <div>升班率</div>
                        <div id="rate-val1" class="rate-val">0%</div>
                    </div>
                    <div class="rate-item">
                        <div>续费率</div>
                        <div id="rate-val2" class="rate-val">0%</div>
                    </div> -->
                    <div class="rate-item">
                        <div>出勤率</div>
                        <div id="rate-val3" class="rate-val">0%</div>
                    </div>
                </div>                
            </div>
        </div>

        <div class="section">
            <div class="star-wrap ptlr">
                <div class="start-bg">
                    <img src="img/start-5.png">
                </div>
                <!-- <div id="star-point" class="review-c">0.0</div> -->
                <!-- <div class="p1">平均分</div> -->
                <div class="p3">收到家长评价 <span id="award-comment" class="review-c">N</span> 次</div>
                <div class="p3">平均得分 <span id="star-point" class="review-c">0</span></div>
                <div class="star-desc">
                    <!-- <div class="p2">由于你卓越的表现</div> -->
                    <!-- <div class="p2">获得五星教师勋章</div> -->
                </div>
                
                <!-- <div class="star-ranking">
                    <div>超过全校<span id="star-ranking" class="sp2">0%</span>老师</div>
                </div> -->
            </div>
            <div class="share-div">
                <div class="p4">超过全校 <span id="star-ranking" class="sp2 review-c">0%</span> 老师</div>
            </div>
            <div class="support">校管家&reg;提供技术支持</div>
        </div>
    </div>



   <div id="data" style="display:none;"><%=PagePara%></div>

</body>

    <script type="text/javascript">

        var curIndex = 0;

        // 随机文案填充
        function fillTextGroup () {
            // 文案：奋斗了多少天 带了多少个班级 上了多少节课 付出了多少个小时 培养了多少名学生 
            // 五句一组，每组是有先后顺序的，每组随机出现。 
            var textGroupArr = [
                [
                    '太阳底下最光辉的职业，人类灵魂的工程师 &mdash; 老师',
                    '您给了我们一面模范行为的镜子，让我们处处有学习的榜样',
                    '您讲的课，是那样丰富多采，让我看到了一个斑斓的新世界……',
                    '您送我进入一个彩色的天地，您将我带入一个无限的世界……老师，我的心在喊着您，在向您敬礼',
                    '正因您的一片爱心的灌浇，一番耕耘的辛劳，才会有桃李的绚丽，稻麦的金黄'
                ],
                [
                    '只有奋斗，人生才会大放光彩',
                    '手执教鞭指点黑板，带领我们从幼稚走向成熟，您为我们开道',
                    '用语言播种，用彩笔耕耘，用汗水浇灌，用心血滋润，在笔和纸的摩擦间，您度过了您神圣的一生',
                    '面对讲台，背靠黑板，您把每一分钟，用辛劳汗水和智慧编织成无数耀眼的光环',
                    '正因您的一片爱心的灌浇，一番耕耘的辛劳，才会有桃李的绚丽，稻麦的金黄'
                ],
                [
                    '教师不仅是知识的传播者，而且是模范',
                    '您的工作在今朝，却建设着祖国的明天',
                    '您的教学在课堂，成就却是在祖国的四面八方',
                    '您把每一分钟，用辛劳汗水和智慧编织成无数耀眼的光环',
                    '正因您的一片爱心的灌浇，一番耕耘的辛劳，才会有桃李的绚丽，稻麦的金黄'
                ],
                [
                    '心有多大，舞台就有多大',
                    ['一间教室','是您精彩演绎人生的广阔舞台'],
                    ['一块黑板','是您精细培育花朵的肥沃土地'],
                    ['一支教鞭','是您指引学生人生道路的方向标杆'],
                    '奋斗没有终点，任何时候都是一个起点'
                ],
                [
                    '生命不止，奋斗不息',
                    '您是烛光，映照一批批学生走上成长的道路',
                    '您是绿叶，扶持一朵朵芳香四溢的红花',
                    '您是梯子，帮助一代代人登上建功立业的顶峰',
                    '您的奉献我们看得到'
                ],
                [
                    '心有多大，世界就有多大',
                    '您是小草，默默无闻，却撑着一片蓝天',
                    '您是星星，光芒黯淡，却能让我们看清前方',
                    '您是路灯，为我们照亮人生的道路',
                    '老师，您是那火光，点燃我们心中奔放的火焰'
                ],
                [
                    '平凡的事业，却展示了您伟大的人格',
                    '用语言播种，用彩笔耕耘',
                    '用汗水浇灌，用心血滋润',
                    '成功源自您的栽培，优秀出自您的耕耘',
                    '传播知识，就是播种希望，播种幸福'
                ],
                [
                    '您用火一般的情感温暖着每一个同学的心房',
                    '一间教室留下您人生绚丽的辉煌',
                    '一支粉笔写就您人生灿烂的轨迹',
                    '一支教鞭演奏您人生美妙的乐章',
                    '您多像那默默无闻的树根，使小树茁壮成长'
                ],
                [
                    '把一切知识教给一切人',
                    '一言一行彰显人格魅力',
                    '一举一动体现师者风采',
                    '一字一句包含谆谆教诲',
                    '一分一秒无私奉献青春'
                ],
                [
                    '为别人照亮道路，自我务必放出光茫',
                    '一支粉笔书写的是生活的点滴',
                    '一块黑板描绘的是知识的海洋',
                    '一间教室装满的是挥洒的汗水',
                    '您像一支红烛，为后辈献出了所有的热和光'
                ]
            ];

            var len = textGroupArr.length;
            var i = Math.floor(Math.random()*len);
           	var textArr = textGroupArr[i];

            var desDomArr = $('.section .des');

            $.each(textArr, function(index, val) {
                var str = "";
                if (typeof val === 'string') {
                    str = '<p>' + val + '</p>';
                } else if ($.isArray(val)) {
                    str = '<p>' + val[0] + '</p>' + '<p>' + val[1] + '</p>'
                }
                desDomArr.eq(index).append(str)
            });
        }

        // 根据不同评分数，显示不同文案
        function setStarDesc (scope) {
            var starDescArr = [
                ['困难的时候', '也就是我们离成功不远的时候'],
                ['拥有积极乐观的态度', '是解决和战胜任何困难的第一步'],
                ['身为世范', '为人师表'],
                ['天下遍桃李', '师者尽流芳'],
                ['桃李满天下', '春晖遍四方']
            ];

            if (scope < 1) {
                scope = 1;
            }

            var index = Math.round(scope) - 1;
            var str = '<div class="p2">' + starDescArr[index][0] + '</div>'
                     +'<div class="p2">' + starDescArr[index][1] + '</div>'

            $('.star-desc').html(str);
        }

        // 初始化fullpage实例
        function initFullage(data) {
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

            $('.ssx-teacher').fullpage({
                verticalCentered: false,
                resize: true,
                afterLoad: function (link,index) {
                    curIndex = index - 1;
                    switch (index) {
                        case 2:
                            new CountUp("num1", 0, data.WorkDay, decimals, duration, opt1).start();
                            break;
                        case 3:
                            new CountUp("num2", 0, data.ClassCount, decimals, duration, opt1).start();
                            break;
                        case 4:
                            new CountUp("num3", 0, data.CourseCount, decimals, duration, opt1).start();
                            break;                        
                        case 5:
                            new CountUp("num5", 0, data.CourseTime, decimals, duration, opt1).start();
                            $('.fly').removeClass('anim');
                            // $('.fly1').css({height: '0%'});
                            // $('.fly2').css({height: '0%'});
                            $('.fly3').css({height: '0%'});
                            break;
                        case 6:
                            new CountUp("num4", 0, data.TeachStudentCount, decimals, duration, opt1).start();
                            break;
                        case 7:
                            $('.fly').addClass('anim');
                            // $('.fly1').css({height: data.UpClassRate + '%'});
                            // $('.fly2').css({height: data.ContinueRate + '%'});
                            $('.fly3').css({height: data.AttendRate + '%'});
                            // new CountUp("rate-val1", 0, data.UpClassRate, decimals, duration, opt2).start();
                            // new CountUp("rate-val2", 0, data.ContinueRate, decimals, duration, opt2).start();
                            new CountUp("rate-val3", 0, data.AttendRate, decimals, duration, opt2).start();
                            $('.hint').show();
                            break;
                        case 8:
                            $('.fly').removeClass('anim');
                            // $('.fly1').css({height: '0%'});
                            // $('.fly2').css({height: '0%'});
                            $('.fly3').css({height: '0%'});
                            $('.hint').hide();
                            new CountUp("award-comment", 0, data.AwardComment, decimals, duration, opt1).start();
                            new CountUp("star-point", 0, data.AvgScope, 1, duration, opt1).start();                            

                            if (data.BeyondCount < 100) {
                                new CountUp("star-ranking", 0, data.BeyondCount, decimals, duration, opt2).start();
                            }                            
                            break;
                    }
                }
            });
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

        // 调用服务端记录分享次数的接口
        function doShareNum(data) {
            $.ajax({
                url: location.protocol + "//" + location.host + "/api/Common/Sharing",
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (res) {
                    console.log(res);
                }
            })
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
                var params = JSON.parse($("#data").html());
                var shareUrl = "",shareImgUrl="",shareTitle = "",shareDesc = "";
                var paraObj = {};

                $.extend(paraObj,params,searchObj)

                shareUrl = location.protocol + "//" + location.host + location.pathname 
                        + '?id=' + paraObj.id + '&Time=' + paraObj.Time;

                shareImgUrl = location.protocol + "//" + location.host + '/weixin/teacher/t-show/img/ShareImg.jpg';

                shareTitle = "我在" + paraObj.CompanyName + "践行我的教育梦";

                shareDesc = "我在" + paraObj.CompanyName + "奋斗了" + paraObj.WorkDay + "天，上课" + paraObj.CourseTime + "小时，培育桃李" + paraObj.TeachStudentCount +"人";

                // console.log(params);
                // console.log(shareUrl);
                // console.log(paraObj);
                // console.log(shareImgUrl);
                // console.log(shareTitle);
                // console.log(shareDesc);

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
                            teacherid: searchObj.id,
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
        }
        
        function ddShareInit(){
        	var searchObj = getSearchObj();
            var params = JSON.parse($("#data").html());
            var shareUrl = "",shareImgUrl="",shareTitle = "",shareDesc = "";
            var paraObj = {};

            $.extend(paraObj,params,searchObj)

            shareUrl = location.protocol + "//" + location.host + location.pathname 
                    + '?id=' + paraObj.id + '&Time=' + paraObj.Time;

            shareImgUrl = location.protocol + "//" + location.host + '/weixin/teacher/t-show/img/ShareImg.jpg';

            shareTitle = "我在" + paraObj.CompanyName + "践行我的教育梦";

            shareDesc = "我在" + paraObj.CompanyName + "奋斗了" + paraObj.WorkDay + "天，上课" + paraObj.CourseTime + "小时，培育桃李" + paraObj.TeachStudentCount +"人";
            
			dd.ready(function() {
				dd.biz.navigation.setRight({
					show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
					ontrol: true, //是否控制点击事件，true 控制，false 不控制， 默认false
					text: '更多', //控制显示文本，空字符串表示显示默认文本
					onSuccess: function(result) {　　 //如果control为true，则onSuccess将在发生按钮点击事件被回调
						dd.biz.util.share({
							type: 0,//分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
							url: shareUrl,
							title: shareTitle,
							content: shareDesc,
							image: shareImgUrl,
							onSuccess: function(shareType) {
								doShareNum({
									teacherid: searchObj.id,
									type: shareType
								})
							},
							onFail: function(err) {}
						});　
					},
					onFail: function(err) {}　　
				});
			});
		}
        
        function isWeiXin(){
		  	//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
		  	var ua = window.navigator.userAgent.toLowerCase();
		  	//通过正则表达式匹配ua中是否含有MicroMessenger字符串
		  	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		  		return true;
		  	}else{
		  		return false;
		  	}
		}


        $(function(){
            var data = JSON.parse($("#data").html());

            $('.phome-main-left .portrait').css('backgroundImage','url(' + data.TeacherPhoto + ')');

            $('.phome-main-right .date').html(data.BirthDay);
            $('.phome-main-right .name').html(data.Name);
            $('.school-name').html(data.CompanyName);
            if(!data.CourseStartTime) {
                $('.work-start').css({"display":"none"})
            }else {
                $('.work-start-date').html(data.CourseStartTime);                
            }
            if (data.BeyondCount === 100) {
                $('.share-div .p4').text('超越了所有人，位于榜首');
            }

            setStarDesc(data.AvgScope);

            fillTextGroup();

            initFullage(data);

			if (isWeiXin()) {
				wxShareInit(data);
			}else{
				ddShareInit(data);
			}

            // 当窗口大小发生改变时，调整
            $(window).on('resize', function(event) {
                $.fn.fullpage.reBuild();
            });
        });
    </script>
</html>