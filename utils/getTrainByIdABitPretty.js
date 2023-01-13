const getTrainByIdABitPretty = (string) => {
    try {
        let obj = {};
        let retval = {};
        let data = string.split("~~~~~~~~");
        if (
            data[0] === "~~~~~Please try again after some time." ||
            data[0] === "~~~~~Train not found"
        ) {
            retval["success"] = false;
            retval["time_stamp"] = Date.now();
            retval["data"] = data[0].replaceAll("~", "");
            return retval;
        }
        let data1 = data[0].split("~");
        data1 = data1.filter((el) => {
            return el != "";
        });
        if (data1[1].length > 6) {
            data1.shift();
        }
        obj["train_no"] = data1[1].replace("^", "");
        obj["train_name"] = data1[2];
        obj["from_stn_name"] = data1[3];
        obj["from_stn_code"] = data1[4];
        obj["to_stn_name"] = data1[5];
        obj["to_stn_code"] = data1[6];
        obj["from_time"] = data1[11];
        obj["to_time"] = data1[12];
        obj["travel_time"] = data1[13];
        obj["running_days"] = data1[14];
        data1 = data[1].split("~");
        data1 = data1.filter((el) => {
            return el != "";
        });
        obj["type"] = data1[11];
        obj["train_id"] = data1[12];
        obj["distance_from_to"] = data1[18];
        obj["average_speed"] = data1[19];
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = obj;
        return retval;
    } catch (err) {
        console.warn(err.message);
    }
}

module.exports = getTrainByIdABitPretty;