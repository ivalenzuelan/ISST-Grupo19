package es.upm.dit.isst.seguroapi.security.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

public class NuevoUsuario {

    @NotBlank
    private String nombre;
    @NotBlank
    private String username;
    @Email
    private String mail;
    @NotBlank
    private String password;
    // Por defecto crea un usuario normal
    // Si quiero un usuario Admin debo pasar este campo roles
    private Set<String> roles = new HashSet<>();
    
    public String getNombre() {
        return nombre;
    }
    public String getUsername() {
        return username;
    }
    public String getMail() {
        return mail;
    }
    public String getPassword() {
        return password;
    }
    public Set<String> getRoles() {
        return roles;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setMail(String mail) {
        this.mail = mail;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    
}
