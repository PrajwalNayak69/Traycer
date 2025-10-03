import React, { useState } from 'react';
import axios from 'axios';

type PlanStep = {
  id: string;
  title: string;
  description: string;
  status?: 'todo' | 'running' | 'done' | 'failed';
};

type Plan = {
  id: string;
  task: string;
  steps: PlanStep[];
};

export const PlannerUI = () => {
  const [task, setTask] = useState('');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const generatePlan = async () => {
    const res = await axios.post('http://localhost:4000/api/plan', { task });
    setPlan(res.data);
  };

  const runStep = async (step: PlanStep) => {
    setLogs((prev) => [...prev, `Running: ${step.title}`]);
    const res = await axios.post('http://localhost:4000/api/execute-step', { step });
    setLogs((prev) => [...prev, res.data.output]);
  };

  return (
    <div>
      <h1>Traycer Demo</h1>
      <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="Enter a task" />
      <button onClick={generatePlan}>Generate Plan</button>

      {plan && (
        <div>
          <h2>Plan Steps:</h2>
          {plan.steps.map((step) => (
            <div key={step.id}>
              <span>{step.title}</span>
              <button onClick={() => runStep(step)}>Run</button>
            </div>
          ))}
        </div>
      )}

      <div>
        <h2>Logs:</h2>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};
