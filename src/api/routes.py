"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import base64
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

def get_password(password,salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")

# See all or one user
@api.route('/private', methods=['GET'])
@api.route('/private/<int:user_id>', methods=['GET'])
@jwt_required()
def handle_users(user_id = None):
    if request.method == 'GET':
        if user_id is None:
            users = User.query.all()
            # Whats the idea with getting this?
            user_id = User.query.get(get_jwt_identity())
            print(user_id.serialize())

            return jsonify(list(map(lambda item: item.serialize(), users))), 200
        elif user_id is not None:
            user = User.query.get(user_id)
            user_id = User.query.get(get_jwt_identity())
            print(user_id.serialize())
            if user is None:
                return jsonify({"message":"Error, couldn't find user"}), 404
            else:
                return jsonify(user.serialize()), 200

# Add a new user
@api.route("/signup", methods=['POST'])
def add_user():
    if request.method == 'POST':
        body = request.json

        username = body.get("username")
        email = body.get("email")
        password = body.get("password")

        if username is None:
            return jsonify({"message":"Error, bad request"}), 400
        elif email is None:
            return jsonify({"message":"Error, bad request"}), 400
        elif password is None:
            return jsonify({"message":"Error, bad request"}), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            encoded_password = get_password(password=password, salt=salt)

            new_user = User(email=email, username=username, password=encoded_password, is_active=True, salt=salt)
            db.session.add(new_user)

            try:
                db.session.commit()
                return jsonify(new_user.serialize()), 201
            except Exception as error:
                print(error.args)
                db.session.rollback()
                return jsonify({"message": f"Error {error.args}"}), 500
            
# Login into the page
@api.route("/login", methods=['POST'])
def login_user():
    if request.method == 'POST':
        body = request.json

        email = body.get("email")
        password = body.get("password")

        if email is None:
            return jsonify({"message":"Error, bad request"}), 400
        elif password is None:
            return jsonify({"message":"Error, bad request"}), 400
        else:
            login_user = User.query.filter_by(email=email).one_or_none()
            if login_user is None:
                return jsonify({"message":"Error, couldn't find user"}), 404
            else:
                if check_password(hash_password=login_user.password, password=password, salt=login_user.salt):
                    # Creamos el token
                    new_token = create_access_token(identity=login_user.id)
                    return jsonify({"token":new_token})
                else:
                    return jsonify({"message":"Bad credentials"}), 400

    return jsonify({"message":"Sucess!"}), 201


