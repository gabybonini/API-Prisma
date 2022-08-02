import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
    async createPost(req, res) {
        const { content } = req.body;
        const { id } = req.params;

        try {
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })

            if (!user) {
                return res.json({ message: "Este usuário não existe." })
            }

            const post = await prisma.post.create({
                data: {
                    content,
                    userId: user.id
                },
                include: {
                    author: true
                }
            })

            return res.json(post)
        } catch (error) {
            return res.json({ message: error.message })
        }
    },

    async findAllPosts(req, res) {
        try {
            const posts = await prisma.post.findMany();

            return res.json(posts);
        } catch (error) {
            return res.json(error);
        }
    },

    async UpdatePost(req, res) {
        const { id } = req.params;
        const { content } = req.body;

        try {
            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) {
                return res.json({ message: "Está publicação não existe." })
            }
            await prisma.post.update({
                where: { id: Number(id) },
                data: { content },
            })

            return res.json({ message: "Publicação atualizada" })
        } catch (error) {
            return res.json({ message: error.message })
        }
    },

    async deletePost(req, res) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const post = await prisma.post.findUnique({ where: { id: Number(id) } })

            if (!post) {
                return res.json({ message: "Essa publcação não existe ou já foi apagada." })
            }
            await prisma.post.delete({ 
                where: { content },
             })

            return res.json({ message: "Publicação deletada com sucesso." })
        } catch (error) {
            return res.json({ message: error.message })
        }
    }
}