from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.request
import urllib.parse
import json

HOST = "localhost"
PORT = 8080
API_URL = "http://gamf.nhely.hu/ajax2/"

class ProxyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        url = API_URL + self.path[2:]  # levágjuk az első "/?"
        try:
            with urllib.request.urlopen(url) as response:
                data = response.read()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')  # <- CORS fix
                self.end_headers()
                self.wfile.write(data)
        except Exception as e:
            self.send_error(500, f"Hiba a GET kérésnél: {e}")

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        try:
            req = urllib.request.Request(API_URL, data=post_data)
            req.add_header('Content-Type', 'application/x-www-form-urlencoded')
            with urllib.request.urlopen(req) as response:
                result = response.read()
                self.send_response(200)
                self.send_header('Content-type', 'text/plain')
                self.send_header('Access-Control-Allow-Origin', '*')  # <- CORS fix
                self.end_headers()
                self.wfile.write(result)
        except Exception as e:
            self.send_error(500, f"Hiba a POST kérésnél: {e}")

print(f"Proxy fut: http://{HOST}:{PORT}")
server = HTTPServer((HOST, PORT), ProxyHandler)
server.serve_forever()