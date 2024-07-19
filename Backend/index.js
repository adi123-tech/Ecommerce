const express = require("express");
const cors = require("cors");
const JWT = require("jsonwebtoken");
const secretKey = "abc@123";
require("./Mongodb/Config"); //mogoose connection

const app = express();
app.use(express.json());
app.use(cors());

//middleware connection
const Middleware = require("./Middleware/verifyToken");
const route = express.Router();
route.use(Middleware);
route.get("/Middleware");

//MongoDb
const user = require("./Mongodb/schemas/Users"); //users schemas and model
const product = require("./Mongodb/schemas/Products"); //products schemas and model

app.post("/signup", async (req, resp) => {
  const datafromfrontend = req.body;
  const res = await user.create(datafromfrontend);
  const { Password, ...userWithoutPassword } = res._doc;
  JWT.sign(
    { userWithoutPassword },
    secretKey,
    { expiresIn: "1h" },
    (err, token) => {
      if (err) {
        resp.status(404).send({ msg: "something is wrong" });
      }
      resp.status(200).send({ user: userWithoutPassword, auth: token });
    }
  );
});

app.post("/login", async (req, resp) => {
  const result = await user.findOne({ Email: req.body.Email });
  if (req.body.Email && req.body.Password) {
    if (result !== null) {
      if (req.body.Password === result.Password) {
        const { Password, ...userWithoutPassword } = result._doc;
        JWT.sign(
          { userWithoutPassword },
          secretKey,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              resp.status(404).send({ msg: "something is wrong" });
            }
            resp.status(200).send({ user: userWithoutPassword, auth: token });
          }
        );
      } else {
        resp.status(404).send({ msg: "Password Not Match" });
      }
    }
  } else {
    resp.status(404).send({ msg: "User Not Found" });
  }
});

route.post("/addproduct", async (req, resp) => {
  const mongodb = await product.create(req.body);
  resp.send({ msg: "Create", data: mongodb });
});

route.get("/listproduct", async (req, res) => {
  const data = await product.find(
    {},
    { _id: 1, Name: 1, Price: 1, Category: 1, Company: 1 }
  );
  res.send(data);
});

route.delete("/deleteproduct/:id", async (req, resp) => {
  const data = await product.deleteOne({ _id: req.params.id });
  resp.send({ msg: "deleted" });
});

route.put("/update/:id", async (req, res) => {
  await product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        Name: req.body.Name,
        Price: req.body.Price,
        Category: req.body.Category,
        Company: req.body.Company,
      },
    }
  );
  res.send({ msg: "success update", id: req.params.id });
});

route.get("/prefillformforupdate/:id", async (req, resp) => {
  try {
    const data = await product.findOne(
      { _id: req.params.id },
      { Name: 1, Price: 1, Category: 1, Company: 1, _id: 0 }
    );
    if (!data) {
      return resp.status(404).send({ msg: "Product not found" });
    }
    resp.send(data);
  } catch (error) {
    resp.status(500).send({ msg: "Server error", error });
  }
});

route.get("/search/:name", async (req, resp) => {
  const data = await product.find({
    $or: [{ Name: { $regex: req.params.name } }],
  });
  resp.send(data);
});


app.use("/", route);

app.listen(5000, () => {
  console.log("Server is on 5000");
});
