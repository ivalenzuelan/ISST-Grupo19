package es.upm.dit.isst.seguroapi.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.repository.ClienteRepository;

@RestController
@CrossOrigin
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public static final Logger log = LoggerFactory.getLogger(ClienteController.class);

    public ClienteController(ClienteRepository c) {
        this.clienteRepository = c;
    }

    // CLIENTES //
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/clientes")
    List<Cliente> readAllCliente() {
        return (List<Cliente>) clienteRepository.findAllByOrderByNombreAscApellidosAsc();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/clientesConCita")
    List<Cliente> readClientesCita() {
        return (List<Cliente>) clienteRepository.findByCitaNotNullOrderByCita();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/clientes")
    ResponseEntity<Cliente> createCliente(@RequestBody Cliente newCliente) throws URISyntaxException {
        Cliente result = clienteRepository.save(newCliente);
        return ResponseEntity.created(new URI("/clientes/" + result.getNombre() + result.getApellidos())).body(result);

    }

    @GetMapping("/idClienteus/{username}")
    ResponseEntity<Cliente> readClientes(@PathVariable String username) {
        return clienteRepository.findByUsername(username).map(cliente -> ResponseEntity.ok().body(cliente))
                .orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/clientes/{id}")
    ResponseEntity<Cliente> readClientes(@PathVariable Integer id) {
        return clienteRepository.findById(id).map(cliente -> ResponseEntity.ok().body(cliente))
                .orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/clientes/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo
                                  // aunque no se hayan cambiado todos los campos, sino error 500
    // esto responde con el json actualizado en el body
    ResponseEntity<Cliente> updateCliente(@RequestBody Cliente newCliente, @PathVariable Integer id) {
        return clienteRepository.findById(id).map(cliente -> {
            cliente.setId(newCliente.getId());
            cliente.setNombre(newCliente.getNombre());
            cliente.setApellidos(newCliente.getApellidos());
            cliente.setIdFiscal(newCliente.getIdFiscal());
            cliente.setDireccion(newCliente.getDireccion());
            cliente.setMail(newCliente.getMail());
            cliente.setNacimiento(newCliente.getNacimiento());
            cliente.setTelefono(newCliente.getTelefono());
            cliente.setUsername(newCliente.getUsername());
            cliente.setPassword(newCliente.getPassword());
            cliente.setCita(newCliente.getCita());

            clienteRepository.save(cliente);
            return ResponseEntity.ok().body(cliente);
        }).orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("clientes/{id}")
    ResponseEntity<Cliente> deleteCliente(@PathVariable Integer id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

}