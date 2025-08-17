import fs from 'fs/promises';
import path from 'path';

async function main() {
  const [, , newQuestionsPath] = process.argv;
  if (!newQuestionsPath) {
    console.error('Usage: node scripts/append_questions.mjs <new_questions.json>');
    process.exit(1);
  }

  const questionsPath = path.resolve('questions.json');
  const backupPath = path.resolve('questions.backup.json');

  const currentRaw = await fs.readFile(questionsPath, 'utf8');
  const currentData = JSON.parse(currentRaw);
  if (!Array.isArray(currentData.questions)) {
    throw new Error('questions.json missing "questions" array');
  }

  const newRaw = await fs.readFile(newQuestionsPath, 'utf8');
  const newData = JSON.parse(newRaw);
  if (!Array.isArray(newData.questions)) {
    throw new Error('new questions file missing "questions" array');
  }

  await fs.writeFile(backupPath, JSON.stringify(currentData, null, 2) + '\n');

  const existingIds = new Set(currentData.questions.map(q => q.id));
  const report = {
    existingCount: currentData.questions.length,
    providedCount: newData.questions.length,
    appendedCount: 0,
    skipped: []
  };

  const required = ['id', 'category', 'prompt', 'accepted', 'explanation', 'topicNote', 'grammarTitle', 'detailedExplanation'];

  for (const q of newData.questions) {
    const missing = required.filter(f => q[f] === undefined);
    if (missing.length > 0 || !Array.isArray(q.accepted)) {
      report.skipped.push({ id: q.id ?? '(no id)', reason: `invalid: missing ${missing.join(', ')}` + (!Array.isArray(q.accepted) ? ' accepted not array' : '') });
      continue;
    }
    if (existingIds.has(q.id)) {
      report.skipped.push({ id: q.id, reason: 'duplicate id' });
      continue;
    }
    currentData.questions.push(q);
    existingIds.add(q.id);
    report.appendedCount++;
  }

  await fs.writeFile(questionsPath, JSON.stringify(currentData, null, 2) + '\n');

  console.log(`Existing questions: ${report.existingCount}`);
  console.log(`New questions provided: ${report.providedCount}`);
  console.log(`Appended: ${report.appendedCount}`);
  console.log(`Skipped: ${report.skipped.length}`);
  for (const s of report.skipped) {
    console.log(`- ${s.id}: ${s.reason}`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
