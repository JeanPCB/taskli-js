#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";

// read-write guarantee
const TASKS_FILE = "./taskList.js";
let id = 1;

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

function addTask(newTask, tasks) {
  const taskList = JSON.parse(tasks);
  taskList.push(newTask);
  writeFileSync(TASKS_FILE, JSON.stringify(taskList, null, 2));
}

function main() {
  ensureStorageFile(TASKS_FILE);
  const tasks = readFileSync(TASKS_FILE, "utf-8");
  addTask(createTask("task testing"), tasks);
}

main();
