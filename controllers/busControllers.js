const data = require('../data.json');
const {StatusCodes} = require('http-status-codes');
const getBusBetween = (req,res) => {
    const {toData,fromData} = req.query;
    let flag = true;
    data.map((locations) => {
        const {to,from,departureTime,arrivalTime} = locations;
        if(toData === to && fromData === from){
            flag = false;
            res.status(StatusCodes.OK).json({to,from,departureTime,arrivalTime});
        }
    })
    if(flag){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "No route found"
        })
    }
}

module.exports = {getBusBetween};

                                       







