// Import database
import db from "./db.js";

// Add Activity
export const addActivity = (
  task_name,
  task_description,
  task_time,
  total_time
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO activities (task_name, task_description, task_time, total_time) VALUES (?, ?, ?, ?);`,
      [task_name, task_description, task_time, total_time],
      () => console.log("Activity added successfully"),
      (txObj, error) => console.error("Error adding activity", error)
    );
  });
};

// Delete Activity
export const deleteActivity = (task_name) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM activities WHERE task_name = ?;`,
      [task_name],
      () => console.log("Activity deleted successfully"),
      (txObj, error) => console.error("Error deleting activity", error)
    );
  });
};

// Update Activity
export const updateActivity = (
  task_name,
  task_description,
  task_time,
  total_time
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE activities SET task_description = ?, task_time = ?, total_time = ? WHERE task_name = ?;`,
      [task_description, task_time, total_time, task_name],
      () => console.log("Activity updated successfully"),
      (txObj, error) => console.error("Error updating activity", error)
    );
  });
};

// Get Activity by Name
export const getActivityByName = (task_name, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM activities WHERE task_name = ?;`,
      [task_name],
      (_, { rows: { _array } }) => callback(_array[0]),
      (txObj, error) => console.error("Error fetching activity", error)
    );
  });
};

export const getAllActivities = () =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM activities;",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (txObj, error) => reject(error)
      );
    });
  });

// Add Log
export const addLog = (
  current_timestamp,
  task_name,
  time_completed,
  current_date
) => {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO logs (current_timestamp, task_name, time_completed, current_date) VALUES (?, ?, ?, ?);`,
      [current_timestamp, task_name, time_completed, current_date],
      () => console.log("Log added successfully"),
      (txObj, error) => console.error("Error adding log", error)
    );
  });
};

// Delete Log
export const deleteLog = (id) => {
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE FROM logs WHERE id = ?;`,
      [id],
      () => console.log("Log deleted successfully"),
      (txObj, error) => console.error("Error deleting log", error)
    );
  });
};
