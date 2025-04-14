class Producto:
    def __init__(self,id_producto,nombre,marca,precio,imagen,cantidad):
        self.id_producto=id_producto
        self.nombre=nombre
        self.marca=marca
        self.precio=precio
        self.imagen=imagen  
        self.cantidad=cantidad
        
        
    def ProductoDBCollection(self):
        return{
            "id_producto":self.id_producto,
            "nombre":self.nombre,
            "marca":self.marca,
            "precio":self.precio,
            "imagen":self.imagen,
            "cantidad":self.cantidad,
        }