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
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class SeguroController {

    private final SeguroRepository seguroRepository;

    public static final Logger log = LoggerFactory.getLogger(SeguroController.class);

    public SeguroController(SeguroRepository s) {

        this.seguroRepository = s;

    }

    @GetMapping("/seguros")
    List<Seguro> readAll() {
        return (List<Seguro>) seguroRepository.findAll();

    }

    @PostMapping("/seguros")

    ResponseEntity<Seguro> create(@RequestBody Seguro newSeguro) throws URISyntaxException {

        Seguro result = seguroRepository.save(newSeguro);

        return ResponseEntity.created(new URI("/seguros/" + result.getNombre())).body(result);

    }

    @GetMapping("/seguros/{tipo}")

    List<Seguro> read(@PathVariable String tipo) {

        return (List<Seguro>) seguroRepository.findByTipo(tipo);
    }

    /*
     * @GetMapping("/seguros/{id}")
     * 
     * ResponseEntity<Seguro> read(@PathVariable Integer id) {
     * 
     * return seguroRepository.findById(id).map(tfg ->
     * 
     * ResponseEntity.ok().body(tfg)
     * 
     * ).orElse(new ResponseEntity<Seguro>(HttpStatus.NOT_FOUND));
     * 
     * }
     */

    @PutMapping("/seguros/{id}")

    ResponseEntity<Seguro> update(@RequestBody Seguro newSeguro, @PathVariable Integer id) {

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

    ResponseEntity<Seguro> delete(@PathVariable Integer id) {

        seguroRepository.deleteById(id);

        return ResponseEntity.ok().body(null);

    }

}