const dayOnDate = (DD, MM, YYYY) => {
    let date = new Date(YYYY, MM, DD);
    let day =
      date.getDay() >= 0 && date.getDay() <= 2
        ? date.getDay() + 4
        : date.getDay() - 3;
    return day;
}

module.exports = dayOnDate;