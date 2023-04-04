package es.upm.dit.isst.seguroapi.controller;

import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.model.Seguro;
import es.upm.dit.isst.seguroapi.repository.ClienteRepository;
import es.upm.dit.isst.seguroapi.repository.SeguroRepository;

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

@RestController
@CrossOrigin("*")
public class SeguroController {

    private final SeguroRepository seguroRepository;
    private final ClienteRepository clienteRepository;

    public static final Logger log = LoggerFactory.getLogger(SeguroController.class);

    public SeguroController(SeguroRepository s, ClienteRepository c) {

        this.seguroRepository = s;
        this.clienteRepository = c;


    }

    @GetMapping("/seguros")
    List<Seguro> readAllSeguro() {
        return (List<Seguro>) seguroRepository.findAll();

    }

    @PostMapping("/seguros")

    ResponseEntity<Seguro> createSeguro(@RequestBody Seguro newSeguro) throws URISyntaxException {

        Seguro result = seguroRepository.save(newSeguro);

        return ResponseEntity.created(new URI("/seguros/" + result.getNombre())).body(result);

    }

    @GetMapping("/seguros/tipo/{tipo}")
    List<Seguro> readSeguroTipo(@PathVariable String tipo) {
        return (List<Seguro>) seguroRepository.findByTipo(tipo);
    }

    @GetMapping("/seguros/{id}")
    ResponseEntity<Seguro> readSeguro(@PathVariable Integer id) {
        return seguroRepository.findById(id).map(tfg ->
        ResponseEntity.ok().body(tfg)
        ).orElse(new ResponseEntity<Seguro>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/seguros/{id}")
    ResponseEntity<Seguro> updateSeguro(@RequestBody Seguro newSeguro, @PathVariable Integer id) {

        return seguroRepository.findById(id).map(seguro -> {

            seguro.setId(newSeguro.getId());

            seguro.setNombre(newSeguro.getNombre());

            seguro.setTipo(newSeguro.getTipo());

            seguro.setPrecio(newSeguro.getPrecio());

            seguro.setAseguradora(newSeguro.getAseguradora());

            seguro.setDescripcion(newSeguro.getDescripcion());

            seguro.setPeriodicidad(newSeguro.getPeriodicidad());

            seguroRepository.save(seguro);

            return ResponseEntity.ok().body(seguro);

        }).orElse(new ResponseEntity<Seguro>(HttpStatus.NOT_FOUND));

    }

    @DeleteMapping("/seguros/{id}")

    ResponseEntity<Seguro> deleteSeguro(@PathVariable Integer id) {

        seguroRepository.deleteById(id);

        return ResponseEntity.ok().body(null);

    }


    @GetMapping("/clientes")
    List<Cliente> readAllCliente() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    ResponseEntity<Cliente> createCliente (@RequestBody Cliente newCliente) throws URISyntaxException {
        Cliente result = clienteRepository.save(newCliente);
        return ResponseEntity.created(new URI("/clientes/" + result.getNombre() + result.getApellidos())).body(result);
    }

    @GetMapping("/clientes/{id}")
    ResponseEntity<Cliente>readClientes(@PathVariable Integer id) {
        return clienteRepository.findById(id).map(cliente->
        ResponseEntity.ok().body(cliente)
        ).orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/clientes/{id}")
    ResponseEntity<Cliente>updateCliente(@RequestBody Cliente newCliente, @PathVariable Integer id) {
        return clienteRepository.findById(id).map(cliente->{
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
            /* TODO */
            clienteRepository.save(cliente);
            return ResponseEntity.ok().body(cliente);
        }).orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("clientes/{id}")
    ResponseEntity<Cliente> deleteCliente(@PathVariable Integer id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }


}