package es.upm.dit.isst.seguroapi.security;

import java.io.IOException;
import java.util.Collections;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

// implementamos filtro para el proceso de autenticacion del usuario
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    // sobrescribimos el metodo de la clase de la que extiende
    @Override
    // recibe request y response
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // creamos un objeto de credenciales, a partir de un json que nos llegara
        AuthCredentials authCredentials = new AuthCredentials();
        try {
            // ahora parseamos el json de la solicitud a un objeto AuthCredentials
            authCredentials = new ObjectMapper().readValue(request.getReader(),AuthCredentials.class);
        } catch (IOException e) {
        }

        // construimos un token para la autenticacion
        UsernamePasswordAuthenticationToken usernamePAT = new UsernamePasswordAuthenticationToken(
            // obtenemos el mail y el password del objeto authcredentials para construir el token
            authCredentials.getMail(),
            authCredentials.getPassword(), 
            Collections.emptyList());

        return getAuthenticationManager().authenticate(usernamePAT);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        
        UserDetailsImp userDetails = (UserDetailsImp) authResult.getPrincipal(); // Creamos un objeto UserDetailsImp a partir del resultado de autenticacion

        // creamos el token con el nombre y el mail
        String token = TokenUtils.createToken(userDetails.getNombre(), userDetails.getUsername());

        // a la respuesta le añadimos cosas en la cabecera:
        response.addHeader("Authorization", "Bearer " + token);
        response.getWriter().flush(); // confirmamos cambios

        super.successfulAuthentication(request, response, chain, authResult);
    }
}
