import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import { verifyFirebaseToken } from './middleware/auth';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

admin.initializeApp();

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.json({ uid: decoded.uid });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.get('/api/feed', verifyFirebaseToken, async (_req, res) => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ items: posts });
});

app.get('/api/programs', verifyFirebaseToken, async (_req, res) => {
  const programs = await prisma.program.findMany();
  res.json({ programs });
});

app.get('/api/messages', verifyFirebaseToken, async (req, res) => {
  const userId = (req as any).user.uid as string;
  const messages = await prisma.message.findMany({ where: { senderId: userId } });
  res.json({ messages });
});

app.get('/api/connect', verifyFirebaseToken, async (req, res) => {
  const q = req.query.q as string | undefined;
  const users = await prisma.user.findMany({
    where: q ? { name: { contains: q, mode: 'insensitive' } } : {},
    take: 10,
  });
  res.json({ connections: users });
});

app.post('/api/connect', verifyFirebaseToken, async (req, res) => {
  const userId = (req as any).user.uid as string;
  const { id } = req.body;
  await prisma.connection.create({
    data: { followerId: userId, followedId: id, status: 'pending' },
  });
  await prisma.notification.create({
    data: {
      userId: id,
      type: 'connection',
      message: `${userId} wants to connect`,
    },
  });
  res.json({ success: true });
});

app.get('/api/notifications', verifyFirebaseToken, async (req, res) => {
  const userId = (req as any).user.uid as string;
  const notifications = await prisma.notification.findMany({ where: { userId } });
  res.json({ notifications });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
