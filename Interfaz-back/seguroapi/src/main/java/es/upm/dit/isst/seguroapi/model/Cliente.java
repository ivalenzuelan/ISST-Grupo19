package es.upm.dit.isst.seguroapi.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Cliente {
    @Id
    private Integer id;
    private String mail;
    private String idFiscal;
    private String username;
    private String nombre;
    private String apellidos;
    private String password;
    private Date nacimiento;
    private String direccion;
    private String telefono;

    
    public Cliente() {
    }

    

    



    public Cliente(Integer id, String mail, String idFiscal, String username, String nombre, String apellidos,
            String password, Date nacimiento, String direccion, String telefono) {
        this.id = id;
        this.mail = mail;
        this.idFiscal = idFiscal;
        this.username = username;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.password = password;
        this.nacimiento = nacimiento;
        this.direccion = direccion;
        this.telefono = telefono;
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


    public Date getNacimiento() {
        return nacimiento;
    }


    public void setNacimiento(Date nacimiento) {
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
