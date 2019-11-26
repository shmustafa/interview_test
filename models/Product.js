let productsData = "./data/products.json";
const fs = require("fs");

const getAll = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(productsData, "utf8", (err, f_data) => {
      if (err) {
        reject(err);
      } else {
        let data = JSON.parse(f_data);
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            data[i]["product_collections"] = JSON.parse(
              data[i]["product_collections"]
            );
          }
        }
        return resolve(data);
      }
    });
  });
};

const getByID = (id) => {
  return new Promise((resolve, reject) => {
    fs.readFile(productsData, "utf8", (err, f_data) => {
      if (err) {
        reject(err);
      } else {
        let data = JSON.parse(f_data);
        if (data && data.length) {
          for (let i = 0; i < data.length; i++) {
            if(data[i]['id'] == id){
              data[i]["product_collections"] = JSON.parse(
                data[i]["product_collections"]
              );
              return resolve(data[i]);
            }
          }
          return resolve(null);
        }else{
          return resolve(null);
        }
      }
    });
  });
};

module.exports = { getAll, getByID };
