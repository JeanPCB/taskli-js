#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";

// read-write guarantee
const TASKS_FILE = "./taskList.json";
let id = 0;

function ensureStorageFile(tasksFile) {
  if (existsSync(tasksFile) && statSync(tasksFile).size > 0) {
    readFileSync(tasksFile, "utf-8");
  } else {
    writeFileSync(tasksFile, JSON.stringify([]));
  }
}

function createTask(taskTitle) {
  return {
    id,
    title: taskTitle,
  };
}

function addTask(newTask, tasks = readFileSync(TASKS_FILE, "utf-8")) {
  const taskList = JSON.parse(tasks);
  const task = createTask(newTask);

  taskList.push(task);
  writeFileSync(TASKS_FILE, JSON.stringify(taskList, null, 2));
}

function main() {
  ensureStorageFile(TASKS_FILE);
  addTask("my task inside task");
}

main();
