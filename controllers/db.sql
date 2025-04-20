create table cliente (
    nombre varchar(100),
    apellido varchar(100),
    cedula int ,
    direccion varchar(100),
    telefono int,
    correo varchar(100),
    primary key (cedula)
);

create table marca(
    id_marca int auto_increment,
    nombre varchar(50),
    proveedor varchar(50),
    comentario varchar(100),
    primary key (id_marca)
);

create table entrega(
    id_entrada int auto_increment,
    nomnbre varchar(50),
    apellido varchar(100),
    cedula int ,
    direccion varchar(100),
    telefono int,
    problema varchar(100),
    fecha date,
    hora time,
    imagen varchar(100),
    comentario varchar(100),
    primary key (id_entrada),
    FOREIGN KEY (id_entrada) REFERENCES cliente(cedula)
);

create table producto(
    id_producto int auto_increment,
    nombre varchar(50),
    marca varchar(50),
    precio float,
    imagen varchar(50),
    cantidad int,
    primary key (id_producto),
    FOREIGN KEY (id_producto) REFERENCES marca(id_marca)
);

create table servicio(
    id_servicio int auto_increment,
    nombre varchar(50),
    precio float,
    comentario varchar(100),
    primary  key (id_servicio)
);

create table venta(
    id_venta int,
    n_cliente varchar(50),
    n_apellido varchar(50),
    dirección varchar (100),
    cedula int,
    fecha date,
    hora time,
    n_productos varchar(100),
    cantidad int,
    precio float(10,2),
    resultado float(10,2),
    total decimal(10,2),
    PRIMARY KEY (id_venta),
    FOREIGN KEY (id_venta) REFERENCES cliente(cedula)
    
);

create table users(    
    user varchar(50),
    cedula varchar(100),
    contraseña varchar(50),
    PRIMARY KEY (cedula)
)