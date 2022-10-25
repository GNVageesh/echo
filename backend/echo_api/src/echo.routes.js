import { Router } from "express";
import prisma from "./service/prisma.js";

const router = Router();

// GET: all
router.get("/", async (req, res) => {
  const allItems = await prisma.item.findMany();
  res.status(200).json(allItems);
});

// GET: id
router.get("/item/:id", async (req, res) => {
  const itemById = await prisma.item.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!itemById) return res.status(404).json({ error: "There is no such id" });
  res.status(200).json(itemById);
});

// GET: title
router.get("/item/title/:title", async (req, res) => {
  const itemByTitle = await prisma.item.findUnique({
    where: { title: req.params.title },
  });
  if (!itemByTitle)
    return res.status(404).json({ error: "There is no such item" });
  res.status(200).json(itemByTitle);
});

// GET: completed
router.get("/completed", async (req, res) => {
  const completedItems = await prisma.item.findMany({
    where: { completed: true },
  });
  res.status(200).json(completedItems);
});

// GET: priority
router.get("/priority", async (req, res) => {
  const priorityItems = await prisma.item.findMany({
    where: { priority: true },
  });
  res.status(200).json(priorityItems);
});

// GET: color
router.get("/color/:color", async (req, res) => {
  const colorItems = await prisma.item.findMany({
    where: { color: req.params.color },
  });
  res.status(200).json(colorItems);
});

// POST: create
router.post("/create", async (req, res) => {
  const {
    title,
    description,
    color,
    completed,
    priority,
    itemImage,
    itemLink,
    dateTime,
  } = req.body;

  if (!title) return res.status(400).json({ error: "Missing title Attribute" });

  const findTitle = await prisma.item.findFirst({ where: { title: title } });

  if (findTitle)
    return res
      .status(409)
      .json({ error: "Item already exists with this name" });

  const createItem = await prisma.item.create({
    data: {
      title,
      description,
      color,
      completed,
      priority,
      itemImage,
      itemLink,
      dateTime,
    },
  });

  res.status(200).json(createItem);
});

// PUT: update by id
router.put("/update/:id", async (req, res) => {
  const findItem = await prisma.item.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!findItem) return res.status(404).json({ error: "No such item" });
  const {
    description,
    color,
    completed,
    priority,
    itemImage,
    itemLink,
    dateTime,
  } = req.body;
  const updateItem = await prisma.item.update({
    where: { id: Number(req.params.id) },
    data: {
      description,
      color,
      completed,
      priority,
      itemImage,
      itemLink,
      dateTime,
    },
  });

  res.status(200).json(updateItem);
});

// PUT: update by title
router.put("/update/title/:mTitle", async (req, res) => {
  const findTitle = await prisma.item.findUnique({
    where: { title: req.params.mTitle },
  });

  if (!findTitle) return res.status(404).json({ error: "No such item" });

  const {
    description,
    color,
    completed,
    priority,
    itemImage,
    itemLink,
    dateTime,
  } = req.body;

  const updateItem = await prisma.item.update({
    where: { title: req.params.mTitle },
    data: {
      description,
      color,
      completed,
      priority,
      itemImage,
      itemLink,
      dateTime,
    },
  });

  res.status(200).json(updateItem);
});

// DELETE: delete
router.delete("/delete/:title", async (req, res) => {
  const findTitle = await prisma.item.findUnique({
    where: { title: req.params.title },
  });

  if (!findTitle)
    return res.status(404).json({ error: "This item doesnt exist" });

  const deleteItem = await prisma.item.delete({
    where: { title: req.params.title },
  });
  res.status(200).json(deleteItem);
});

export default router;
