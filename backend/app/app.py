import docker.errors
from flask import Flask, jsonify, Response
from flask_cors import CORS
import mariadb
import sys
import docker
from mcstatus import JavaServer
import time
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

dbConfig = {
    'host': 'mariadb',
    'port': 3306,
    'user': 'flask',
    'password': 'Flaskpass',
    'database': 'worldview'
}

docker_client = docker.DockerClient(base_url='unix:///var/run/docker.sock')

# Leave dealing with multiple servers for a future story
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

@app.route('/api/start', methods=['POST'])
def start_server():
    try:
        container = docker_client.containers.get("mc-server")
        if container.status != 'running':
            container.start()
            
            # Wait 60 seconds
            timeout = 60
            interval = 2
            elapsed = 0
            while elapsed < timeout:
                try:
                    server = JavaServer.lookup("minecraft:25565")
                    server.status()
                    return jsonify({"message": "Server started"})
                except:
                    time.sleep(interval)
                    elapsed += interval
            return jsonify({"error": "Timeout: Failed to start server"}), 504
        return jsonify({"message": "Server is already running"})
    except docker.errors.NotFound:
        return jsonify({"error": "Minecraft server container not found"}), 404
    except docker.errors.APIError as e:
            return jsonify({"error": str(e)}), 500

@app.route('/api/stop',  methods=['POST'])
def stop_server():
    try:
        container = docker_client.containers.get("mc-server")
        if container.status == 'running':
            container.stop()
            
            timeout = 60
            interval = 2
            elapsed = 0
            while elapsed < timeout:
                container.reload()
                if container.status == 'exited':
                    return jsonify({"message": "Server stopped"})
                time.sleep(interval)
                elapsed += interval
            return jsonify({"error": "Timeout: Failed to stop server"}), 504
        return jsonify({"message": "Server already stopped"})
    except docker.errors.NotFound:
        return jsonify({"error": "Minecraft server container not found"}), 404
    except docker.errors.APIError as e:
            return jsonify({"error": str(e)}), 500

@app.route('/api/status', methods=['GET'])
def get_server_status():
    try:
        server = JavaServer.lookup("minecraft:25565")
        status = server.status()
        return jsonify({
            "status": "online",
            "players": status.players.online
        })
    except:
        return jsonify({
            "status": "offline",
            "players": 0
        })

@app.route('/api/logs/stream', methods=['GET'])
def stream_logs():
    def generate():
        while True:
            time.sleep(1)
            yield f'data: {datetime.now()}\n\n'
    return Response(generate(), content_type='text/event-stream')
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)