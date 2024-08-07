const express = require('express');
const app = express();
const users=require('./routes/user');
const posts=require('./routes/post');
const ejsMate = require('ejs-mate');
const path = require('path');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

const sessionOption=({
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true});

app.use(session(sessionOption));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.successmsg=req.flash('success');
    res.locals.errormsg=req.flash('error');
    next();
})


app.get("/test",(req,res)=>{
    res.send("test successfull!");
});


app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    } else{
        req.session.count=1;   
    }
    res.send(`you sent a request ${req.session.count} times`);
});


app.get("/register",(req,res)=>{
    let {name="anonyms"}=req.query;
    req.session.name=name;
    if(name=="anonyms"){
        req.flash("error","user not registered!");
    }else{
        req.flash("success","user registered successfully!  ");
    }
    
    res.redirect('/hello');
});

app.get("/hello",(req,res)=>{
    res.render('error.ejs',{name:req.session.name});

})

// app.use(cookieParser('scretcode'));

// app.get("/",(req,res)=>{
//    console.dir(req.cookies);
//     res.send("i am root!");
// });

// app.get('/getcookies',(req,res)=>{

//     res.cookie('great','namaste');
//     res.cookie('made-in','india');
//     res.send('cookies send');
// });
// app.get('/greet',(req,res)=>{
//     let {name=anonymos}=req.cookies;
//     res.send(`hii ${name}`);
// });

// app.get("/signedcookies",(req,res)=>{
//     res.cookie('made-in','india',{signed:true});
//     res.send('signed cookie send');
// })

// app.get("/varify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send('varified');
// })


// app.use('/users',users);
// app.use('/posts',posts);







app.listen(3000,()=>{
    console.log('server is listening to 3000');
})