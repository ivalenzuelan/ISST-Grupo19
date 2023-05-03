package es.upm.dit.isst.seguroapi.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class WebSecurityConfig  {

    private final UserDetailsService userDetailsService; // necesitamos esta instancia; es el servicio para coger los detalles del cliente
    private final JWTAuthorizationFilter jwtAuthorizationFilter; // 
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception{
        // 
        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter();
        jwtAuthenticationFilter.setAuthenticationManager(authManager);
        // establecemos la ruta para el inicio de sesion:
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");


        return http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/seguros").permitAll()
                .anyRequest() // cualquier solicitud
                .authenticated() // tiene que estar autenticada
                .and()
                .httpBasic() // config basica de https (import para hacer peticiones luego)
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(jwtAuthenticationFilter) // agregamos los filtros
                // para el de autorizacion tenemos que espeficar en que orden se va a ejecutar
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // para probar si funciona:
    // @Bean
    // UserDetailsService userDetailsService () throws Exception {
    //     InMemoryUserDetailsManager manager =  new InMemoryUserDetailsManager();
    //     manager.createUser(User.withUsername("admin")
    //             .password(passwordEncoder().encode("admin"))
    //             .roles()
    //             .build());
    //     return manager;
    // }

    @Bean
    AuthenticationManager authManager(HttpSecurity http) throws Exception{
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                    .userDetailsService(userDetailsService)
                    // .passwordEncoder(passwordEncoder())
                    .and()
                    .build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // public static void main (String [] args) {
    //     System.out.println("pass: "+ new BCryptPasswordEncoder().encode("miclave"));
    // }

}
