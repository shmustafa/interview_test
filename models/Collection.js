let collectionsData = "./data/collections.json";
const fs = require("fs");

const getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(collectionsData, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return err;
      }
      return resolve(JSON.parse(data));
    });
  });
};

const getByID = id => {
  return new Promise((resolve, reject) => {
    fs.readFile(collectionsData, "utf8", (err, f_data) => {
      if (err) {
        reject(err);
      } else {
        let data = JSON.parse(f_data);
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]["id"] == id) {
              return resolve(data[i]);
            }
          }
          return resolve(null);
        } else {
          return resolve(null);
        }
      }
    });
  });
};

module.exports = { getAll, getByID };
