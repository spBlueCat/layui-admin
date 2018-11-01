/*
var express = require('express');
var router = express.Router();
var multer = require('multer');
/!* GET home page. *!/
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/user',function (req,res,next) {
  res.render('admin/user',{title:'express'});
});

router.get('/homepage1',function (req,res,next) {
  res.render("admin/homepage1");
});
*/



/*var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir="public/images"; //设置目录名称
    multer({dest:dir});//如果目录不存在就创建目录
    cb(null, dir);//把上传的文件存在这个目录
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() +"."+file.originalname.split(".")[1]);//设置上传的文件名称
  }
});
var upload = multer({ storage: storage });//使用配置文件*/

//第三部：接收上传文件
/*router.post('/website_data',upload.single('web-logo'),function(req, res, next) {
  console.log(req.file);//包含文件上传的信息
  console.log(req.body);
  res.send('文件上传成功');
});*/
/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',//数据库的地址
  user     : 'root', //数据库登录的用户名
  password : '123456',//数据库登录的密码
  database : 'sys' //项目所使用的数据库的名字
});

connection.connect(); //链接数据库

router.get('/homepage1',function (req,res,next) {
  connection.query('SELECT * FROM layui', function (error, results, fields) { //查询数据库中表的数据
    if (error) throw error;
    console.log(results); //包含所查询的数据
    res.render('admin/homepage1',{data:results[0]});
  });
});
router.post('/website_data',upload.single("logo"),function (req,res,next) {
  var sql;//用于存放sql语句
  var dataArr;//用于设置接收的数据
  if(req.file){  //判断用户是否传递了文件 如果传递了文件则添加文件名
    sql='update layui set title=?,logo=?,control=?,address=?,keyword=?,descript=?,record=? where Id=1';
    dataArr = [req.body.title,req.file.filename,req.body.control,req.body.address,req.body.keyword,req.body.descript,req.body.record];
  }else{
    sql='update layui set title=?,control=?,address=?,keyword=?,descript=?,record=? where Id=1';
    dataArr = [req.body.title,req.body.control,req.body.adddress,req.body.keyword,req.body.descript,req.body.record];
  }
  connection.query(sql,dataArr, function (error, results, fields) { //查询数据库中表的数据
    if (error) throw error;
    console.log(req.body.title);
    console.log(results.changedRows); //得到更新的个数
  });
  res.redirect("/admin/homepage1"); //重定向，更新后跳转到指定的页面
});
router.post('/amd',upload.single("web-logo"),function (req,res,next) {
  connection.query('UPDATE layui` SET title=?,logo=? WHERE Id=1',[req.body.title,req.filename], function (error, results, fields) { //查询数据库中表的数据
    if (error) throw error;
    console.log(req.body);
    console.log(results.changedRows); //得到更新的个数
  });
  res.send("发送成功");
});
module.exports = router;
*/