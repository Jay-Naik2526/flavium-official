const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
  cors: { origin: "*" } 
});

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Flavium DB Connected"))
  .catch(err => console.error("❌ DB Error:", err));

// Schema
const matchSchema = new mongoose.Schema({
  sportName: { type: String, required: true },
  category: { type: String, enum: ['Team', 'Racket', 'Athletics', 'Indoor', 'Other'], required: true },
  gender: { type: String, enum: ['Boys', 'Girls'], required: true },
  date: { type: String, required: true },
  time: String,
  venue: String,
  teamA: { name: String, score: { type: Number, default: 0 } },
  teamB: { name: String, score: { type: Number, default: 0 } },
  status: { type: String, enum: ['Upcoming', 'Live', 'Finished'], default: 'Upcoming' },
  roundName: String,
  winner: String,
  // UPDATED: Removed 'Bronze' option
  medalRound: { type: String, enum: ['None', 'Final'], default: 'None' },
  votes: {
    teamA: { type: Number, default: 0 },
    teamB: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Match = mongoose.model('Match', matchSchema);

// --- ROUTES ---

// 1. ADMIN LOGIN ENDPOINT
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, token: "admin-access-granted" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Password" });
  }
});

// 2. Match Routes
app.get('/api/matches', async (req, res) => res.json(await Match.find().sort({ date: 1, time: 1 })));

app.post('/api/matches', async (req, res) => {
  const match = new Match(req.body);
  await match.save();
  io.emit('matchCreated', match);
  res.json(match);
});

app.patch('/api/matches/:id', async (req, res) => {
  const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
  io.emit('matchUpdated', updated);
  res.json(updated);
});

app.delete('/api/matches/:id', async (req, res) => {
  await Match.findByIdAndDelete(req.params.id);
  io.emit('matchDeleted', req.params.id);
  res.json({ success: true });
});

app.post('/api/matches/:id/vote', async (req, res) => {
  const { team } = req.body;
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ error: "Match not found" });

  if (team === 'teamA') match.votes.teamA = (match.votes.teamA || 0) + 1;
  if (team === 'teamB') match.votes.teamB = (match.votes.teamB || 0) + 1;

  await match.save();
  io.emit('matchUpdated', match);
  res.json(match);
});
const PORT = process.env.PORT || 7860;

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));