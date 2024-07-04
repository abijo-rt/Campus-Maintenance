const express = require('express');
const app = express();
const cors =require('cors');
const mongoose=require('mongoose')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const { Worklog, WorkerDetails } = require('./model/schema');
const apiController =require('./controller/apiController')

app.use(cors());

app.use(cors({
    origin: 'http://localhost:4200'
}));


app.use(bodyParser.json());

// Define a route to handle GET requests from the client

// app.get('/work', (req, res) => {
   
//     res.json({ taskid:1234 });
// });



app.post('/work',apiController.addWork);
app.post('/staff',apiController.addStaff);
app.get('/worklog',apiController.getWorkData);
app.get('/staff',apiController.getWorkerDetails);

app.get('/getstaff',apiController.getstaffname);
app.post('/worklog',apiController.editwork);
app.get('/cardinfo',apiController.getcard)




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

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