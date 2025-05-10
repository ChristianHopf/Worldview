from flask import Flask, jsonify
from flask_cors import CORS
import mariadb
import sys

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/"}})

dbConfig = {
    'host': 'mariadb',
    'port': 3306,
    'user': 'flask',
    'password': 'Flaskpass',
    'database': 'worldview'
}

@app.route('/api/servers', methods=['GET'])
def get_servers():
    try:
        connection = mariadb.connect(**dbConfig)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM servers")
        servers = cursor.fetchall()
        
        cursor.close()
        connection.close()
        
        return jsonify(servers)
    except mariadb.Error as err:
        print(f"Connection error: {err}", file=sys.stderr)
        return jsonify({"error": "Failed to connect to database"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)