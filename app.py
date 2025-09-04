import sqlite3
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename

app = Flask(__name__, static_folder='static', template_folder='templates')

def get_db():
    conn = sqlite3.connect('diary.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')


@app.route('/add_diary', methods=['POST'])
def add_diary():
    try:
        text = request.form.get('text')
        image = request.files.get('image')
        image_data = image.read() if image else None

        conn = get_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO diary (text, image) VALUES (?, ?)", (text, image_data))
        conn.commit()
        conn.close()
        return jsonify({'status': 'success'})
    except Exception as e:
        print("Error:", e)
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/diaries', methods=['GET'])
def get_diaries():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id, text, image, created_at FROM diary ORDER BY id DESC")
    diaries = []
    for row in cur.fetchall():
        img_url = f"/image/{row['id']}" if row['image'] else None
        diaries.append({
            'id': row['id'],
            'text': row['text'],
            'image_url': img_url,
            'created_at': row['created_at']
        })
    conn.close()
    return jsonify(diaries)

@app.route('/image/<int:diary_id>')
def get_image(diary_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT image FROM diary WHERE id=?", (diary_id,))
    row = cur.fetchone()
    conn.close()
    if row and row[0]:
        return row[0], 200, {'Content-Type': 'image/jpeg'}
    return '', 404

if __name__ == '__main__':
    app.run(debug=False)
