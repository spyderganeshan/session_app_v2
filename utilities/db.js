import * as SQLite from "expo-sqlite";

// Enable SQLite logging for debugging (optional)
// SQLite.enablePromise(true);

// Open or create the database
// const db = SQLite.openDatabase({
//   name: "databaseName.db",
//   location: "default",
// });
// Initialize the database (create tables)
export const initializeDatabase = () => {
  const db = SQLite.openDatabaseAsync("databaseName");

  // `execAsync()` is useful for bulk queries when you want to execute altogether.
  // Note that `execAsync()` does not escape parameters and may lead to SQL injection.
  db.execAsync(`CREATE TABLE IF NOT EXISTS activities (
    task_name TEXT PRIMARY KEY,
    task_description TEXT,
    task_time INTEGER,
    total_time INTEGER
  );`);

  // db.transaction(
  //   (tx) => {
  //     // Create activities table
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS activities (
  //       task_name TEXT PRIMARY KEY,
  //       task_description TEXT,
  //       task_time INTEGER,
  //       total_time INTEGER
  //     );`
  //     );

  //     // Create logs table
  //     tx.executeSql(
  //       `CREATE TABLE IF NOT EXISTS logs (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       current_timestamp TEXT,
  //       task_name TEXT,
  //       time_completed INTEGER,
  //       current_date TEXT,
  //       FOREIGN KEY(task_name) REFERENCES activities(task_name)
  //     );`
  //     );
  //   },
  //   (error) => {
  //     console.error("Database initialization error:", error);
  //   },
  //   () => {
  //     console.log("Database initialized successfully.");
  //   }
  // );
};
