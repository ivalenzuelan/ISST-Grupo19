package es.upm.dit.isst.seguroapi.repository;

import java.util.List;

// import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.seguroapi.model.Poliza;

public interface PolizaRepository extends CrudRepository<Poliza, Integer> {

    List<Poliza> findByClienteId(Integer id);

}