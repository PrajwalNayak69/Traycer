const { v4: uuid } = require('uuid');
export type PlanStep = {
  id: string;
  title: string;
  description: string;
  status?: 'todo' | 'running' | 'done' | 'failed';
};

export type Plan = {
  id: string;
  task: string;
  steps: PlanStep[];
};


export function createPlanFromTask(task: string): Plan {
  const sentences = task.split(/[.!?]\s+/).filter(Boolean);

  const steps: PlanStep[] = sentences.map((s, i) => ({
    id: uuid(),
    title: `Step ${i + 1}: ${s.slice(0, 40)}`,
    description: s,
    status: 'todo' as const, // ensures TypeScript matches 'todo' | 'running' | 'done' | 'failed'
  }));

  return { id: uuid(), task, steps };
}

export async function executeStep(step: PlanStep): Promise<{ ok: boolean; output: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));
  return { ok: true, output: `Executed: ${step.title}` };
}

module.exports = { createPlanFromTask };
