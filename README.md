# Love With You

A heartfelt web journal and gallery dedicated to celebrating love, memories, and daily life moments.

## Features

- **Slideshow:** Beautiful rotating images with loving captions.
- **Gallery ("Our Moments"):** Displays uploaded diary images and text, paginated for easy browsing.
- **Daily Life Journal:** Add diary entries with text and optional images.
- **Text-Only Slideshow:** Shows diary entries with only text in a rotating slideshow.
- **Modal View:** Click gallery images to read the full diary text in a popup.
- **Responsive Design:** Works on desktop and mobile.
- **Favicon & SEO Meta Tags:** Custom icon and metadata for better sharing and appearance.

## Technology

- **Backend:** Python Flask, SQLite
- **Frontend:** HTML, CSS (Quicksand font), JavaScript
- **Image Storage:** Images are stored in the database as BLOBs and served via Flask routes.

## How to Run

1. **Clone or download the project.**
2. **Install Python dependencies:**
   ```sh
   pip install flask
   ```
3. **Create the database:**
   - Run a Python script to create `diary.db` with the required table:
     ```python
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
     ```
4. **Start the Flask server:**
   ```sh
   python app.py
   ```
5. **Open your browser and visit:**  
   [http://localhost:5000/](http://localhost:5000/)

## Folder Structure

```
Megi/
├── app.py
├── diary.db
├── index.html
├── static/
│   ├── style.css
│   ├── style.js
│   └── img/
│       ├── 1.jpg
│       ├── 2.jpg
│       ├── 3.jpg
│       └── love.ico
```

## About

This project was created as a personal love journal and gallery for Megi & Wang Yi.  
It’s a space to share, cherish, and celebrate your story together.

---

**Made with heartbeats & stardust 🌟 | Always yours