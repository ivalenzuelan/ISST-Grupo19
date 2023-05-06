package es.upm.dit.isst.seguroapi.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig{
 
    @Bean
    public UserDetailsService jdbcUserDetailsService(DataSource dataSource) {
        String usersByUsernameQuery = "select username, password, true from cliente where username = ?";
        String authsByUserQuery = "select username, authority from cliente where username = ?";
        JdbcUserDetailsManager cliente = new JdbcUserDetailsManager(dataSource);
        cliente.setUsersByUsernameQuery(usersByUsernameQuery);
        cliente.setAuthoritiesByUsernameQuery(authsByUserQuery);
        return cliente;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/seguros/**").permitAll()
            .antMatchers("/h2-console/**", "/clientes", "clientes/**", "/polizas/**").hasAnyRole("ADMIN")
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .permitAll()
            .and()
            .logout()
            .permitAll()
            .and()
            .csrf()
            .ignoringAntMatchers("/h2-console/**")
            .and()
            .headers()
            .frameOptions()
            .sameOrigin()
            .and()
            .httpBasic();
        return http.build();
    }
}
