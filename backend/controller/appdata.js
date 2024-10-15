const LocationData =require('../model/appData')


exports.addlocation= async (req,res) => {
    console.log(req.body);
    
    const newlocation=new LocationData({
        name:req.body.name
    })
    const all=await LocationData.find()
    console.log(all)

    if(await newlocation.save()){
        res.send("added location")
    }
}