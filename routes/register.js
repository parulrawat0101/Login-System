var express = require('express');
var router = express.Router();
var User=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{
      'title':'Register'
  })
});
router.get('/login', function(req, res, next) {
    res.render('login',{
        'title':'Login'
    })
  });

  router.post('/',function(req,res,next){
    //get form values
    var name=req.body.Name;
    var email=req.body.Email;
    var username=req.body.Username;
    var password=req.body.Password;
    var password2=req.body.Password2;
  

  //check for image field
  // if (req.files.Profileimage) {
  //   console.log('Uploading file');

  //   //fetching properties of file to display
  //   var profileOriginalName=req.files.Profileimage.originalname;
  //   var profileImageName=req.files.Profileimage.name;
  //   var profileImageMime=req.files.Profileimage.mimetype;
  //   var profileImagePath=req.files.Profileimage.path;
  //   var profileImageExtension=req.files.Profileimage.extension;
  //   var profileImageSize=req.files.Profileimage.size;
  //   //var profileImagePath=req.files.Profileimage.path; 

  // }
  // else {
  //   var profileImageName='noimage.png'
  // }

  //form validation
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  //check for errors
  var errors=req.validationErrors();
  if(errors) {
    res.render('register',{
      errors: errors,
      //to not delete all the netered data when re rendered, thats why we passing local variables
      name: name,
      email: email,
      username: username,
      password: password,
      password2: password2
    })
  }
  else {
    var newUser=new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImageName
      
    });
    //create user
    User.createUser(newUser, function(err,res){
      if(err) throw err;
      console.log(user);
    });
    req.flash('success','You are registered and may log in');

    res.location('/');
    res.redirect('/');
  }


});
module.exports = router;