import traceback
import io
import os
import json
import uuid
import base64

# Assuming you have a local directory for storing files (in environment variable)
LOCAL_STORAGE_DIR = os.environ.get("LOCAL_STORAGE_DIR", "/Users/ansoncheng/Downloads")

def upload_to_local_storage(file):
    try:
        file_name = str(uuid.uuid4()) + ".jpg"  # Assuming uploaded files are JPEG images
        file_path = os.path.join(LOCAL_STORAGE_DIR, file_name)
        with open(file_path, "wb") as f:
            f.write(file)
        return {
            "statusCode": 200,
            "key": file_name,
        }
    except Exception as ex:
        print(traceback.format_exc())
        return {
            "statusCode": 400,
            "body": str(ex),
        }

def get_object_from_local_storage(file_key):
    try:
        file_path = os.path.join(LOCAL_STORAGE_DIR, file_key)
        with open(file_path, "rb") as f:
            file_data = f.read()
        return {
            "statusCode": 200,
            "body": base64.b64encode(file_data).decode('utf-8'),
            "isBase64Encoded": True,
        }
    except Exception as ex:
        print(traceback.format_exc())
        return {
            "statusCode": 400,
            "body": str(ex),
        }

def handler(event, context):
    method = event.get("httpMethod", "")
    if method == "POST":
        print("event", event)
        file = base64.b64decode(event.get("body", ""))
        resp = upload_to_local_storage(file)
    else:
        path = event.get("path", "")
        resp = get_object_from_local_storage(path)
    print(resp)
    return resp

# This section runs when the script is executed directly
if __name__ == "__main__":
    from http.server import HTTPServer, BaseHTTPRequestHandler
    from urllib.parse import parse_qs, urlparse
    import sys

    class RequestHandler(BaseHTTPRequestHandler):
        def do_POST(self):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            image_data = base64.b64decode(post_data)
            event = {
                "httpMethod": "POST",
                "body": image_data
            }
            response = handler(event, None)
            self.send_response(response["statusCode"])
            self.send_header('Content-type', 'application/json')
            # TODO: change this to the domain of your frontend app
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        def do_GET(self):
            query_components = parse_qs(urlparse(self.path).query)
            event = {
                "httpMethod": "GET",
                "queryStringParameters": query_components,
                "path": self.path
            }
            response = handler(event, None)
            self.send_response(response["statusCode"])
            self.send_header('Content-type', 'application/json')
            # TODO: change this to the domain of your frontend app
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

    # Run the HTTP server
    server_address = ('', 8000)


    httpd = HTTPServer(server_address, RequestHandler)
    print('Starting HTTP server on port 8000...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('Stopping HTTP server...')
        httpd.server_close()
        sys.exit(0)
