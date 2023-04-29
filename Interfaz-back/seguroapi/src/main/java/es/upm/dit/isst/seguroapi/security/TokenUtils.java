package es.upm.dit.isst.seguroapi.security;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class TokenUtils {
    private final static String ACCESS_TOKEN_SECRET = "4673hggdhjks5678ghjvcghjw"; // esta la he puesto a boleo igual hay que poner otra cosa (min 10:27)
    private final static Long ACCESS_TOKEN_VALIDITY_SECONDS = 2_592_000L; // 30 dias de vida para el token

    public static String createToken(String nombre, String email) {
        // el nombre y mail lo usamos para enviar data adicional en el token
        long expirationTime = ACCESS_TOKEN_VALIDITY_SECONDS * 1_000;
        Date expirationDate = new Date (System.currentTimeMillis() + expirationTime);

        // mapa como mochila adicional de data
        Map<String, Object> extra = new HashMap<>();
        extra.put("nombre", nombre); // esto viajará con el token

        // construimos el token
        return Jwts.builder()
                .setSubject(email) // a quien esta dirigido el token
                .setExpiration(expirationDate)
                .addClaims(extra) // agregamos la data adicional (se podrian agregar mas datos al hashmap)
                .signWith(Keys.hmacShaKeyFor(ACCESS_TOKEN_SECRET.getBytes())) // firmamos con el token de arriba
                .compact();
        

    }

    // proceso de autenticacion para un usuario que estan intentando acceder a un endpoint mediante un token
    public static UsernamePasswordAuthenticationToken getAuthenticacion (String token) {
        try {
            //proceso inverso a la creacion del token
            Claims claims = Jwts.parserBuilder()
                .setSigningKey(ACCESS_TOKEN_SECRET.getBytes())
                .build()
                .parseClaimsJws(token) // le pasamos el token que nos manda el usuario
                .getBody(); // obtenemos el body

            String email = claims.getSubject(); // recuperamos el mail


            return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

        } catch (JwtException e) {
            // si el token es invalido, se lanza la excepcion, y decidimos devolver nulo
            return null;
        }
    }

}
