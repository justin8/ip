import awsgi
from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def root():
    return request.remote_addr


@app.route("/full")
def full():
    return request.remote_addr


def lambda_handler(event, context):
    return awsgi.response(app, event, context)
