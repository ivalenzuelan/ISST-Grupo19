package es.upm.dit.isst.seguroapi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import es.upm.dit.isst.seguroapi.model.Seguro;

public interface SeguroRepository extends CrudRepository<Seguro, Integer> {
    Optional<Seguro> findById(Integer id);

    List<Seguro> findByAseguradora(String aseguradora);

    List<Seguro> findByNombre(String nombre);

    List<Seguro> findByTipo(String tipo);

}
