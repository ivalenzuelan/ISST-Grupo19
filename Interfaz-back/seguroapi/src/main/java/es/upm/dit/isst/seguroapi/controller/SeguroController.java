package es.upm.dit.isst.seguroapi.controller;

import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.model.Poliza;
import es.upm.dit.isst.seguroapi.model.Seguro;
import es.upm.dit.isst.seguroapi.repository.ClienteRepository;
import es.upm.dit.isst.seguroapi.repository.PolizaRepository;
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
@CrossOrigin
public class SeguroController {

    private final SeguroRepository seguroRepository;
    private final ClienteRepository clienteRepository;
    private final PolizaRepository polizaRepository;

    public static final Logger log = LoggerFactory.getLogger(SeguroController.class);

    public SeguroController(SeguroRepository s, ClienteRepository c, PolizaRepository p) {

        this.seguroRepository = s;
        this.clienteRepository = c;
        this.polizaRepository = p;

    }


    // SEGUROS //

    @GetMapping("/seguros") //ok
    List<Seguro> readAllSeguro() {
        return (List<Seguro>) seguroRepository.findAll();

    }

    @PostMapping("/seguros") //ok
    ResponseEntity<Seguro> createSeguro(@RequestBody Seguro newSeguro) throws URISyntaxException {

        Seguro result = seguroRepository.save(newSeguro);

        return ResponseEntity.created(new URI("/seguros/" + result.getId())).body(result);

    }

    @GetMapping("/seguros/tipo/{tipo}") //ok
    List<Seguro> readSeguroTipo(@PathVariable String tipo) {
        return (List<Seguro>) seguroRepository.findByTipo(tipo);
    }

    @GetMapping("/seguros/{id}") //ok
    ResponseEntity<Seguro> readSeguro(@PathVariable Integer id) {
        return seguroRepository.findById(id).map(tfg ->
        ResponseEntity.ok().body(tfg)
        ).orElse(new ResponseEntity<Seguro>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/seguros/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo aunque no se hayan cambiado todos los campos, sino error 500
    // esto responde con el json actualizado en el body
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

    @DeleteMapping("/seguros/{id}") // ok, elimina la fila de la base de datos

    ResponseEntity<Seguro> deleteSeguro(@PathVariable Integer id) {

        seguroRepository.deleteById(id);

        return ResponseEntity.ok().body(null);

    }


    // CLIENTES //

    @GetMapping("/clientes")
    List<Cliente> readAllCliente() {
        return (List<Cliente>) clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    ResponseEntity<Cliente> createCliente(@RequestBody Cliente newCliente) throws URISyntaxException {
        Cliente result = clienteRepository.save(newCliente);
        return ResponseEntity.created(new URI("/clientes/" + result.getNombre() + result.getApellidos())).body(result);

    }

    
      @GetMapping("/clientes/{id}")
      ResponseEntity<Cliente>readClientes(@PathVariable Integer id) {
      return clienteRepository.findById(id).map(cliente->
      ResponseEntity.ok().body(cliente)
      ).orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
     }
     

    @PutMapping("/clientes/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo aunque no se hayan cambiado todos los campos, sino error 500
    // esto responde con el json actualizado en el body
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

            clienteRepository.save(cliente);
            return ResponseEntity.ok().body(cliente);
        }).orElse(new ResponseEntity<Cliente>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("clientes/{id}")
    ResponseEntity<Cliente> deleteCliente(@PathVariable Integer id) {
        clienteRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }


    // POLIZAS //
    
    @GetMapping("/polizas")
    List<Poliza> readAllPoliza() {
        return (List<Poliza>) polizaRepository.findAll();

    }

    @PostMapping("/polizas") //ok, esto es para añadirle un seguro a un cliente
    ResponseEntity<Poliza> createPoliza(@RequestBody Poliza newPoliza) throws URISyntaxException {
        
        // Si el corredor no indica una periodicidad o un precio, se pone por defecto los datos del seguro
        if (newPoliza.getPeriodicidad() == null || newPoliza.getPrecio() == 0) {
            newPoliza.setPeriodicidad(newPoliza.getSeguro().getPeriodicidad());
            newPoliza.setPrecio(newPoliza.getSeguro().getPrecio());
        }

        Poliza result = polizaRepository.save(newPoliza);

        return ResponseEntity.created(new URI("/polizas/" + result.getId())).body(result);

    }

    @DeleteMapping("polizas/{id}") //ok, esto es para quitarle una seguro a un cliente
    ResponseEntity<Cliente> deletePoliza(@PathVariable Integer id) {
        polizaRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }

    // Para que el corredor pueda cambiar los datos de la poliza de un cliente
    @PutMapping("/polizas/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo aunque no se hayan cambiado todos los campos, sino error 500
    // esto responde con el json actualizado en el body
    ResponseEntity<Poliza>updatePoliza(@RequestBody Poliza newPoliza, @PathVariable Integer id) {
        return polizaRepository.findById(id).map(poliza->{
            poliza.setId(newPoliza.getId());
            poliza.setCliente(newPoliza.getCliente());
            poliza.setSeguro(newPoliza.getSeguro());
            poliza.setInicio(newPoliza.getInicio());
            poliza.setTermino(newPoliza.getTermino());
            poliza.setPrecio(newPoliza.getPrecio());
            poliza.setPeriodicidad(newPoliza.getPeriodicidad());
            poliza.setPdf_poliza(newPoliza.getPdf_poliza());
            
            polizaRepository.save(poliza);
            return ResponseEntity.ok().body(poliza);
        }).orElse(new ResponseEntity<Poliza>(HttpStatus.NOT_FOUND));
    }

}