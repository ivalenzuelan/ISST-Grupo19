package es.upm.dit.isst.seguroapi.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.repository.ClienteRepository;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {

    @Autowired
    ClienteRepository clienteRepository;

    public Optional<Cliente> getByUsuario(String nombreUsuario) {
        return clienteRepository.findByUsername(nombreUsuario);
    }

    public Boolean existsByUsuario(String nombreUsuario) {
        return clienteRepository.existsByUsername(nombreUsuario);
    }

    public Boolean existsByEmail(String email) {
        return clienteRepository.existsByMail(email);
    }

    public void save(Cliente usuario) {
        clienteRepository.save(usuario);
    }

}
