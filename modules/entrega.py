class Entrega:
    def __init__(self,id_entrada,nombre,apellido,cedula,telefono,problema,fecha,hora,imagen,comentario):
        
        self.id_entrada=id_entrada
        self.nombre=nombre
        self.apellido=apellido
        self.cedula=cedula
        self.telefono=telefono
        self.problema=problema
        self.fecha=fecha
        self.hora=hora
        self.imagen=imagen
        self.comentario=comentario
        
       
        
    def EntregaDBCollection(self):
        return{
            
            "id_entrada": self.id_entrada,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "cedula": self.cedula,
            "telefono": self.telefono,
            "problema": self.problema,
            "fecha": self.fecha,
            "hora": self.hora,
            "imagen": self.imagen,
            "comentario": self.comentario
            
        }