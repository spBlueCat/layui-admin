
var express = require('express');
var router = express.Router();
var multer = require('multer');
var svgCaptcha = require('svg-captcha');

router.use(function (req,res,next) {
  console.log(req.session);
  if(req.session.username){
    next();
  }else{
    res.render('admin/login');
  }
});

router.get('/captcha', function (req, res,next) {
  var captcha = svgCaptcha.create();
  /*req.session.captcha = captcha.text;*/
  res.cookie('code',captcha.text);
  res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
  res.status(200).send(captcha.data);
});

router.get('/',function (req,res,next) { //首页的路由为admim
  res.render('admin',{username:req.session.username});  //加载模版文件admin.hbs
});
/*router.post('/admin-user',function (req,res,next) {
  connection.query("SELECT name FROM layui2 where id=")
});*/

router.get('/user',function (req,res,next) {
  res.render('admin/user'); //加载admin文件夹下的user.hbs模版文件
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir="public/images"; //设置目录名称
    multer({dest:dir});//如果目录不存在就创建目录
    cb(null, dir);//把上传的文件存在这个目录
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"."+file.originalname.split(".")[1]);//设置上传的文件名称
  }
});
var upload = multer({ storage: storage });//使用配置文件


var mysql  = require('mysql'); //加载mysql模块
var connection = mysql.createConnection({
  host     : '127.0.0.1',//数据库的地址
  user     : 'root', //数据库登录的用户名
  password : '123456',//数据库登录的密码
  database : 'sys' //项目所使用的数据库的名字
});
connection.connect(); //链接数据库
router.get('/homepage1',function (req,res,next) {
  connection.query('select * FROM layui where Id=1',function (error,results,fields) {  //执行数据库语句  查询数据库中的数据
    if(error) throw error;
    res.render('admin/homepage1',{data:results[0]});
  });
});

router.post('/website_data',upload.single("logo"),function (req,res,next) {
  var sql;
  var dataArr;
  if(req.file){
    sql = 'update layui set title=?,logo=?,control=?,address=?,keyword=?,descript=?,record=? where Id=1';
    dataArr = [req.body.title,req.file.filename,req.body.control,req.body.address,req.body.keyword,req.body.descript,req.body.record];
  }else{
    sql = 'update layui set title=?,control=?,address=?,keyword=?,descript=?,record=? where Id=1';
    dataArr = [req.body.title,req.body.control,req.body.address,req.body.keyword,req.body.descript,req.body.record];
  }
  connection.query(sql,dataArr,function (error,results,fields) {
    if(error) throw error;
    console.log(req.body);
    console.log(results.changedRows); //得到更新的数据个数
  });
  res.redirect('/admin/homepage1');//点击提交按钮后 重定向到homepage1页面
});

router.get('/insert',function (req,res,next) {
  connection.query('Insert into layui set Id=3,title=1,control=2',function (error,results,fileds) {
    if(error) throw error;
    console.log(results.insertId);
    res.send("插入成功");
  });
});
router.get('/delete',function (req,res,next) {
  connection.query("DELETE FROM `sys`.`layui` WHERE `Id`=3",function (error,results,fileds) {
    if(error) throw error;
    console.log(results.affectedRows);
    res.send("删除成功");
  });
});
/*router.get('/list',function (req,res,next) {
  connection.query("SELECT * FROM `sys`.`layui`",function (e,r,f) {
    if(e) throw  e;
    res.render('admin/list',{dataList:r})
  });
});*/

router.get('/userlist',function (req,res,next) {
  var order = "Id asc";
  if(req.query.o){
    order=req.query.o;
  }
  connection.query("SELECT * FROM `sys`.`layui2` order by "+order,function (e,r,f) {
    if(e) throw  e;
    res.render('admin/userlist',{dataList:r})
  });
});

router.get('/userlistAJAX',function (req,res,next) {
  var order = "Id asc";
  if(req.query.o){
    order=req.query.o;
  }
  connection.query("SELECT * FROM `sys`.`layui2` order by "+order,function (e,r,f) {
    if(e) throw  e;
    res.send(r);
  });
});

router.get('/message',function (req,res,next) {
  res.render("admin/message");
});

router.get('/message_data',function (req,res,next) {
  var order = "Id ASC";
  console.log(req.query.order);
  if(req.query.order){
    order = req.query.order;
  }
  console.log(order);
  console.log("SELECT * FROM `sys`.`message` order by "+order);
  connection.query("SELECT * FROM `sys`.`message` order by "+order,function (e,r,f) {
    if(e) throw  e;
    var count = r.length; // 总数据条数
    var pageCount = Math.ceil(count/5);//每页显示5条数据
    var acPage = req.query.pageCode; //表示当前页码
    connection.query("SELECT * FROM `sys`.`message` limit "+(acPage-1)*5+",5",function (e,r) {
      if(e) throw  e;
      res.send({messageData:r,pageNum:pageCount});
    });
  });
});

router.get('/message_page',function (req,res,next) {
  connection.query("SELECT * FROM `sys`.`message`",function (e,r,f) {
    if(e) throw  e;
    var count = r.length; // 总数据条数
    var pageCount = Math.ceil(count/5);//每页显示5条数据
    var acPage = req.query.pageCode; //表示当前页码
    //分页公式 ： limit "+(当前页码-1)-显示的项目数+","一页显示的项目数"
    connection.query("SELECT * FROM `sys`.`message` limit "+(acPage-1)*5+",5",function (e,r) {
      if(e) throw  e;
      res.send({messageData:r,pageNum:pageCount});
    });
  });
});

/*router.get('/message_data',function (req,res,next) {
  var order = "Id asc";
  if(req.query.o){
    order = req.query.o;
    console.log(order);
  }
  connection.query("SELECT * FROM `sys`.`message` order by "+order,function (e,r,f) {
    if(e) throw  e;
    var count = r.length; // 总数据条数
    var pageCount = Math.ceil(count/5);//每页显示5条数据
    var acPage = req.query.pageCode; //表示当前页码
    //分页公式 ： limit "+(当前页码-1)-显示的项目数+","一页显示的项目数"
    console.log(acPage);
    connection.query("SELECT * FROM `sys`.`message` limit "+(acPage-1)*5+",5",function (e,r) {
      if(e) throw  e;
      res.send({messageData:r,pageNum:pageCount});
    });
  });
});*/

router.get('/delMessage',function (req,res,next) {
  var mid = req.query.mid;
  console.log(`DELETE FROM \`sys\`.\`message\` where Id=${mid}`);
  connection.query(`DELETE FROM \`sys\`.\`message\` where Id=${mid}`,function (e,r,f) {
    if(e) throw  e;
    console.log(mid);
    res.send(r);
  });
});

router.get('/deleteListData',function (req,res,next) {
  var mid = req.query.mid;
  connection.query("DELETE FROM `sys`.`layui2` where Id="+mid,function (e,r,f) {
    if(e) throw e;
    console.log(mid);
  });
  res.redirect('/admin/userlist');
});

router.get('/user_add',function (req,res,next) {
  res.render('admin/addUser'); //渲染时使用文件的路径
});

router.post('/addUser',upload.single('tuxiang'),function (req,res,next) {
  connection.query('INSERT INTO layui2 set tuxiang=?,name=?,youxiang=?,shoujihaoma=?',[req.file.filename,req.body.name,req.body.youxiang,req.body.shoujihaoma],function (e,r,f) {
    if(e) throw e;
    console.log(req.body);
  });
  res.redirect('/admin/userlist'); //跳转时输入路由的路径
});

router.get('/updateUser',function (req,res,next) {
  connection.query('SELECT * FROM layui2 where id=?',[req.query.mid],function (e,r) {
    if(e) throw e;
    res.render('admin/updateUser',{mkk:r[0]})
  })
});
router.post('/update_user',upload.single("tuxiang"),function (req,res,next) {
  var sql;
  var dataArr;
  if(req.file){
    sql = 'UPDATE layui2 SET  tuxiang=?,name=?,youxiang=?,shoujihaoma=? where Id=?';
    dataArr = [req.file.filename,req.body.name,req.body.youxiang,req.body.shoujihaoma,req.body.Id];
  }else{
    sql = 'UPDATE layui2 SET  name=?,youxiang=?,shoujihaoma=? where Id=?';
    dataArr = [req.body.name,req.body.youxiang,req.body.shoujihaoma,req.body.Id];
  }
  connection.query(sql,dataArr,function (e,r) {
  });
  res.redirect('/admin/userlist');
});


router.get('/login',function (req,res,next) {
  res.render('admin/login');
});

router.get('/audio',function (req,res,next) {
  res.render('admin/audio');
});

//接收homepage1中的ajax上传图片的路由
router.post('/upImg',upload.single('logo'),function (req,res,next) {
  console.log(req.file);
  res.send(req.file.filename);
});

//商品列表导航
router.get('/nav',function (req,res,next) {
  res.render('admin/nav')
});

//商品数据
router.get('/nav_select',function (req,res,next) {
  connection.query("SELECT * FROM nav",function (e,r) {
    res.send(r);
  })
});

//商品增加
router.get('/nav_add',function (req,res,next) {
  res.render('admin/nav_add');
});

//商品增加数据
router.post('/nav_add_data',function (req,res) {
  connection.query('select navName from nav where navName=?',[req.body.navName],function (e,r) {
    if(!r.length){ //判断商品是否已经存在
      var sql = 'insert into nav set navName=?,parentId=?,sort=?,pageName=?,keywords=?,description=?';
      var data = [req.body.navName,req.body.parentId,req.body.sort,req.body.pageName,req.body.keywords,req.body.description];
      connection.query(sql,data);
      res.render('admin/nav');
    }
  });
});

//编辑商品页面
router.get("/nav_editor",function (req,res) {
  connection.query("select * from nav where Id=?",[req.query.Id],function (e,r,f) {
    res.render('admin/nav_editor',{data:r[0],msg:req.query.msg});
  })
});

//编辑商品数据
router.post('/nav_editor_data',function (req,res) {
  connection.query('select Id,navName from nav where navName=? and Id!=?',[req.body.navName,req.body.Id],function (e,r,f) {
    //Id!=?表示设置查询所有的数据名称 但不包括要修改的那一条数据，如果查到了就说明有数据的商品名重复了
    if(r.length){
      //如果有重复的数据 就重新载人更新页面 并把当前要修改的这条数据的id传到里面去
      res.redirect(`/admin/nav_editor?Id=${req.body.Id}&msg=这个项目已经存在！`)
    }else{
      var sql = 'UPDATE nav set navName=?,sort=?,pageName=?,keywords=?,description=? where Id=?';
      var data = [req.body.navName,req.body.sort?req.body.sort:0,req.body.pageName,req.body.keywords,req.body.description,req.body.Id];
      connection.query(sql,data);
      res.render('admin/nav');
    }
  })
});

//删除商品
router.get('/nav_del',function (req,res,next) {
  console.log([req.query.idp].join(","));
  console.log(`DELETE FROM nav where Id in(${[req.query.idp].join(",")})`);
  connection.query(`DELETE FROM nav where Id in(${[req.query.idp].join(",")})`);
  res.send('删除成功');
});


//新增文章
router.get('/add_txt',function (req,res) {
  console.log(req.query.Id);
  res.render('/admin/add_txt');
});


module.exports = router;