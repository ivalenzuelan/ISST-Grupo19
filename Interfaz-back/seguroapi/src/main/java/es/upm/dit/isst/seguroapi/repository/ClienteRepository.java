package es.upm.dit.isst.seguroapi.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.seguroapi.model.Cliente;

public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

    List<Cliente> findByCitaNotNullOrderByCita();

}