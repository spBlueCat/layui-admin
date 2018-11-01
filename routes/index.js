var express = require('express');
var router = express.Router();
var svgCaptcha = require('svg-captcha');
var mysql  = require('mysql'); //加载mysql模块

var connection = mysql.createConnection({
  host     : '127.0.0.1',//数据库的地址
  user     : 'root', //数据库登录的用户名
  password : '123456',//数据库登录的密码
  database : 'sys' //项目所使用的数据库的名字
});
connection.connect(); //链接数据库
router.get('/captcha', function (req, res,next) {
  var captcha = svgCaptcha.create();
  /*req.session.captcha = captcha.text;*/
  res.cookie('code',captcha.text);
  res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
  res.status(200).send(captcha.data);
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var session = require('express-session');
router.use(session({
  secret:'keyboard cat', //session的签名
  resave:false, //保持服务端 防止被修改
  saveUninitialized:false, //初始化
  cookie:{maxAge:1000*60*60}
}));

router.post('/login-ver',function (req,res,next) {  //用户登录
  connection.query('SELECT * FROM layui2 where name=? && password=?',[req.body.username,req.body.pwd],function (e,r) {
    if(e) throw  e;
    if(r.length>0){ //如果用户名和密码正确则将用户名缓存
      /*res.cookie("username",req.body.username);*/
      req.session.username = req.body.username;
      res.redirect('/admin');
    }else{
      res.render('admin/login');
    }
  });
});
router.get('/user_out',function (req,res,next) { //用户登出
  res.clearCookie("connect.sid");
  res.redirect('admin/login');
});


/*//设置session
router.get('/setS',function (req,res) {
  req.session.mt = 1234;
  res.send("设置成功!");
});

//访问session
router.get('/getS',function (req,res) {
  res.send(req.session);
});*/
var multer = require('multer');
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
router.post("/abc",upload.array('logo'),function (req,res,next) {
  res.send('ajax');
});




module.exports = router;
