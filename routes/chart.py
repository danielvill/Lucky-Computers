from flask import Blueprint, make_response,send_file, render_template, request, flash, session, redirect, url_for
from controllers.database import Conexion as dbase
from modules.venta import Venta
from pymongo import MongoClient
from flask import jsonify
from bson import ObjectId
from reportlab.pdfgen import canvas # *pip install reportlab este es para imprimir reportes
from reportlab.lib.pagesizes import letter #* pip install reportlab 
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Table, Paragraph, TableStyle, Spacer ,Image
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet ,ParagraphStyle
import io
from flask import Flask
db = dbase()
from mail_config import mail
from flask_mail import Message
# Importar mail después de definir el Blueprint

chart_pb =  Blueprint('chart', __name__)


# Funcion para inicializar el chart

@chart_pb.route("/admin/chart")
def chart():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('producto.index'))
    producto = db["producto"].find()
    venta = db ["venta"].find()
    principal = db ["venta"].find()
    cliente = db["venta"].find()

    return render_template('admin/chart.html', producto=producto,venta=venta,principal=principal,cliente=cliente)

