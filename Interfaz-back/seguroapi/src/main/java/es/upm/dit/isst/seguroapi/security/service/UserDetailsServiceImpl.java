package es.upm.dit.isst.seguroapi.security.service;


import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.security.entity.UsuarioMain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Clase que convierte la clase usuario en un UsuarioMain
 * UserDetailsService es propia de Spring Security
 */
@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Cliente usuario = usuarioService.getByUsuario(nombreUsuario).get();
        return UsuarioMain.build(usuario);
    }
}