import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Define the path to our SQLite database file
const dbPath = path.join(process.cwd(), 'database.sqlite');

export async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

// Initialize the database and tables if they don't exist
export async function initDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS guestbook (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      avatar TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS article_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      postId TEXT NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      avatar TEXT NOT NULL
    );
  `);

  return db;
}
