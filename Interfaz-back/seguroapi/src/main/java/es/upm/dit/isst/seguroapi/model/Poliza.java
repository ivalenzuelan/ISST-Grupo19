package es.upm.dit.isst.seguroapi.model;

import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Table(name="POLIZA")
public class Poliza {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "CLIENTE", nullable = false)
    Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "SEGURO", nullable = false)
    Seguro seguro;

    @Column(name="FECHA_INICIO", nullable = false)
    private LocalDate inicio;

    @Column(name="FECHA_TERMINO", nullable = false)
    private LocalDate termino;

    @Column(name="PRECIO")
    private double precio;

    public void setId(long id) {
        this.id = id;
    }

    @Column(name="PERIODICIDAD")
    private String periodicidad;

    @Lob
    @Column(name="PDF_POLIZA")
    private byte[] pdf_poliza;

    public Poliza() {
    }

    public Poliza(Cliente cliente, Seguro seguro, LocalDate inicio, LocalDate termino, double precio,
            String periodicidad) {
        this.cliente = cliente;
        this.seguro = seguro;
        this.inicio = inicio;
        this.termino = termino;
        this.precio = precio;
        this.periodicidad = periodicidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPdf_poliza() {
        return pdf_poliza;
    }

    public void setPdf_poliza(byte[] pdf_poliza) {
        this.pdf_poliza = pdf_poliza;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Seguro getSeguro() {
        return seguro;
    }

    public void setSeguro(Seguro seguro) {
        this.seguro = seguro;
    }

    public LocalDate getInicio() {
        return inicio;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getTermino() {
        return termino;
    }

    public void setTermino(LocalDate termino) {
        this.termino = termino;
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

    public void setPeriodicidad(String periodiciad) {
        this.periodicidad = periodiciad;
    }

    



    

    

    

}