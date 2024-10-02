const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteAllRecords() {
  try {
    // Delete all records from accountSchema first due to foreign key constraint
    // await prisma.accountSchema.deleteMany({});
    // Delete all records from userSchema
    await prisma.userSchema.deleteMany({});
    console.log('All records deleted successfully');
  } catch (error) {
    console.error('Error deleting records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllRecords();
