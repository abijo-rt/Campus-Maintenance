const express = require('express');
const app = express();
const cors =require('cors');
const mongoose=require('mongoose')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { Worklog, WorkerDetails } = require('./model/schema');
// const apiController =require('./controller/apiController')
// const auth=require('./controller/auth')
// const CardData=require('./controller/cardData')
// const appdata=require('./controller/appdata')
const routes = require('./routes/routes')
app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
  

app.use('/', routes);



// app.post('/work',apiController.addWork);
// app.post('/staff',apiController.addStaff);
// app.post('/incharge',auth.addInCharge);
// app.get('/worklog',apiController.getWorkData);
// app.get('/staff',apiController.getWorkerDetails);
// app.get('/getstaff',apiController.getstaffname);
// app.post('/locationData',appdata.addlocation);
// app.post('/worklog',apiController.editwork);
// app.get('/cardinfo',apiController.getcard)
// app.get('/dashcardinfo',CardData.getdashcard)
// app.get('/cardtype',apiController.getcardtype)
// app.post('/login',auth.login);
// app.post('/updateworker',apiController.updateworker);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 'mongodb+srv://devaabijoit22:abijo@cluster0.bjkvpaa.mongodb.net/campus-m?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect('mongodb://localhost:27017/campus-maintence', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });