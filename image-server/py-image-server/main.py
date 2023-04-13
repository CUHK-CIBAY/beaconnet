import boto3
import traceback
import io
import os
import json

def upload_to_S3(file, s3_key):
    s3 = boto3.client('s3')
    try:
        fileobj = io.BytesIO(file)
        bucket = boto3.resource("s3").Bucket(os.environ['BUCKET_NAME'])
        print("before upload fileobj")
        bucket.upload_fileobj(fileobj, s3_key)
        print("before get url")
        url = s3.generate_presigned_url(
                ClientMethod = 'get_object',
                Params = {
                    'Bucket': os.environ['BUCKET_NAME'],
                    'Key': s3_key
                },
                ExpiresIn = 24 * 3600
            )

        print("Upload Successfull {}".format(url))
        return {
            "statusCode": 200,
            "body": {
                "Test-string": "hello",
                "url": url,    
            },
        }
    except Exception as ex:
        print(ex)
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
        return {
            "statusCode": 200,
            "body": json.dumps(json.loads(file.decode('utf8')))
        }
    except Exception as ex:
        print(ex)
        print(traceback.format_exc())
        return {
            "statusCode": 400,
            "body": ex,
        }

def handler(event, context):
    print(event)
    print(context)
    resp = upload_to_S3(json.dumps(event).encode('utf-8'), "testing")
    resp = get_object_from_S3("testing")
    print(resp)
    return resp;
