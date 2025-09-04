# Run this once to create the table if not exists
import sqlite3
conn = sqlite3.connect('diary.db')
conn.execute("""
CREATE TABLE IF NOT EXISTS diary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    image BLOB,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
""")
conn.commit()
conn.close()