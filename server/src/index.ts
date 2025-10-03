const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createPlanFromTask, executeStep } = require('./planner');

// Import types (if using TS)
import { Request, Response } from 'express';  // only if using ES modules
// For CommonJS with TS, you can do:
const { Request, Response } = require('express');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/plan', (req: Request, res: Response) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: 'task required' });
  const plan = createPlanFromTask(task);
  res.json(plan);
});

app.post('/api/execute-step', async (req: Request, res: Response) => {
  const { step } = req.body;
  if (!step) return res.status(400).json({ message: 'step required' });
  try {
    const result = await executeStep(step);
    res.json(result);
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
