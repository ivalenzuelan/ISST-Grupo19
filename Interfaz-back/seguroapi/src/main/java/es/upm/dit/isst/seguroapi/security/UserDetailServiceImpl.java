package es.upm.dit.isst.seguroapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.repository.ClienteRepository;

// anotamos con service para poder trabajar con la bbdd
@Service
public class UserDetailServiceImpl implements UserDetailsService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        Cliente cliente = clienteRepository
            .findOneByMail(mail)
            .orElseThrow(() -> new UsernameNotFoundException("El usuario con email " + mail + " no existe."));
        
        return new UserDetailsImp(cliente);
    }

    
}
