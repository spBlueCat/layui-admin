$(function () {
  //移入移出侧边栏
  $(".layui-side-menu .layui-nav-item").hover(function (event) {
    event.stopPropagation();
    let t = $(this).position().top;
    let h = $(this).innerHeight();
    if ($(this).hasClass("layui-nav-itemed")) {
      $(".layui-nav-bar").css({top: t, height: h - $(this).children(".layui-nav-child").innerHeight(), opacity: 1})
    } else {
      $(".layui-nav-bar").css({top: t, height: h, opacity: 1})
    }
  }, function (event) {
    event.stopPropagation();
    let t = $(this).position().top + $(this).innerHeight() / 2;
    let h = 0;
    if ($(this).hasClass("layui-nav-itemed")) {
      $(".layui-side-menu .layui-nav-bar").css({
        top: t - $(this).children(".layui-nav-child").innerHeight() / 2,
        height: h,
        opacity: 0
      })
    } else {
      $(".layui-side-menu .layui-nav-bar").css({top: t, height: h, opacity: 0})
    }

  });

  //登陆栏
  $(".layui-layout-right .layui-nav-item").eq(4).hover(
    function () {
      $(this).find(".layui-nav-more").addClass("layui-nav-mored");
      $(this).children("dl").addClass("layui-show");
    },
    function () {
      $(this).find(".layui-nav-more").removeClass("layui-nav-mored");
      $(this).children("dl").removeClass("layui-show");
    }
  )

  //点击侧边图标弹出一级菜单
  $(".layui-side-menu .layui-nav-item").click(function (event) {
    event.stopPropagation();
    $(this).toggleClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
  });

  //点击侧边图标一级菜单 弹出子级菜单+iframe标题栏+iframe
  $(".layui-nav-child").find("dd").click(function (event) {
    event.stopPropagation();
    var that = $(this);
    //  var isRepeat = false; // 创建一个用来判断窗口是否重复的变量
    if ($(this).children("dl").is(".layui-nav-child")) {
      $(this).toggleClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
    } else {
      $(".layui-nav-child").find("dd").removeClass("layui-this");
      $(this).addClass("layui-this");
      $("#LAY_app_tabsheader li").removeClass("layui-this");
      /* $("#LAY_app_tabsheader li").filter(function () {
         if(that.children("a").attr("lay-href") === $(this).attr("lay-id")) {
           return true;
         }
       }).addClass("layui-this");
       //循环遍历是否有窗口元素的属性与点击元素的属性相同 如果有将isRepeat赋值为true
       $.each($("#LAY_app_tabsheader li"),function (i) {
         if($("#LAY_app_tabsheader li").eq(i).attr("lay-id") === that.children("a").attr("lay-href")){
             isRepeat = true;
             return false;
         }
       })
       if(!isRepeat){
         $("#LAY_app_tabsheader").append("<li lay-id="+$(this).children('a').attr('lay-href')+"  "+"lay-attr="+$(this).children('a').attr('lay-href')+"  "+"class='layui-this'><span>"+$(this).children("a").text()+"</span><i class='layui-icon layui-unselect layui-tab-close'>&#x1006;</i></li>");
         $("#LAY_app_body").children().removeClass("layui-show");
         $("#LAY_app_body").append("<div class='layadmin-tabsbody-item layui-show'><iframe src='http://www.layui.com/admin/std/dist/views/"+that.children("a").attr("lay-href")+"'  "+"frameborder='0' class='layadmin-iframe'></iframe></div>");
       }else{

       }*/
      // 将重复的元素赋值给re
      var re = $("#LAY_app_tabsheader li").filter(function () {
        if (that.children("a").attr("lay-href") === $(this).attr("lay-id")) {
          return true;
        }
      });
      //如果有重复的元素
      if (re.length !== 0) {
        re.addClass("layui-this");
        $(".layadmin-tabsbody-item").eq(re.index()).addClass("layui-show").siblings().removeClass("layui-show");
      } else {
       /* $("#LAY_app_tabsheader").append("<li lay-id=" + $(this).children('a').attr('lay-href') + "  " + "lay-attr=" + $(this).children('a').attr('lay-href') + "  " + "class='layui-this'><span>" + $(this).children("a").text() + "</span><i class='layui-icon layui-unselect layui-tab-close'>&#x1006;</i></li>");*/
        $("#LAY_app_tabsheader").append("<li lay-id=" + $(this).children('a').attr('lay-href') + "  " + "lay-attr=" + $(this).children('a').attr('lay-href') + "  " + "class='layui-this'><span>" + $(this).children("a").text() + "</span><i class='layui-icon layui-unselect layui-tab-close'>&#x1006;</i></li>");
        $("#LAY_app_body").children().removeClass("layui-show");
/*        $("#LAY_app_body").append("<div class='layadmin-tabsbody-item layui-show'><iframe src='http://www.layui.com/admin/std/dist/views/" + that.children("a").attr("lay-href") + "'  " + "frameborder='0' class='layadmin-iframe'></iframe></div>");*/
        $("#LAY_app_body").append("<div class='layadmin-tabsbody-item layui-show'><iframe src="+that.children("a").attr("lay-href") + "  " + "frameborder='0' class='layadmin-iframe'></iframe></div>");
      }
    }
  });

  //页面窗口标题
  $(".layui-tab").mouseenter(
    function (event) {
      event.stopPropagation();
      //点击iframe窗口标题 左侧菜单弹出对应的元素,并且iframe切换到相应的页面
      $(".layui-tab-title li").click(
        function (event) {
          event.stopPropagation();
          var that = $(this);
          $(this).addClass("layui-this").siblings().removeClass("layui-this");
          $(".layui-nav-child").find("dd").removeClass("layui-this");
          var n = $(".layui-nav-tree dd").filter(function () {
            if ($(this).children("a").attr("lay-href") === that.attr("lay-id")) {
              return true;
            }
          });
          n.addClass("layui-this").parents(".layui-nav-item").addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
          n.parent("dl").parent("dd").addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
          $(".layadmin-tabsbody-item").eq(that.index()).addClass("layui-show").siblings().removeClass("layui-show");
        }
      )
      //点击iframe标题的删除按钮  左侧菜单弹出删除后对应的元素
      $(".layui-tab-close").click(
        function (event) {
          event.stopPropagation();
          var that = $(this);
          if (($(this).parent().next().is("li"))) {
            that.parent().next().addClass("layui-this");
          } else {
            that.parent().prev().addClass("layui-this");
          }
          $(".layadmin-tabsbody-item").eq(that.parent().index()).remove();
          that.parent().remove();
          $(".layui-nav-child dd").removeClass("layui-this");
          $(".layui-nav-child dd").filter(function () {
            if ($(this).children("a").attr("lay-href") === $(".layui-tab-title li.layui-this").attr("lay-id")) {
              return true;
            }
          }).addClass("layui-this").parents(".layui-nav-item").addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
          $(".layadmin-tabsbody-item").eq($(".layui-tab-title li.layui-this").index()).addClass("layui-show").siblings().removeClass("layui-show");
        })

      $(".layui-tab-title li").hover(function (event) {
        event.stopPropagation();
        $(this).addClass("layui-this");
      }, function (event) {
        event.stopPropagation();
        if ($(this).siblings().hasClass("layui-this")) {
          $(this).removeClass("layui-this");
        }
      })
    });


  //点击侧边图标展开
  $(".layui-side .layui-nav-item").click(function (event) {
    event.stopPropagation();
    if ($("#LAY_app").hasClass("layadmin-side-shrink")) {
      $("#LAY_app").removeClass("layadmin-side-shrink");
    }
  })

  //头部区域图标 点击后侧边伸缩
  $("#LAY_app_flexible").parent("a").click(
    function () {
      $("#LAY_app").toggleClass("layadmin-side-shrink");
      $("#LAY_app_flexible").toggleClass("layui-icon-spread-left").toggleClass("layui-icon-shrink-right");
    }
  )

  //标题栏按钮
  var differenceValue = 0;
  $(".layui-icon-prev").click(function () {
    $(".layui-tab-title").css({left:0});
  });

  $(".layui-icon-next").click(function () {
    var sum = 0;
    var index;

    $("#LAY_app_tabsheader li").each(function (i) {
      if (sum < ($(".layui-tab").innerWidth() - parseFloat($(".layui-tab-title").css("left")))) {
        sum += $(this).outerWidth();
        index = i;

      } else {
        return false;
      }
    });
    /*  console.log($("#LAY_app_tabsheader li").eq(index).position().left);
    differenceValue = sum -$(".layui-tab").innerWidth() - $("#LAY_app_tabsheader li").eq(index).innerWidth();
    if(sum>=$(".layui-tab").innerWidth()){
      $(".layui-tab-title").css({left:parseFloat($(".layui-tab-title").css("left"))-$(".layui-tab").innerWidth()-differenceValue});
        console.log(parseFloat($(".layui-tab-title").css("left"))-$(".layui-tab").innerWidth()-differenceValue);
      console.log(index);
      console.log($(".layui-tab-title").css("left"));
    }*/
    if (sum >= $(".layui-tab").innerWidth()) {
      $(".layui-tab-title").css({left: -$("#LAY_app_tabsheader li").eq(index).position().left});
      differenceValue = parseFloat($(".layui-tab-title").css("left")) - $("#LAY_app_tabsheader li").eq(index).position().left;
    }
  });
});
