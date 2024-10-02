const express = require('express');
const  authMiddleware  = require('../middleware');


const { PrismaClient }=  require('@prisma/client')

const prisma = new PrismaClient()

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    
    try {
        const account = await prisma.accountSchema.findFirst({
            where: {
                userId: req.UserId
            }
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        else{
            res.json({balance: account.balance});
        }

     
        console.log(account.balance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/transfer", authMiddleware, async (req, res) => {

    let { amount, to } = req.body;
    
    
    amount = parseInt(amount);
    if(amount === "NaN" || amount <= 0){
        return res.status(400).json({
            message: "Invalid amount"
        });
    }
    
    // amount = amount.toFixed(2);

    try{
            const result = await prisma.$transaction(async(prisma)=>{
              // Fetch the accounts within the transaction
            const account = await prisma.accountSchema.findFirst({
            where:{
                userId: req.UserId
                }
            });

            if (!account || account.balance < amount) {
            throw new Error("Insufficient balance");    
                }

            const toAccount = await prisma.accountSchema.findFirst({
                where: {
                    userId: to 
                }
                });

            if (!toAccount) {
            throw new Error("Recipient account not found");
            }

            // Perform the transfer
            await prisma.accountSchema.update({
                where:{id:account.id},
                data:{balance:{decrement:amount}}
            });
            await prisma.accountSchema.update({
                where:{id:toAccount.id},
                data:{balance:{increment:amount}}
            });
        
            return res.json({
                message: "Transfer successful"
            });
        })
    }catch(err){
        console.log(err);
        return res.status(400).json({
            message: err.message
        });
    }

  
});

module.exports = router;