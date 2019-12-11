; (function () {
    "use strict"
    // 1.创建文件,确定名字
    // 2.匿名函数,前后加分号
    // 3.匿名函数内,严格模式
    // 4.将jQuery传给匿名函数,使用$接收,实现部化$
    // 5.向jq身上合并方法
    // 6.开始编写功能

    // $.fn是jq的fn。是它的dom（$(".banner1")）对象
    $.fn.banner = function (options) {
        // 功能
        // 1.默认参数的处理
        // 这个this指向$.fn ；不能直接this,这样会操作到jq的dom对象可能会修改掉它原来的属性
        // this.left = options.left;   ×

        // 单例模式：以后直接操作this.obj这个对象也叫面向对象编程
        this._obj_ = {
            list: options.list === false ? false : true,
            // 进来一张
            index: options.index || 0,
            autoPlay: options.autoPlay === false ? false : true,
            delayTime: options.delayTime || 2000,
            moveTime: options.moveTime || 200,
            // 走一张 假设上一张是最后一个索引
            iPrev: options.items.length - 1

        };
        // console.log(this._obj_.iPrev);

        // 看下这个参数有没有做
        // console.log(this._obj_);

        // this._obj_.left = options.left;

        // 面向对象
        // class Banner{
        //     constructor(o){
        //     }
        // }
        // new Banner(options);

        // that指的是大框$(".banner1")
        var that = this;
        // 2. 初始化布局
        this._obj_.init = function () {
            // 给大框加溢出隐藏
            that.css({
                overflow: "hidden"
            });

            // 所有图片定位位置,
            options.items.css({
                position: "absolute",
                // 右边eq任意一张图片的宽度
                left: options.items.eq(0).width(),
                top: 0
                // this指的是this._obj_
            }).eq(this.index).css({
                left: 0
            })

        }
        this._obj_.init();

        // 封装出右按钮
        function btnRight() {
            // 3-2-2计算索引
            if (that._obj_.index == options.items.length - 1) {
                that._obj_.index = 0;
                that._obj_.iPrev = options.items.length - 1;
            } else {
                that._obj_.index++;
                that._obj_.iPrev = that._obj_.index - 1;
            }
            // console.log(that._obj_.iPrev, that._obj_.index);
            // 3-3-2开始移动动画
            that._obj_.btnMove(-1);
        }


        // 封装出左按钮
        function btnLeft() {
            // 3-2-1计算索引
            if (that._obj_.index == 0) {
                that._obj_.index = options.items.length - 1;
                that._obj_.iPrev = 0;
            } else {
                that._obj_.index--;
                that._obj_.iPrev = that._obj_.index + 1;
            }
            // console.log(that._obj_.iPrev, that._obj_.index);
            // 3-3-1开始移动动画
            that._obj_.btnMove(1);
        }

        // 左右按钮的图片移动的封装
        // 移动动画功能的定义
        // 退到上一步完成
        this._obj_.btnMove = function (type) {
            options.items.eq(that._obj_.iPrev).css({
                left: 0
            }).stop().animate({
                left: options.items.eq(0).width() * type
                // that._obj_.moveTime运动时间
            }, that._obj_.moveTime).end().eq(that._obj_.index).css({
                left: -options.items.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, that._obj_.moveTime);

            // 当list没有的时候，在左右按钮中不应该操作list样式
            // 判断list有没有传,不传直接返回不执行
            if (!that._obj_.list) return;
            // 左右按钮配合轮播图切换点
            that.find(".list").children().css({
                background: "rgba(200,200,200,0.6)"
            }).eq(that._obj_.index).css({
                background: "red"
            })
        }

        // 3.判断是否传入左右按钮，有就做功能，没有就跳过
        // console.log(options.left);
        // console.log(options.right);
        // 有左右按钮的条件
        if (options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0) {
            // console.log("有左右按钮的功能");
            // 开始写轮播图的左右按钮的功能
            // 左按钮的事件
            // 3-1-1绑定事件
            options.left.click(btnLeft);


            // // 右按钮的事件
            // 3-1-2绑定事件
            options.right.click(btnRight);


        }

        // 4.list为true，有小按钮功能；轮播图切换点
        if (this._obj_.list) {
            // 4-1创建小按钮
            // 生成布局
            var str = "";
            for (var i = 0; i < options.items.length; i++) {
                // 拼接字符串
                str += `<li>${i + 1}</li>`;
                // console.log(options.items.length);

            }
            // console.log(this);
            // console.log(str);
            // 4-2创建小按钮的框，并设置框和小按钮的样式
            // 创建ul，把str塞进去，然后塞进大框里
            // $("<ul>").html(str).appendTo(this)
            // console.log($("<ul>").html(str));
            $("<ul class='list'>").html(str).appendTo(this).css({
                left: "50%",
                marginLeft: -100,
                width: 100,
                height: 20,
                display: "flex",
                position: "absolute",
                bottom: "10px",
            }).children().css({
                flex: 1,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "rgba(200,200,200,0.6)",
                lineHeight: "20px",
                textAlign: "center",
                margin: "auto",
                fontSize: 0,
                // 手型
                cursor: "pointer"
            }).eq(this._obj_.index).css({
                background: "red"
            });
            // .end().click;
            // 4-3给小按钮添加事件
            // 绑定点击事件 
            this.find(".list").children("li").click(function () {
                // 走的索引
                // console.log(that._obj_.index);
                // 点击的索引
                // console.log($(this).index());
                // 4-4判断点击的 索引和当前索引的大小，决定移动的方向
                // 判断点击的索引与走的索引关系来确定图片移动的方向
                if ($(this).index() > that._obj_.index) {
                    // console.log("左");
                    // 执行移动传入当前点击的索引用i接收
                    // that._obj_.listMoverLeft($(this).index());
                    // 开始移动
                    that._obj_.listMover($(this).index(), -1);
                }

                if ($(this).index() < that._obj_.index) {
                    // console.log("右");
                    // that._obj_.listMoverRight($(this).index());
                    // 开始移动
                    that._obj_.listMover($(this).index(), 1);
                }
                // 4-5设置小按钮的当前项
                // 轮播图切换点当前项；点击变红其他的还原
                $(this).css({
                    background: "red"
                }).siblings().css({
                    background: "rgba(200,200,200,0.6)"
                })
                // 4-6点击功能完成后，点击的索引要设置给当前索引
                // 上一次进来的是这一次走的
                that._obj_.index = $(this).index();
            })
            // 移动的封装
            // 移动的功能代码
            this._obj_.listMover = function (i, type) {
                options.items.eq(that._obj_.index).css({
                    left: 0,
                }).stop().animate({
                    left: options.items.eq(0).width() * type
                }, that._obj_.moveTime).end().eq(i).css({
                    left: -options.items.eq(0).width() * type
                }).stop().animate({
                    left: 0
                }, that._obj_.moveTime)
            }
        }

        // 5. autoPlay为true，有自动轮播
        if (this._obj_.autoPlay) {
            // 重复执行时间trigger
            this._obj_.t = setInterval(() => {
                // options.right.trigger("click")
                // 手动执行右按钮的事件处理函数，但是前提得先把右按钮的事件处理函数和相关功能单独封装出来
                btnRight();
            }, this._obj_.delayTime)
            // 鼠标进入离开
            this.hover(function () {
                // 鼠标进入清除计时器
                clearInterval(that._obj_.t)
            }, function () {
                // 鼠标离开继续自动轮播
                that._obj_.t = setInterval(() => {
                    // options.right.trigger("click")
                    btnRight();
                }, that._obj_.delayTime)
            })
        }



        // 封装思想
    }


})(jQuery);