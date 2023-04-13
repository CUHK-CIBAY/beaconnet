import boto3
import traceback
import io
import os
import json
import uuid
import base64

def upload_to_S3(file, s3_key):
    s3 = boto3.client('s3')
    try:
        fileobj = io.BytesIO(file)
        bucket = boto3.resource("s3").Bucket(os.environ['BUCKET_NAME'])
        bucket.upload_fileobj(fileobj, s3_key, {"ACL": "public-read"})
        return {
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET"
            },
            "statusCode": 200,
            "body": json.dumps({
                "key": s3_key,
            }),
        }
    except Exception as ex:
        print(traceback.format_exc())
        return {
            "statusCode": 400,
            "body": ex,
        }

def get_object_from_S3(s3_key):
    s3 = boto3.client("s3")
    try:
        file_obj = s3.get_object(Bucket = os.environ['BUCKET_NAME'], Key = s3_key)
        file = file_obj["Body"].read()
        print(type(file))
        return {
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET",
                "Content-type": "image"
            },
            "statusCode": 200,
            "body": base64.b64encode(file),
            "isBase64Encoded": True,
        }
    except Exception as ex:
        print(traceback.format_exc())
        return {
            "statusCode": 400,
            "body": ex,
        }

def handler(event, context):
    print(event)
    headers = event["headers"]
    method = event["httpMethod"]
    if method == "POST":
        file = event["body"]
        print("type of body: {}".format(type(file)))
        resp = upload_to_S3(base64.b64decode(file), str(uuid.uuid4()))
    else:
        query = event["queryStringParameters"]
        s3_key = query["image"]
        resp = get_object_from_S3(s3_key)
    print(resp)
    return resp;
