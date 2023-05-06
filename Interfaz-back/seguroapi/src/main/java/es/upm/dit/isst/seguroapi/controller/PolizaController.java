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

import es.upm.dit.isst.seguroapi.model.Cliente;
import es.upm.dit.isst.seguroapi.model.Poliza;
import es.upm.dit.isst.seguroapi.repository.PolizaRepository;

@RestController
@CrossOrigin
public class PolizaController {

    private final PolizaRepository polizaRepository;

    public static final Logger log = LoggerFactory.getLogger(PolizaController.class);

    public PolizaController(PolizaRepository p) {
        
        this.polizaRepository = p;
    }

    // POLIZAS //
    /*ADMIN */
    @GetMapping("/polizas")
    List<Poliza> readAllPoliza() {
        return (List<Poliza>) polizaRepository.findAll();

    }
    /*ADMIN */
    @GetMapping("/polizas/renovar")
    List<Poliza> readPolizasRenovar() {
        return (List<Poliza>) polizaRepository.findByRenovarOrderByTermino(true);

    }
    /*ADMIN */
    @GetMapping("/polizas/anular")
    List<Poliza> readPolizasAnular() {
        return (List<Poliza>) polizaRepository.findByAnularOrderByTermino(true);

    }
    /*ADMIN */
    @GetMapping("/polizas/anularNoSolicitadas")
    List<Poliza> readPolizasAnularNo() {
        return (List<Poliza>) polizaRepository.findByAnularFalseAndRenovarFalseOrderByTermino();

    }

    /*Solo user con ese ID */
    @GetMapping("polizas/cliente/{id}")
    List<Poliza> findPolizasByCliente(@PathVariable Integer id) {
        return (List<Poliza>) polizaRepository.findByClienteId(id);
    }
    /*ADMIN */
    @PostMapping("/polizas") // ok, esto es para añadirle un seguro a un cliente
    ResponseEntity<Poliza> createPoliza(@RequestBody Poliza newPoliza) throws URISyntaxException {

        // Si el corredor no indica una periodicidad o un precio, se pone por defecto
        // los datos del seguro
        if (newPoliza.getPeriodicidad() == null || newPoliza.getPrecio() == 0) {
            newPoliza.setPeriodicidad(newPoliza.getSeguro().getPeriodicidad());
            newPoliza.setPrecio(newPoliza.getSeguro().getPrecio());
        }

        Poliza result = polizaRepository.save(newPoliza);

        return ResponseEntity.created(new URI("/polizas/" + result.getId())).body(result);

    }
    /*ADMIN */
    @DeleteMapping("polizas/{id}") // ok, esto es para quitarle una seguro a un cliente
    ResponseEntity<Cliente> deletePoliza(@PathVariable Integer id) {
        polizaRepository.deleteById(id);
        return ResponseEntity.ok().body(null);
    }
    /* User y admin */
    // Para que el corredor pueda cambiar los datos de la poliza de un cliente
    @PutMapping("/polizas/{id}") // ok, pero en el front hay que asegurarse de que se manda el objeto completo
                                 // aunque no se hayan cambiado todos los campos, sino error 500
    // esto responde con el json actualizado en el body
    ResponseEntity<Poliza> updatePoliza(@RequestBody Poliza newPoliza, @PathVariable Integer id) {
        return polizaRepository.findById(id).map(poliza -> {
            poliza.setId(newPoliza.getId());
            poliza.setCliente(newPoliza.getCliente());
            poliza.setSeguro(newPoliza.getSeguro());
            poliza.setInicio(newPoliza.getInicio());
            poliza.setTermino(newPoliza.getTermino());
            poliza.setPrecio(newPoliza.getPrecio());
            poliza.setPeriodicidad(newPoliza.getPeriodicidad());
            poliza.setAnular(newPoliza.getAnular());
            poliza.setRenovar(newPoliza.getRenovar());
            poliza.setPdf_poliza(newPoliza.getPdf_poliza());

            polizaRepository.save(poliza);
            return ResponseEntity.ok().body(poliza);
        }).orElse(new ResponseEntity<Poliza>(HttpStatus.NOT_FOUND));
    }

}