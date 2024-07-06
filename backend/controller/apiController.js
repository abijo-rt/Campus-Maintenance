// controller/apiController.js

const { Worklog, WorkerDetails, OData, Workinfo } = require('../model/schema');

exports.addWork = async (req, res) => {
    try {
        const workData = req.body;
        const newWork = new Worklog({
            date: workData.date,
            taskid: workData.taskid,
            location: workData.location.name,
            category: workData.category.name,
            workerCount: workData.workerCount,
            workerDetails: workData.workerDetails,
        });

        const workinfo = await Workinfo.findOne({ date: workData.date });
        console.log(workinfo)

        if (workinfo) {
            console.log("document is alredy exists")
            const locationName = workData.location.name;
            if (await Workinfo.findOne({ date: workData.date, 'location.location': workData.location.name })) {
                console.log("incarementing pennign work")
                const locationIndex = workinfo.location.findIndex(loc => loc.location === locationName);
                workinfo.location[locationIndex].pending += 1;
                await workinfo.save();
            } else {
                console.log("pushing new document")
                await Workinfo.findOneAndUpdate(
                    { date: workData.date },
                    {
                        $push: {
                            location: {
                                location: workData.location.name,
                                pending: 1,
                                completed: 0
                            }
                        }
                    },
                    { new: true, upsert: true }
                )
            }
        } else {
            const newWorkinfo = new Workinfo({
                date: workData.date,
                location: [{ location: workData.location.name, pending: 1, completed: 0 }]
            });
            await newWorkinfo.save();
        }
        const savedWork = await newWork.save();
        const response = { message: 'Work data received and saved successfully' };
        res.json(response);
    } catch (error) {
        console.error('Error saving work data:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.addStaff = async (req, res) => {
    try {
        const data = req.body;
        console.log("data", data);
        const newstaff = new WorkerDetails({
            name: data.name,
            skill: data.skill,
            phone: data.phone,
            gender: data.gender,
        });


        const savedStaff = await newstaff.save();
        console.log('Staff data saved successfully:', savedStaff);

        const response = { message: 'Staff data received and saved successfully' };
        res.json(response);
    } catch (error) {
        console.error('Error saving staff data:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getWorkData = async (req, res) => {

    try {
        const workData = await Worklog.find();
        console.log(workData);
        console.log("workData >>>");
        res.json(workData);
    } catch (error) {
        console.error('Error fetching work data:', error);
        res.status(500).json({ error: 'Error fetching work data' });
    }

};

exports.getWorkerDetails = async (req, res) => {
    try {
        const workerDetails = await WorkerDetails.find();
        console.log(workerDetails);
        console.log("WORKER DETAILS >>>")
        res.json(workerDetails);
    } catch (error) {
        console.error('Error fetching worker details:', error);
        res.status(500).json({ error: 'Error fetching worker details' });
    }
};

exports.getOptiondata = async (req, res) => {
    try {
        const optiondata = await OData.find();
        console.log(optiondata);
        res.json(optiondata);
    } catch (error) {
        console.error('Error fetching worker details:', error);
        res.status(500).json({ error: 'Error fetching worker details' });
    }
};

exports.getstaffname = async (req, res) => {
    try {
        const staffname = await WorkerDetails.find({ status: true }, 'name');
        console.log(staffname);
        console.log("staff name are sent");
        res.json(staffname);
    } catch (error) {
        console.error('Error fetching worker details:', error);
        res.status(500).json({ error: 'Error fetching worker details' });
    }
}

exports.editwork = async (req, res) => {
    try {
        const id = req.body.taskid; // Assuming the ID is passed as a URL parameter
        const data = req.body;
        const date = req.body.date;
        const location = req.body.location;
        const result = await Worklog.findOneAndUpdate({ taskid: id }, data, { new: true });
        console.log('restult', result);

        const workinfo = await Workinfo.findOne({ date: date });
        console.log(workinfo)

        if (workinfo) {
            console.log("document is alredy exists")
            const locationName = location;
            if (await Workinfo.findOne({ date: date, 'location.location': location })) {
                console.log("incarementing pennign work")
                const locationIndex = workinfo.location.findIndex(loc => loc.location === locationName);
                workinfo.location[locationIndex].completed += 1;
                await workinfo.save();
            }

        }
        if (!result) {
            return res.status(404).json({ error: 'Work log not found' });
        }

        res.status(200).json({status:200, message: 'Data updated successfully', data: result });
    } catch (error) {
        console.error('Error updating worker details:', error);
        res.status(500).json({ error: 'Error updating worker details ffffffff' });
    }
};

exports.getcard = async (req, res) => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const currdate = `${day}-${month}-${year}`;


    try {
        console.log("request recived")
        console.log(currdate)

        const cardinfo = await Workinfo.findOne({ date: currdate }, 'location -_id');
        console.log(cardinfo)
        res.json(cardinfo);
    } catch { }
}