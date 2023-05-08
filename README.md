# mongoose-seed-data-manager

This package can check your database for missing data or if you create a new cluster it can easily fill this cluster

---

### for example:

I have a schema like this:

```javascript
const seedTestSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

const seedTest = connection.model("seedTest", seedTestSchema); // or mongoose.model
```

if I create a "speedTest.json" where I want

```json
[
  {
    "id": "test-1",
    "name": "test"
  }
  {
    "id": "test-2",
    "name": "test"
  }
]
```

And run manager it will generate the missing datas if cluster is empty

---

```javascript
const mongoose = require("mongoose");

// create mongoose schema
const seedTestSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
});

// create mongoose connection
const connection = mongoose.createConnection("mongodb://localhost:27017");

// create mongoose model
const seedTest = connection.model("seedTest", seedTestSchema);

const path = require("path");
// import manager
const { SeedDataManager } = require("mongoose-seed-manager");

// create a manager
const seedDataManager = new SeedDataManager(
  path.join(__dirname, "seeds"), // this is the path to the seed datas
  [connection] // you can use multiple connections
);

connection.on("connected", () => {
  console.log("mongoose connected");

  // start checking seed datas
  seedDataManager.init();
});
```
