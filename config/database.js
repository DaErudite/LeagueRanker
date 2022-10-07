const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 8000;

dbConnect = async function (app){
    try{
        await mongoose.connect(process.env.DB_URI, () => {
            console.log('Database Connected');
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        })

    }
    catch(error){
        console.log(error)
    }
}

module.exports = {dbConnect};