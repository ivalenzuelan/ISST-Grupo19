package es.upm.dit.isst.seguroapi.controller;

import org.springframework.web.bind.annotation.RestController;

import es.upm.dit.isst.seguroapi.model.Seguro;
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

import org.owasp.esapi.ESAPI;
import org.owasp.esapi.errors.ValidationException;

@RestController
@CrossOrigin
public class SeguroController {

    private final SeguroRepository seguroRepository;

    public static final Logger log = LoggerFactory.getLogger(SeguroController.class);

    public SeguroController(SeguroRepository s) {

        this.seguroRepository = s;

    }

    // SEGUROS //

    @GetMapping("/seguros") // ok
    List<Seguro> readAllSeguro() {
        return (List<Seguro>) seguroRepository.findAll();

    }

    @PostMapping("/seguros")
    ResponseEntity<Seguro> createSeguro(@RequestBody Seguro newSeguro) throws URISyntaxException, ValidationException {
        // Sanitize user input using ESAPI
        String safeNombre = ESAPI.validator().getValidInput("createSeguro", newSeguro.getNombre(), "SafeString", 255, false);
        String safeTipo = ESAPI.validator().getValidInput("createSeguro", newSeguro.getTipo(), "SafeString", 255, false);
        String safeAseguradora = ESAPI.validator().getValidInput("createSeguro", newSeguro.getAseguradora(), "SafeString", 255, false);
        String safeDescripcion = ESAPI.validator().getValidInput("createSeguro", newSeguro.getDescripcion(), "SafeString", 255, false);
        String safePeriodicidad = ESAPI.validator().getValidInput("createSeguro", newSeguro.getPeriodicidad(), "SafeString", 255, false);
    
        // Create new Seguro object with sanitized input
        Seguro result = new Seguro();
        result.setNombre(safeNombre);
        result.setTipo(safeTipo);
        result.setPrecio(newSeguro.getPrecio());
        result.setAseguradora(safeAseguradora);
        result.setDescripcion(safeDescripcion);
        result.setPeriodicidad(safePeriodicidad);
    
        // Save the new Seguro object to the repository
        result = seguroRepository.save(result);
    
        return ResponseEntity.created(new URI("/seguros/" + result.getId())).body(result);
    }

    @GetMapping("/seguros/tipo/{tipo}") // ok
    List<Seguro> readSeguroTipo(@PathVariable String tipo) {
        return (List<Seguro>) seguroRepository.findByTipo(tipo);
    }

    @GetMapping("/seguros/{id}") // ok
    ResponseEntity<Seguro> readSeguro(@PathVariable Integer id) {
        return seguroRepository.findById(id).map(tfg -> ResponseEntity.ok().body(tfg))
                .orElse(new ResponseEntity<Seguro>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/seguros/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo
                                 // aunque no se hayan cambiado todos los campos, sino error 500
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

}