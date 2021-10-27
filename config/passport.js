const passport =require('passport');
const localStrategy=require('passport-local').Strategy;
const bycrpt =require('bcryptjs');
const User =require("../models/user");

passport.use(new localStrategy({
    usernameField:'email'

},
(email,password,done)=>{
    User.findOne({
        where:{
            email:email
        }
    }).then((user)=>{
        if(!user){
            console.log("user not found");
            return done(null,false,{message:"user not found"})
        }else{
            console.log("user found");
            bycrpt.compare(password,user.password,(err,validpassword)=>{
                if(err) throw err
                if(validpassword)
                {
                    console.log("correct password");
                    return done(null,user)
                }else{
                    console.log("incorrect password");
                    return done(null,false,{message:" password incorrect"})
                }
            })
        }

    }).catch((err)=>{
        return done(null,false,{
            message:err
        })
    })

}


));
passport.serializeUser(function(user, done) {
    console.log("ser running"); 
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
   User.findOne({
       where:{
           id:id
       }
   }).then((user)=>{
       done(null,user);
   }).catch((err)=>console.log(err))
  });



