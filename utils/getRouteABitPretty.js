const getRouteABitPretty = (string) => {
    try {
        let data = string.split("~^");
        let arr = [];
        let obj = {};
        let retval = {};
        for (let i = 0; i < data.length; i++) {
            let data1 = data[i].split("~");
            data1 = data1.filter((el) => {
                return el != "";
            });
            obj["source_stn_name"] = data1[2];
            obj["source_stn_code"] = data1[1];
            obj["arrive"] = data1[3];
            obj["depart"] = data1[4];
            obj["distance"] = data1[6];
            obj["day"] = data1[7];
            obj["zone"] = data1[9];
            arr.push(obj);
            obj = {};
        }
        retval["success"] = true;
        retval["time_stamp"] = Date.now();
        retval["data"] = arr;
        return retval;
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = getRouteABitPretty;