import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async createUser(req, res) {
        try {
            const { name, email } = req.body

            let user = await prisma.user.findUnique({ where: { email } });

            if (user) {
                return res.json({ error: "Este usuário já está cadastrado." })
            }

            user = await prisma.user.create({
                data: {
                    name,
                    email,
                },
            });

            return res.json(user)
        } catch (error) {
            return res.json({ error })
        }
    },

    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);

        } catch (error) {
            return res.json({ error })
        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            return res.json(user);

        } catch (error) {
            return res.json({ error })
        }
    },

    async findUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) return res.json({ error: "Não foi possível encontrar usuário" });

            return res.json(user)
        } catch (error) {
            return res.json({ error })
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, emal } = req.body

            let user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) return res.json({ error: "Não foi possível encontrar usuário" });

            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, emal }
            });

            return res.json(user);

        } catch (error) {
            res.json({ error })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) return res.json({ error: "Não foi possível encontrar usuário" });

            await prisma.user.delete({ where: { id: Number(id) } });

            return res.json("Usuário deletado com sucesso!");
        } catch (error) {
            return res.json({ error })
        }
    },

};