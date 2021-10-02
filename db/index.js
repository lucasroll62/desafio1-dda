import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ptrainer-p1.db');

export const init = () => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS routines (
          id INTEGER PRIMARY KEY NOT NULL,
          routineId TEXT NOT NULL,
          userId TEXT NOT NULL,
          startTime INTEGER NOT NULL,
          endTime INTEGER
        )`,
    [],
    () => resolve(),
    (_, err) => reject(err));
  });
});

export const insertRoutine = (
  routineId, userId, endTime,
) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO routines (routineId, userId, startTime) VALUES (?, ?,?)',
      [routineId, userId,
        endTime],
      (_, result) => resolve(result),
      (_, error) => reject(error),
    );
  });
});

export const fetchRoutines = (userId) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM routines where userId = ?',
      [userId],
      (_, result) => resolve(result),
      (_, error) => reject(error),
    );
  });
});

export const endRoutine = (
  id, endTime,
) => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE routines set endTime = ? where id = ?',
      [endTime, id],
      (_, result) => resolve(result),
      (_, error) => reject(error),
    );
  });
});

export const finishUnfinishedActivities = () => new Promise((resolve, reject) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE routines set endTime = ? where endTime is null',
      [],
      (_, result) => resolve(result),
      (_, error) => reject(error),
    );
  });
});
