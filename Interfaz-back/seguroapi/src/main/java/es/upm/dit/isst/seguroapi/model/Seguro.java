package es.upm.dit.isst.seguroapi.model;

import java.util.Set;

import javax.persistence.*;

@Entity
@Table(name="SEGURO")
public class Seguro {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="NOMBRE", nullable = false)
    private String nombre;

    @Column(name="TIPO_SEGURO", nullable = false)
    private String tipo;

    @Column(name="DESCRIPCION")
    private String descripcion;

    @Column(name="PRECIO", nullable = false)
    private double precio;

    @Column(name="PERIODICIDAD", nullable = false)
    private String periodicidad;

    @Column(name="ASEGURADORA", nullable = false)
    private String aseguradora;

    @OneToMany(mappedBy = "seguro")
    Set<Poliza> poliza;

    /* Constructors */
    public Seguro() {
    }

    public Seguro(String nombre, String tipo, String descripcion, double precio, String periodicidad,
            String aseguradora) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.periodicidad = periodicidad;
        this.aseguradora = aseguradora;
    }

    /* Getters and Setters */

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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
