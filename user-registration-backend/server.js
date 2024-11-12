const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const userRoutes = require("./routes/userRoutes");

admin.initializeApp({
  credential: admin.credential.cert(require("./firebaseServiceAccountKey.json")),
  databaseURL: "https://main-5e602-default-rtdb.firebaseio.com/",
});

const db = admin.database();
const app = express();

app.use(cors()); 
app.use(express.json()); 
// Routes
app.use("/api/users", userRoutes(db)); 
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
