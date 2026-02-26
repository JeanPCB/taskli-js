#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";

// read-write guarantee
const TASKS_FILE = "./taskList.json";
const getTasks = () => JSON.parse(readFileSync(TASKS_FILE, "utf-8"));

function ensureStorageFile(tasksFile) {
  if (existsSync(tasksFile) && statSync(tasksFile).size > 0) {
    readFileSync(tasksFile, "utf-8");
  } else {
    writeFileSync(tasksFile, JSON.stringify([]));
  }
}

function getId(taskList = getTasks()) {
  if (taskList.length === 0) return 1;

  return taskList[taskList.length - 1].id + 1;
}

function createTask(taskTitle) {
  return {
    id: getId(),
    title: taskTitle,
    status: "ongoing",
  };
}

function saveTask(tasks) {
  writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function addTask(newTask, tasks = getTasks()) {
  const task = createTask(newTask);
  tasks.push(task);
  saveTask(tasks);
}

function showTasks(tasks = getTasks()) {
  tasks.forEach((task) => {
    console.log(`[${task.id}] - ${task.title}`);
  });
}

function removeTask(id, tasks = getTasks()) {
  if (Number(id) > 0) {
    tasks.splice(id - 1, 1);
    normalizeIds(tasks, id);
    saveTask(tasks);
  } else {
    console.log("Invalid task ID!");
  }
}

function normalizeIds(tasks, id) {
  tasks.forEach((task) => {
    if (task.id > id) {
      task.id--;
    }
  });
}

function markAsDone(id, tasks = getTasks()) {
  const task = findTaskById(id, tasks);
  task.status = "done";
  saveTask(tasks);
}

function replaceTaskTitle(newTitle, id, tasks = getTasks()) {
  const task = findTaskById(id, tasks);

  if (newTitle != task.title) {
    task.title = newTitle;
    saveTask(tasks);
  }

  return task;
}

function findTaskById(id, tasks) {
  if (!Number(id) > 0) {
    console.log("Invalid task ID!");
    return null;
  }

  return tasks.find((task) => task.id === id) ?? null;
}

function main() {
  ensureStorageFile(TASKS_FILE);
  // addTask("testing tasks");
  // removeTask(2);
  markAsDone(1);
  showTasks();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
