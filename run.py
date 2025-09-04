import os
import platform, subprocess
from app import app


def check_database() -> None:
    if not os.path.exists('diary.db'):
        if platform.system().lower() == 'windows':
            subprocess.Popen(['cmd', 'python', 'create_db.py'])
        else:
            subprocess.Popen(['python3', 'create_db.py'])


if __name__ == '__main__':
    check_database()
    
    app.run(debug=True)