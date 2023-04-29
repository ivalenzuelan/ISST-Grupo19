package es.upm.dit.isst.seguroapi.security;

import lombok.Data;

// al poner la anotacion data, los geters y los seters se generan solos
@Data
public class AuthCredentials {
    // esta clase es para recibir el correo y la contraseña
    private String mail;
    private String password;
}
