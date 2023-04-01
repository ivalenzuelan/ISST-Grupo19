package es.upm.dit.isst.seguroapi.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Seguro {
    @Id
    private Integer id;
    private String nombre;
    private String tipo;
    private String descripcion;
    private double precio;
    private String periodicidad;
    private String aseguradora;

    /* Constructors */
    public Seguro() {
    }

    public Seguro(int id, String nombre, String tipo, String descripcion, double precio, String periodicidad,
            String aseguradora) {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.periodicidad = periodicidad;
        this.aseguradora = aseguradora;
    }

    /* Getters and Setters */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getPeriodicidad() {
        return periodicidad;
    }

    public void setPeriodicidad(String periodicidad) {
        this.periodicidad = periodicidad;
    }

    public String getAseguradora() {
        return aseguradora;
    }

    public void setAseguradora(String aseguradora) {
        this.aseguradora = aseguradora;
    }

    /* To String */
    @Override
    public String toString() {
        return "Seguro [id=" + id + ", nombre=" + nombre + ", tipo=" + tipo + ", descripcion=" + descripcion
                + ", precio=" + precio + ", periodicidad=" + periodicidad + ", aseguradora=" + aseguradora + "]";
    }


    /* Equals */

}
