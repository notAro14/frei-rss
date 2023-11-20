import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { id: "user_2YSdEfjCddYxwQ9SiqscA6vW5GF" },
  });

  await prisma.feed.create({
    data: {
      url: "http://ishadeed.com/feed.xml",
      name: "Ahmad Shadeed",
      fk_user_id: user.id,
    },
  });
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
