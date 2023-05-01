const fs = require("fs");
const path = require("path");

class SeedDataManager {
  #models = {};
  #dataPath;
  #seedDataFileNames;
  constructor(seedDatasPath, connections, initOnCreate) {
    connections.forEach((connection) => {
      Object.keys(connection.models).forEach((modelName) => {
        this.#models[modelName] = connection.models[modelName];
      });
    });
    this.#dataPath = seedDatasPath;
    this.#seedDataFileNames = fs.readdirSync(this.#dataPath);

    if (initOnCreate) {
      this.init();
    }
  }

  init() {
    console.log("checking seed datas");
    this.#seedDataFileNames.map(async (seedDataFileName) => {
      const modelName = seedDataFileName.split(".")[0];
      if (!this.#models[modelName]) return;
      if ((await this.#models[modelName].count()) > 0) return;

      const datas = JSON.parse(
        fs.readFileSync(path.join(this.#dataPath, seedDataFileName)).toString()
      );

      datas.map(async (data) => {
        const newData = new this.#models[modelName](data);
        await newData.save();
      });

      console.log(modelName + " seed data created successfully");
    });

    console.log("all seed datas completed");
  }
}

module.exports.SeedDataManager = SeedDataManager;
