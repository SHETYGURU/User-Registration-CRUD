const express = require("express");

module.exports = (db) => {
  const router = express.Router();
  const usersRef = db.ref("users");

  router.post("/", (req, res) => {
    const newUserRef = usersRef.push();
    newUserRef.set(req.body, (error) => {
      if (error) return res.status(500).json({ error });
      res.status(201).json({ id: newUserRef.key, ...req.body });
    });
  });

  router.get("/", (req, res) => {
    usersRef.once("value", (snapshot) => {
      const users = snapshot.val();
      const userArray = [];
      for (let id in users) {
        userArray.push({ id, ...users[id] });
      }
      res.json(userArray);
    });
  });

  router.put("/:id", (req, res) => {
    usersRef.child(req.params.id).update(req.body, (error) => {
      if (error) return res.status(500).json({ error });
      res.json({ id: req.params.id, ...req.body });
    });
  });

  router.delete("/:id", (req, res) => {
    usersRef.child(req.params.id).remove((error) => {
      if (error) return res.status(500).json({ error });
      res.json({ message: "User deleted successfully" });
    });
  });

  return router;
};
