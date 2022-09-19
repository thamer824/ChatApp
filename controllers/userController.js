const User = require("../model/userModel");
const bcrypt = require("bcrypt");


module.exports.register=async (req,res,next)=>{
// console.log(req.body)// hedhi amalneha bech naarfou w net2akdou eli ki l controller kaed yekhdem a ay haja tektebha f register te5dem
try {
const{username,email,password} = req.body;
const usernameCheck = await User.findOne({username});
if (usernameCheck)
return res.json({msg:"Username already exists",status:false});
const emailCheck = await User.findOne({email});
if (emailCheck)
return res.json({msg:"email already exists",status:false});
const Hashed = await bcrypt.hash(password,10);
const user = await User.create({
    email,username,password:Hashed
});
delete user.password;
return res.json({status:true,user})
} catch (error) {
    next(error) //ken fama mistake
}
};



module.exports.login= async (req,res,next)=>{
    // console.log(req.body)// hedhi amalneha bech naarfou w net2akdou eli ki l controller kaed yekhdem a ay haja tektebha f register te5dem
    try {
    const{username,password} = req.body;
    const user = await User.findOne({username});
    if (!user)
     return res.json({msg:"InCorrect Username",status:false});
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid)
     return res.json({msg:"password does not exist pls try again!",status:false});
    delete user.password;
   
    return res.json({status:true,user})
    } catch (error) {
        next(error) //ken fama mistake
    }  
    };


    module.exports.setAvatar= async (req,res,next)=>{
        try {
            const userId =req.params.id;
            const avatarImage=req.body.image;
            const userData = await User.findByIdAndUpdate(userId,{
                isAvatarImageSet: true,
                avatarImage,
            });
            return res.json({isSet:userData.isAvatarImageSet,image:userData.avatarImage
            })

        } catch (ex) {
            next(ex)
        }
    };


    module.exports.getAllUsers = async (req, res, next) => {
        try {
          const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
          ]);
          return res.json(users);
        } catch (ex) {
          next(ex);
        }
      };