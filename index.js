import express from "express";
import cors from "cors";
import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dr6rgwa.mongodb.net/?appName=Cluster0`;
// `mongodb+srv://<db_username>:<db_password>@cluster0.dr6rgwa.mongodb.net/?appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("wateraid");
    const registeredUser = database.collection("registeredUsers");

    app.post("/api/register", async (req, res) => {
      try {
        const userData = req.body;
        const result = await registeredUser.insertOne(userData);
        res.status(201).json({
          success: true,
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (error) {
        res.status(500).json({ message: "Cannot register user" });
      }
    });

    app.get("/api/users", async (req, res) => {
      try {
        const users = await registeredUser.find({}).toArray();
        res.status(200).json({ success: true, users });
      } catch (error) {
        res.status(500).json({ message: "Cannot fetch users" });
      }
    });

    app.patch("/api/users/:id", async (req, res) => {
      const { id } = req.params;
      const { isApproved } = req.body;

      try {
        await registeredUser.updateOne(
          { _id: new ObjectId(id) },
          { $set: { isApproved } }
        );
        res.status(200).json({ success: true, message: "User approved" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update user" });
      }
    });

    app.delete("/api/users/:id", async (req, res) => {
      const { id } = req.params;
      try {
        await registeredUser.deleteOne({ _id: new ObjectId(id) });
        res
          .status(200)
          .json({ success: true, message: "User declined/deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete user" });
      }
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
