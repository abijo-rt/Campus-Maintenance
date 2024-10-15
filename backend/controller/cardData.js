const {CardData} =require('../model/schema')
const {WorkerDetails} =require('../model/schema')
const {Incharge} =require('../model/schema')




exports.getdashcard=async(req,res)=>{
const date=req.query.date;

console.log(req.query)

console.log(await Incharge.countDocuments({role:'incharge'}))
console.log(await Incharge.countDocuments({role:'admin'}))
const data = await CardData.findOne({date:date})

const p1=await Incharge.countDocuments({role:'incharge'})
    const p2=await Incharge.countDocuments({role:'admin'})
    const p3=await WorkerDetails.countDocuments()
if(data){
    
    const carddata={
        totalwork:data.totalwork,
        pending:data.pending,
        completed:data.completed,
        worker:p3,
        incharge:p2,
        admin:p1
    }
    res.json(carddata)

}else{
    const carddata={
        totalwork:0,
        pending:0,
        completed:0,
        worker:p3,
        incharge:p2,
        admin:p1
    }
res.json(carddata)

}



}