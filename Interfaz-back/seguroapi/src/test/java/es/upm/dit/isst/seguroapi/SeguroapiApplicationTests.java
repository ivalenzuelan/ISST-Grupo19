package es.upm.dit.isst.seguroapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.time.LocalDate;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import es.upm.dit.isst.seguroapi.repository.*;
import es.upm.dit.isst.seguroapi.model.*;

@SpringBootTest
public class SeguroapiApplicationTests {

	@Autowired 
	private ClienteRepository clienteRepository;
	@Autowired 
	private SeguroRepository seguroRepository;
	@Autowired 
	private PolizaRepository polizaRepository;
	

	@Test
	final void testNewCliente(){
		Cliente cliente = new Cliente();
		cliente.setMail("mario@ejemplo.com");
		cliente.setIdFiscal("12345678X");
		cliente.setUsername("mariolopez");
		cliente.setNombre("Mario");
		cliente.setApellidos("López");
		cliente.setPassword("prueba1");
		cliente.setNacimiento(LocalDate.of(1990, 1, 1));
		cliente.setDireccion("Calle Mayor 1");
		cliente.setTelefono("+34 912 321 689");
		cliente.setCita(null); 

		clienteRepository.save(cliente);
		int IDCliente = cliente.getId();

		Optional<Cliente> cliente2 = clienteRepository.findById(IDCliente);
        assertEquals(cliente2.get().getMail(), "mario@ejemplo.com");
		assertEquals(cliente2.get().getIdFiscal(), "12345678X");
        assertEquals(cliente2.get().getNombre(), "Mario");
		assertEquals(cliente2.get().getApellidos(), "López");
		assertEquals(cliente2.get().getNacimiento(), LocalDate.of(1990, 1, 1));
		assertEquals(cliente2.get().getDireccion(), "Calle Mayor 1");
		assertEquals(cliente2.get().getTelefono(), "+34 912 321 689");

        cliente.setCita(LocalDate.of(2023, 5, 1));
        clienteRepository.save(cliente);
        cliente2 = clienteRepository.findById(IDCliente);
        assertNotEquals(cliente2.get().getCita(), LocalDate.of(1990, 1, 1));

        clienteRepository.delete(cliente);
        cliente2 = clienteRepository.findById(IDCliente);
        assertFalse(cliente2.isPresent());
	}

	@Test
	final void testNewSeguro(){
		Seguro seguro = new Seguro();
		seguro.setNombre("Seguro de Vida");
		seguro.setTipo("Vida");
		seguro.setDescripcion("Cubre fallecimiento por cualquier causa.");
		seguro.setPrecio(500.0);
		seguro.setPeriodicidad("Mensual");
		seguro.setAseguradora("AXA");
	
		seguroRepository.save(seguro);
		int IDSeguro = seguro.getId();
	
		Optional<Seguro> seguro2 = seguroRepository.findById(IDSeguro);
		assertEquals(seguro2.get().getNombre(), "Seguro de Vida");
		assertEquals(seguro2.get().getTipo(), "Vida");
		assertEquals(seguro2.get().getDescripcion(), "Cubre fallecimiento por cualquier causa.");
		assertEquals(seguro2.get().getPrecio(), 500.0);
		assertEquals(seguro2.get().getPeriodicidad(), "Mensual");
		assertEquals(seguro2.get().getAseguradora(), "AXA");
	
		seguro.setPrecio(550.0);
		seguroRepository.save(seguro);
		seguro2 = seguroRepository.findById(IDSeguro);
		assertNotEquals(seguro2.get().getPrecio(), 500.0);
	
		seguroRepository.delete(seguro);
		seguro2 = seguroRepository.findById(IDSeguro);
		assertFalse(seguro2.isPresent());
	
	}

	@Test
	final void testNewPoliza(){
		Cliente cliente = new Cliente();
		cliente.setMail("mario@ejemplo.com");
		cliente.setIdFiscal("12345678X");
		cliente.setUsername("mariolopez");
		cliente.setNombre("Mario");
		cliente.setApellidos("López");
		cliente.setPassword("prueba1");
		cliente.setNacimiento(LocalDate.of(1990, 1, 1));
		cliente.setDireccion("Calle Mayor 1");
		cliente.setTelefono("+34 912 321 689");
		cliente.setCita(null); 

		clienteRepository.save(cliente);

		Seguro seguro = new Seguro();
		seguro.setNombre("Seguro de hogar");
		seguro.setTipo("Hogar");
		seguro.setDescripcion("Seguro para la vivienda");
		seguro.setPrecio(250.0);
		seguro.setPeriodicidad("Mensual");
		seguro.setAseguradora("Fake");
		seguroRepository.save(seguro);

		Poliza poliza = new Poliza(cliente, seguro, LocalDate.of(2023, 5, 1), LocalDate.of(2024, 5, 1), 300, "anual");
		polizaRepository.save(poliza);
		int IDPoliza = poliza.getId();

		Optional<Poliza> poliza2 = polizaRepository.findById(IDPoliza);
		assertEquals(poliza2.get().getCliente().getNombre(), "Mario");
		assertEquals(poliza2.get().getSeguro().getNombre(), "Seguro de hogar");
		assertEquals(poliza2.get().getInicio(), LocalDate.of(2023, 5, 1));
		assertEquals(poliza2.get().getTermino(), LocalDate.of(2024, 5, 1));
		assertEquals(poliza2.get().getPrecio(), 300);
		assertEquals(poliza2.get().getPeriodicidad(), "anual");

		poliza.setPrecio(350);
		polizaRepository.save(poliza);
		poliza2 = polizaRepository.findById(IDPoliza);
		assertEquals(poliza2.get().getPrecio(), 350);

		polizaRepository.delete(poliza);
		poliza2 = polizaRepository.findById(IDPoliza);
		assertFalse(poliza2.isPresent());

		seguroRepository.delete(seguro);
		clienteRepository.delete(cliente);
	}
	

	}
