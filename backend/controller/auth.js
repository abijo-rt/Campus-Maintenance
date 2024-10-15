const {Incharge} =require('../model/schema')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.addInCharge =async(req,res) =>{
    console.log(req.body);
    const{email,phone,flag}=req.body
    const role=flag==1?'incharge':'admin'
    try{
        const ispre=await Incharge.findOne({email})
        if(ispre) return res.status(400).send("user email already exisits")

        const hashedpassword=await bcrypt.hash(req.body.phone,10);
    const new_incharge=new Incharge({
        name:req.body.username,
        email:req.body.email,
        password:hashedpassword,
        worktype:req.body.type,
        phoneno:req.body.phone,
        role:role
    })

    const newi=await new_incharge.save()
    if(newi){
        res.send(`new ${role} created suceesfully`)
        console.log(await Incharge.countDocuments({role:'admin'}))
    }
}catch{

}
}

exports.login= async (req,res)=>{
    const { email, password } = req.body;
console.log(req.body)
    try {
        // Find the user by email
        const incharge = await Incharge.findOne({ email });
        if (!incharge) {
            console.log("Invalid email or password")
            return res.status(400).send("Invalid email or password");
        }
        
        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, incharge.password);
        if (!isMatch) {
            console.log("Invalid email or password")
            return res.status(400).send("Invalid email or password");
        }
        
        // Generate token
        const token = jwt.sign(
            { _id: incharge._id, role: incharge.role },
            'your-jwt-secret',
            { expiresIn: '1h' }
        );
        // const decoded = jwt.verify(token, 'your-jwt-secret');
        
        console.log("Token sent")
        res.send({token});
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
    }
}