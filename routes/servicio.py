from flask import Blueprint, render_template, request, flash, session, redirect, url_for, current_app
from controllers.database import Conexion as dbase
from werkzeug.utils import secure_filename
import os
from modules.servicio import Servicio
from pymongo import MongoClient
db = dbase()

servicio = Blueprint('servicio', __name__)



# Este codigo es para lo que es el ID
def get_next_sequence(name): 
    seq = db.seqs.find_one({'_id': name})
    if seq is None:
        # Inicializa 'productoId' en 220 si no existe
        db.seqs.insert_one({'_id': 'servicioId', 'seq': 0})
        seq = db.seqs.find_one({'_id': name})

    result = db.seqs.find_one_and_update(
        {'_id': name},
        {'$inc': {'seq': 1}},
        return_document=True
    )
    return result.get('seq')

@servicio.route("/admin/in_servicio",methods = ["GET", "POST"])
def adser():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('servicio.index'))
    
    if request.method == "POST":
        id_servicio = str(get_next_sequence('servicioId')).zfill(1)
        servicio = db['servicio']
        nombre = request.form['nombre']
        precio = request.form['precio']
        comentario = request.form['comentario']
        
        exist_servicio = servicio.find_one({"nombre":nombre})
        
        if exist_servicio:
            flash("El nombre del servicio ya existe", "danger")
            return redirect(url_for('servicio.adser'))
        
        servicio.insert_one({"id_servicio": id_servicio, "nombre": nombre, "precio": precio, "comentario": comentario})
        flash("Servicio agregado correctamente")
        return redirect(url_for('servicio.adser'))
    else:
        return render_template('admin/in_servicio.html')


@servicio.route('/edit_ser/<string:edaser>', methods=['GET', 'POST'])#
def edit_ser(edaser):
    servicio = db['servicio'] 
    nombre = request.form["nombre"]
    precio = request.form["precio"]
    comentario = request.form["comentario"]
    

    if nombre and precio and comentario:
        servicio.update_one({'id_servicio' : edaser}, {'$set' : {'nombre' : nombre, "precio" : precio, "comentario" : comentario}})
        flash("Cliente  "+ nombre +  "editado correctamente " , "success")
        return redirect(url_for('cliente.v_cli'))
    else:
        return render_template('admin/cliente.html')
    
# * Eliminar servicio
@servicio.route('/delete_ser/<string:eliaser>')
def delete_ser(eliaser):
    servicio = db["servicio"]
    documento =  servicio.find_one({"id_servicio":eliaser})
    nombre = documento["nombre"]
    id_servicio = documento["id_servicio"]
    servicio.delete_one({"id_servicio":eliaser})
    flash("Servicio  "+ nombre + " con codigo  " + id_servicio  + " eliminado correctamente" , "success") 
    return redirect(url_for('servicio.v_ser'))

# Visualizar servicio
@servicio.route("/admin/servicio")
def v_ser():
    if 'username' not in session:
        flash("Inicia sesion con tu usuario y contraseña")
        return redirect(url_for('servivio.index'))
    servicio = db['servicio'].find()
    return render_template("admin/servicio.html", servicio=servicio)

