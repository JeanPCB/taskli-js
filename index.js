#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from "node:fs";

// read-write guarantee
const TASKS_FILE = "./taskList.js";

function ensureStorageFile(tasksFile) {
  if (existsSync(tasksFile)) {
    const readTasks = readFileSync(tasksFile, "utf-8");
  } else {
    writeFileSync(tasksFile, JSON.stringify([]));
  }
}

function main() {
  ensureStorageFile(TASKS_FILE);
}

main();
