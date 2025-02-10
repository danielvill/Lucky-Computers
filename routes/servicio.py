from flask import Blueprint, render_template, request, flash, session, redirect, url_for, current_app
from controllers.database import Conexion as dbase
from werkzeug.utils import secure_filename
import os
from modules.servicio import Servicio
from pymongo import MongoClient
db = dbase()

servicio = Blueprint('servicio', __name__)


