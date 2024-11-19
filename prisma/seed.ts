import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();

	console.log('Seeding...');

	const user1 = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'johndoe@gmail.com',
			password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
			avatarUrl: 'https://picsum.photos/id/0/300/300.jpg',
		},
	});

	await prisma.wallet.create({
		data: {
			userId: user1.id,
			name: 'Default account',
			bankName: 'TP Bank',
			accountNumber: '064200007400',
			walletType: 'BANK',
			balance: 0,
		},
	});

	console.log({ user1 });
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect();
	});
