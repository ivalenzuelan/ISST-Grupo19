package es.upm.dit.isst.seguroapi.repository;

// import java.util.List;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import es.upm.dit.isst.seguroapi.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    // List<Cliente> findByNombre(String nombre);

    List<Cliente> findAllByOrderByNombreAscApellidosAsc();

    List<Cliente> findByCitaNotNullOrderByCita();

}