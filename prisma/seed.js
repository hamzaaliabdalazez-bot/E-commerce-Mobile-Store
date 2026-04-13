const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {
      name: "Store Admin",
      role: "ADMIN",
      password: adminPassword,
      image: "https://i.pravatar.cc/150?img=12",
    },
    create: {
      name: "Store Admin",
      email: "admin@gmail.com",
      role: "ADMIN",
      password: adminPassword,
      image: "https://i.pravatar.cc/150?img=12",
    },
  });

  const categories = [
    { name: "Mobiles", slug: "mobiles" },
    { name: "Covers", slug: "covers" },
    { name: "Chargers", slug: "chargers" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  const mobileCategory = await prisma.category.findUnique({
    where: { slug: "mobiles" },
  });
  const coverCategory = await prisma.category.findUnique({
    where: { slug: "covers" },
  });
  const chargerCategory = await prisma.category.findUnique({
    where: { slug: "chargers" },
  });

  const products = [
    {
      name: "Nova Smart Phone",
      slug: "nova-smart-phone",
      description:
        "A modern mobile with long battery life, fast processor, and elegant design.",
      price: 629.99,
      categoryId: mobileCategory.id,
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
      ],
      stock: 50,
      rating: 4.7,
    },
    {
      name: "Protective Case",
      slug: "protective-case",
      description:
        "Durable mobile cover with soft interior lining and premium grip.",
      price: 24.95,
      categoryId: coverCategory.id,
      images: [
        "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
      ],
      stock: 120,
      rating: 4.6,
    },
    {
      name: "Fast Charge Adapter",
      slug: "fast-charge-adapter",
      description:
        "Compact fast charger with USB-C and USB-A ports for every mobile device.",
      price: 34.5,
      categoryId: chargerCategory.id,
      images: [
        "https://images.unsplash.com/photo-1510557880182-3f8db55f9326?auto=format&fit=crop&w=800&q=80",
      ],
      stock: 80,
      rating: 4.5,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seeding complete.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
