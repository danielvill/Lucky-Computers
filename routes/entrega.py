from flask import Blueprint, render_template, request, flash, session, redirect, url_for, current_app
from controllers.database import Conexion as dbase
from werkzeug.utils import secure_filename
import os
from modules.entrega import Entrega
from pymongo import MongoClient
db = dbase()

entrega = Blueprint('entrega', __name__)


# Este es para lo que es las imagenes
@entrega.route('/alguna_ruta')
def alguna_funcion():
    UPLOAD_FOLDER = current_app.config['UPLOAD_FOLDER']
    
# codigo de verificacion de productos con las imagenes
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Este codigo es para las  imagenes
def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Este codigo es para lo que es el ID
def get_next_sequence(name): 
    seq = db.seqs.find_one({'_id': name})
    if seq is None:
        # Inicializa 'productoId' en 220 si no existe
        db.seqs.insert_one({'_id': 'entradaId', 'seq': 0})
        seq = db.seqs.find_one({'_id': name})

    result = db.seqs.find_one_and_update(
        {'_id': name},
        {'$inc': {'seq': 1}},
        return_document=True
    )
    return result.get('seq')

@entrega.route('/user/in_entrada', methods=['GET', 'POST'])
def inentrada():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('entrega.index'))
    
    cliente = db['cliente'].find()
    if request.method == 'POST':
        id_entrada = str(get_next_sequence('entradaId')).zfill(3)
        entrega = db["entrega"]
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        cedula = request.form['cedula']
        telefono = request.form['telefono']
        problema = request.form['problema']
        fecha = request.form['fecha']
        hora = request.form['hora']
        comentario = request.form['comentario']

        if 'imagen' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['imagen']
        if file.filename == '':
            flash('Selecciona una imagen')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            imagen_filename = filename
        
        entra = Entrega(id_entrada, nombre,apellido,cedula,telefono,problema, fecha,hora, imagen_filename, comentario)
        entrega.insert_one(entra.EntregaDBCollection())
        flash("Guardado en la base de datos" , "success")
        return redirect(url_for('entrega.inentrada'))

    else:
        return render_template('user/in_entrada.html',cliente = cliente)

# Editar entrada
@entrega.route('/edit_entrada/<string:edaentrega>', methods=['GET', 'POST'])#
def edit_entrada(edaentrega):
    entrega = db['entrega']
    nombre = request.form["nombre"]
    apellido = request.form["apellido"]
    cedula = request.form['cedula']
    telefono = request.form["telefono"]
    problema = request.form["problema"]
    fecha = request.form["fecha"]
    hora = request.form["hora"]
    comentario = request.form['comentario']
    
    if nombre and apellido  and cedula and telefono and problema and fecha and hora and comentario:
        entrega.update_one({'id_entrada' : edaentrega}, {'$set' : {'nombre' : nombre, 'apellido' : apellido, 'cedula' : cedula ,"telefono" :telefono , "problema" : problema , "fecha" : fecha , "hora" : hora , "comentario" : comentario}})
        flash("Cliente  "+ nombre + " con  cedula " + cedula + " editado correctamente " , "success")
        return redirect(url_for('entrega.u_entrada'))
    else:
        return render_template('user/in_entrada.html')


# VIusualizar entrada usuario
@entrega.route('/user/entrega', methods=['GET', 'POST'])
def u_entrada():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('entrega.index'))
    
    entrega = db['entrega'].find()
    return render_template('user/entrega.html', entrega=entrega)


# Visualizar entrada admin
@entrega.route('/admin/entrega', methods=['GET', 'POST'])
def v_entrada_admin():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('entrega.index'))
    
    entrega = db['entrega'].find()
    return render_template('admin/entrega.html', entrega=entrega)