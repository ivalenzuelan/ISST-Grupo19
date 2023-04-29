package es.upm.dit.isst.seguroapi.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


// implementamos filtro para el proceso de autorizacion al acceder a los endpoints
@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // aqui se puede hacer tb config para roles y permisos
        // de momento hacemos algo muy sencillo

        // aqui el usuario ya esta usando el token 
        // extraemos el token desde la cabecera Authorization
        String bearerToken = request.getHeader("Authorization");

        // comprobamos que no sea nulo y que comience por Bearer
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            // Quitamos lo de "Bearer"
            String token = bearerToken.replace("Bearer ", "");
            // Creamos una instancia de UPAT con el metodo getAuthentication que hemos implementado en TokenUtils
            UsernamePasswordAuthenticationToken usernamePAT = TokenUtils.getAuthenticacion(token);
            
            SecurityContextHolder.getContext().setAuthentication(usernamePAT);
        }
        // creamos el filtro
        filterChain.doFilter(request, response);
    }

    
    
}
