package es.upm.dit.isst.seguroapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// import java.util.List;

import es.upm.dit.isst.seguroapi.model.Poliza;

public interface PolizaRepository extends JpaRepository<Poliza, Integer> {

    List<Poliza> findByClienteId(Integer id);

    List<Poliza> findByAnularOrderByTermino(Boolean bool);

    List<Poliza> findByRenovarOrderByTermino(Boolean bool);

    List<Poliza> findByAnularFalseAndRenovarFalseOrderByTermino();

}