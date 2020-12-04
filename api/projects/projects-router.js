// Write your "projects" router here!
const express = require("express");
const Projects = require("../projects/projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get().then((actions) => {
    res.status(200).json(actions);
  });
});

router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then((actions) => {
      if (actions !== null) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(() => {});
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((id) => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res.status(400).json({ message: "YOU DONE GOOFED" });
    });
});

router.put("/:id", (req, res) => {
  Projects.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(400).json({ message: "YOU DONE GOOFED" });
    });
});

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((actions) => {
      if (actions !== 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "Action not found" });
      }
    })
    .catch(() => {
      res.status(404).json({ message: "Action not found" });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id).then((item) => {
    res.status(200).json(item);
  });
});

module.exports = router;
