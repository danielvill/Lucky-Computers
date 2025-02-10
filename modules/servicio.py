class Servicio:
    def __init__(self,id_servicio,nombre,precio,comentario):
        self.id_servicio=id_servicio
        self.nombre=nombre
        self.precio=precio
        self.comentario=comentario  
        
        
        
    def ServicioDBCollection(self):
        return{
            "id_servicio":self.id_servicio,
            "nombre":self.nombre,
            "precio":self.precio,
            "comentario":self.comentario
            
        }