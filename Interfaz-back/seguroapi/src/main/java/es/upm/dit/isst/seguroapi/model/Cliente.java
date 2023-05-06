package es.upm.dit.isst.seguroapi.model;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "CLIENTE")
public class Cliente {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "MAIL", nullable = false)
    private String mail;

    @Column(name = "ID_FISCAL")
    private String idFiscal;

    @Column(name = "USERNAME", nullable = false)
    private String username;

    @Column(name = "NOMBRE", nullable = false)
    private String nombre;

    @Column(name = "APELLIDOS")
    private String apellidos;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "NACIMIENTO")
    private LocalDate nacimiento;

    @Column(name = "DIRECCION")
    private String direccion;

    @Column(name = "TELEFONO")
    private String telefono;

    @Column(name = "CITA")
    private LocalDate cita;

    @OneToMany(mappedBy = "cliente")
    Set<Poliza> poliza;

    @NotNull
    // Relación many to many
    // Un usuario puede tener MUCHOS roles y un rol puede PERTENECER a varios
    // usuarios
    // Tabla intermedia que tiene dos campos que va a tener idUsuario y idRol
    @ManyToMany
    // join columns hace referencia a la columna que hace referencia hacia esta
    // Es decir la tabla usuario_rol va a tener un campo que se llama id_usuario
    // inverseJoinColumns = el inverso, hace referencia a rol
    @JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "id_usuario"), inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Rol> roles = new HashSet<>();

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

    public Cliente(String mail, String username, String nombre, String password) {
        this.mail = mail;
        this.username = username;
        this.nombre = nombre;
        this.password = password;
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

    public Set<Rol> getRoles() {
        return roles;
    }

    public void setRoles(Set<Rol> roles) {
        this.roles = roles;
    }

}
