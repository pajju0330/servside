const getTrainBetweenABitPretty = require('../utils/getTrainBetweenABitPreety')
const getTrainByIdABitPretty = require('../utils/getTrainByIdABitPretty');
const dayOnDate = require('../utils/DayonDate');
const getRouteABitPretty = require('../utils/getRouteABitPretty')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {StatusCodes} = require('http-status-codes');

const getTrainBetween = async(req,res) => {

    const {to,from} = req.query;
    const URL = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try{
        const response = await fetch(URL, {
            method: "GET"
        });
        const data = await response.text()
        res.status(StatusCodes.OK).json(getTrainBetweenABitPretty(data));
    }catch(err){
        console.log(err);
    }
}


const getTrainById = async(req,res) => {

    const {id} = req.query;
    
    const URL = `https://erail.in/rail/getTrains.aspx?TrainNo=${id}&DataSource=0&Language=0&Cache=true`;
    try{
        const response = await fetch(URL, {
            method: "GET"
        });
        const data = await response.text()
        res.status(StatusCodes.OK).json(getTrainBetweenABitPretty(data));
    }catch(err){
        console.log(err);
    }
}


const getTrainRoute = async(req,res) => {
    const {id} = req.query;
    try {
      const URL = `https://erail.in/rail/getTrains.aspx?TrainNo=${id}&DataSource=0&Language=0&Cache=true`;
      const response = await fetch(URL);
      const data = await response.text();
      const jsonData = getTrainByIdABitPretty(data);
      if (!jsonData["success"]) {
        res.json({ jsonData });
        return;
      }
      URL = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${jsonData["data"]["train_id"]}&Data2=0&Cache=true`;
      response = await fetch(URL);
      data = await response.text();
      res.json(getRouteABitPretty(data));
    } catch (err) {
      console.log(err.message);
    }
}


const getTrainOn = async(req,res) => {
    const arr = [];
    const retval = {};
    const {to,from,date} = req.params;
    if(!date ){
        res.status(StatusCodes.BAD_REQUEST).json({
            success: 'false',
            'time-stamp': Date.now(),
            message:'Please mention a date'
        })
    }
    const URL = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try {
        const response = await fetch(URL, {
          method: "GET",
        });
        const data = await response.text();
        const jsonData = getTrainBetweenABitPretty(data);
        if (!jsonData['success']) {
          res.json(jsonData);
          return;
        }
        const DD = date.split("-")[0];
        const MM = date.split("-")[1];
        const YYYY = date.split("-")[2];
        const day = dayOnDate(DD, MM, YYYY);
        json["data"].forEach((ele, ind) => {
          if (ele["train_base"]["running_days"][day] == 1) arr.push(ele);
        });
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        res.json(retval);
      } catch (err) {
        console.log(err);
      }
}

module.exports = {getTrainBetween,getTrainById,getTrainRoute,getTrainOn};