import traceback
import io
import os
import json
import uuid
import base64

# Assuming you have a local directory for storing files
LOCAL_STORAGE_DIR = "/path/to/local/storage/"

def upload_to_local_storage(file):
    try:
        file_name = str(uuid.uuid4()) + ".jpg"  # Assuming uploaded files are JPEG images
        file_path = os.path.join(LOCAL_STORAGE_DIR, file_name)
        with open(file_path, "wb") as f:
            f.write(file)
        return {
            "statusCode": 200,
            "body": json.dumps({
                "key": file_name,
            }),
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
    print(event)
    method = event.get("httpMethod", "")
    if method == "POST":
        file = base64.b64decode(event.get("body", ""))
        resp = upload_to_local_storage(file)
    else:
        query = event.get("queryStringParameters", {})
        file_key = query.get("image", "")
        resp = get_object_from_local_storage(file_key)
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
            parsed_data = parse_qs(post_data.decode('utf-8'))
            event = {
                "httpMethod": "POST",
                "body": parsed_data.get("body", [""])[0]
            }
            response = handler(event, None)
            self.send_response(response["statusCode"])
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode())

        def do_GET(self):
            query_components = parse_qs(urlparse(self.path).query)
            event = {
                "httpMethod": "GET",
                "queryStringParameters": query_components
            }
            response = handler(event, None)
            self.send_response(response["statusCode"])
            self.send_header('Content-type', 'application/json')
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
