
const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = async(req, res, next)=>{
   const header = req.headers.authorization

   if(!header || !header.startsWith("Bearer "))
   return res.status(403).json({})
   const token = header.split(" ")[1];

try{        
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.UserId = decoded.UserId;
       next();
   }
   catch(err){
       return res.satus(403).json({message: "blahhhhhh"})
   }
}

   module.exports = authMiddleware;
