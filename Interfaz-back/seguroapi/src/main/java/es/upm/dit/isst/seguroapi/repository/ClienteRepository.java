package es.upm.dit.isst.seguroapi.repository;

// import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.seguroapi.model.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

    // List<Cliente> findByNombre(String nombre);

    // List<Cliente> findByApellidos(String apellidos);

}