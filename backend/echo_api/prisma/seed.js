import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  {
    title: "Goto School",
    description: "Today i must goto school",
    color: "yellow",
    completed: false,
    priority: true,
    dateTime: new Date(Date.now()).toISOString(),
  },
  {
    title: "Preparation For Math",
    description: "Prepare for Mathematics mid term exam",
    color: "blue",
    completed: true,
    priority: true,
    dateTime: new Date(Date.now()).toISOString(),
  },
  {
    title: "Complete Homework",
    description: "Complete the Homework",
    color: "white",
    completed: false,
    priority: false,
    dateTime: new Date(Date.now()).toISOString(),
  },
  {
    title: "Computers Exam Prep",
    color: "orange",
    completed: true,
    priority: false,
    dateTime: new Date(Date.now()).toISOString(),
  },
  {
    title: "Do some work at home",
    description: "Help Parents",
    color: "Grey",
    completed: false,
    priority: true,
    dateTime: new Date(Date.now()).toISOString(),
  },
  {
    title: "Get Vegetables",
    description: "Get some vegetables from the market",
    color: "purple",
    completed: true,
    priority: true,
    dateTime: new Date(Date.now()).toISOString(),
  },
];

async function main() {
  const addItems = await prisma.item.createMany({
    data: seedData,
  });

  console.log(addItems);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
