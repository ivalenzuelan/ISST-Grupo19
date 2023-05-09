package es.upm.dit.isst.seguroapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import es.upm.dit.isst.seguroapi.security.jwt.JwtEntryPoint;
import es.upm.dit.isst.seguroapi.security.jwt.JwtTokenFilter;
import es.upm.dit.isst.seguroapi.security.service.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
// con perPostEnabled se usa para indicar a q metodos puede acceder solo el
// admin
// Los metodos que no lleven anotación pueden acceder el admin como un generic
// user
// @preauthorized solo puede acceder el admin
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MainSecurity extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    // Devuelve el mensaje de no autorizado
    @Autowired
    JwtEntryPoint jwtEntryPoint;

    @Bean
    public JwtTokenFilter jwtTokenFilter() {
        return new JwtTokenFilter();
    }

    /**
     * Encripta el pasword
     * 
     * @return pasword ecriptado
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Desactivamos cookies ya que enviamos un token
        // cada vez que hacemos una petición
        http.headers().frameOptions().disable();
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        http.cors().and().csrf().disable()
                .authorizeHttpRequests()
                .antMatchers("/auth/**", "/seguros", "/seguros/tipo/{tipo}","/h2-console/**", "/idClienteus/*").permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(jwtEntryPoint)
                .and()
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
                    .invalidSessionUrl("/logout")
                    .maximumSessions(4)
                    .maxSessionsPreventsLogin(false))
                .logout(logout->logout.deleteCookies("JSESSIONID").invalidateHttpSession(true));
        http.addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
