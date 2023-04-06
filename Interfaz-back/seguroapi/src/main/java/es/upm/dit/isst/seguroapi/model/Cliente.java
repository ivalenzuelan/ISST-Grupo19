package es.upm.dit.isst.seguroapi.model;

import java.time.LocalDate;
import java.util.Set;

import javax.persistence.*;

@Entity
@Table (name = "CLIENTE")
public class Cliente {
    @Id
    @Column(name="ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="MAIL", nullable = false)
    private String mail;

    @Column(name="ID_FISCAL", nullable = false)
    private String idFiscal;

    @Column(name="USERNAME", nullable = false)
    private String username;

    @Column(name="NOMBRE", nullable = false)
    private String nombre;

    @Column(name="APELLIDOS", nullable = false)
    private String apellidos;

    @Column(name="PASSWORD", nullable = false)
    private String password;

    @Column(name="NACIMIENTO")
    private LocalDate nacimiento;

    @Column(name="DIRECCION")
    private String direccion;

    @Column(name="TELEFONO")
    private String telefono;

    @Column(name="CITA")
    private LocalDate cita;

    @OneToMany(mappedBy = "cliente")
    Set<Poliza> poliza;


    
    public Cliente() {
    }
    
    public Cliente(String mail, String idFiscal, String username, String nombre, String apellidos,
            String password, LocalDate nacimiento, String direccion, String telefono, LocalDate cita) {
        this.mail = mail;
        this.idFiscal = idFiscal;
        this.username = username;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.nacimiento = nacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
        this.cita = cita;
    }


    public String getNombre() {
        return nombre;
    }


    public void setNombre(String nombre) {
        this.nombre = nombre;
    }




    public String getApellidos() {
        return apellidos;
    }




    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }




    public String getIdFiscal() {
        return idFiscal;
    }


    public void setIdFiscal(String idFiscal) {
        this.idFiscal = idFiscal;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getMail() {
        return mail;
    }


    public void setMail(String mail) {
        this.mail = mail;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    public LocalDate getNacimiento() {
        return nacimiento;
    }


    public void setNacimiento(LocalDate nacimiento) {
        this.nacimiento = nacimiento;
    }


    public String getDireccion() {
        return direccion;
    }


    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }


    public String getTelefono() {
        return telefono;
    }


    public LocalDate getCita() {
        return cita;
    }

    public void setCita(LocalDate cita) {
        this.cita = cita;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }


    @Override
    public String toString() {
        return "Cliente [mail=" + mail + "]";
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((mail == null) ? 0 : mail.hashCode());
        return result;
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Cliente other = (Cliente) obj;
        if (mail == null) {
            if (other.mail != null)
                return false;
        } else if (!mail.equals(other.mail))
            return false;
        return true;
    }





    public Integer getId() {
        return id;
    }





    public void setId(Integer id) {
        this.id = id;
    }

    
    
}
