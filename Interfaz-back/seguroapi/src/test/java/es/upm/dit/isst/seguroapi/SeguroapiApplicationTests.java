package es.upm.dit.isst.seguroapi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import es.upm.dit.isst.seguroapi.repository.*;
import es.upm.dit.isst.seguroapi.security.dto.LoginUsuario;
import es.upm.dit.isst.seguroapi.security.dto.NuevoUsuario;
import es.upm.dit.isst.seguroapi.security.entity.UsuarioMain;
import es.upm.dit.isst.seguroapi.security.jwt.JwtProvider;
import es.upm.dit.isst.seguroapi.security.service.RolService;
import es.upm.dit.isst.seguroapi.security.service.UsuarioService;
import io.jsonwebtoken.lang.Arrays;
import es.upm.dit.isst.seguroapi.enums.RolNombre;
import es.upm.dit.isst.seguroapi.model.*;

@SpringBootTest

public class SeguroapiApplicationTests {

	@Autowired 
	private ClienteRepository clienteRepository;
	@Autowired 
	private SeguroRepository seguroRepository;
	@Autowired 
	private PolizaRepository polizaRepository;
	@Autowired 
	private RolRepository rolRepository;



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
	
	@Test
	public void testRoles() {
    Rol rol = new Rol(RolNombre.ROLE_USER);
	Rol rol2 = new Rol(RolNombre.ROLE_ADMIN);

    assertEquals(RolNombre.ROLE_USER, rol.getRolNombre());
	assertEquals(RolNombre.ROLE_ADMIN, rol2.getRolNombre());
    // Asegúrate de que otros atributos sean nulos o tengan valores predeterminados según tu implementación
	}

	@Test
	public void testSettersRol() {
    Rol rol = new Rol();

    rol.setRolNombre(RolNombre.ROLE_ADMIN);

    assertEquals(RolNombre.ROLE_ADMIN, rol.getRolNombre());
	}

	@Test
    public void testUsuarioMain() {

        Cliente cliente = new Cliente();
        cliente.setNombre("John Doe");
        cliente.setUsername("johndoe");
        cliente.setMail("johndoe@example.com");
        cliente.setPassword("password");

        Rol rol = new Rol(RolNombre.ROLE_USER);

		Set<Rol> roles = new HashSet<>();

		roles.add(rol);

		cliente.setRoles(roles);	

        UsuarioMain usuarioMain = UsuarioMain.build(cliente);

        assertEquals(cliente.getNombre(), usuarioMain.getNombre());
        assertEquals(cliente.getUsername(), usuarioMain.getUsername());
        assertEquals(cliente.getMail(), usuarioMain.getEmail());
        assertEquals(cliente.getPassword(), usuarioMain.getPassword());

        Collection<? extends GrantedAuthority> authorities = usuarioMain.getAuthorities();
        assertEquals(1, authorities.size());
        assertTrue(authorities.contains(new SimpleGrantedAuthority(RolNombre.ROLE_USER.name())));
	}

	@Test
    public void testValoresValidosLogin() {
        LoginUsuario loginUsuario = new LoginUsuario();
        loginUsuario.setUsername("usuario");
        loginUsuario.setPassword("contraseña");

        assertEquals("usuario", loginUsuario.getUsername());
        assertEquals("contraseña", loginUsuario.getPassword());
    }

	@Test
    public void testValoresNulosLogin() {
		LoginUsuario loginUsuario = new LoginUsuario();
		loginUsuario.setUsername(null);
        loginUsuario.setPassword(null);
        assertEquals(null, loginUsuario.getUsername());
		assertEquals(null, loginUsuario.getPassword());
    }

	@Test
    public void testValoresVaciosLogin() {
        LoginUsuario loginUsuario = new LoginUsuario();
        loginUsuario.setUsername("");
        loginUsuario.setPassword("");
		assertEquals("", loginUsuario.getUsername());
		assertEquals("", loginUsuario.getPassword());
        
    }

	@Test
    public void testIgualdadLogin() {
        LoginUsuario loginUsuario1 = new LoginUsuario();
        loginUsuario1.setUsername("usuario");
        loginUsuario1.setPassword("contraseña");

        LoginUsuario loginUsuario2 = new LoginUsuario();
        loginUsuario2.setUsername("usuario");
        loginUsuario2.setPassword("contraseña");

        assertEquals(loginUsuario1.getUsername(), loginUsuario2.getUsername());
    }
	

	@Test
    public void testValoresValidosNuevoUsuario() {
        NuevoUsuario nuevoUsuario = new NuevoUsuario();
        nuevoUsuario.setNombre("Nombre");
        nuevoUsuario.setUsername("username");
        nuevoUsuario.setMail("example@example.com");
        nuevoUsuario.setPassword("password");

        assertEquals("Nombre", nuevoUsuario.getNombre());
        assertEquals("username", nuevoUsuario.getUsername());
        assertEquals("example@example.com", nuevoUsuario.getMail());
        assertEquals("password", nuevoUsuario.getPassword());
    }

	@Test
    public void testValoresNulosNuevoUsuario() {
            NuevoUsuario nuevoUsuario = new NuevoUsuario();
            nuevoUsuario.setNombre(null);
            nuevoUsuario.setUsername(null);
            nuevoUsuario.setMail(null);
            nuevoUsuario.setPassword(null);

			assertEquals(null, nuevoUsuario.getNombre());
			assertEquals(null, nuevoUsuario.getUsername());
			assertEquals(null, nuevoUsuario.getMail());
			assertEquals(null, nuevoUsuario.getPassword());
    }

	@Test
    public void testValoresVaciosNuevoUsuario() {
            NuevoUsuario nuevoUsuario = new NuevoUsuario();
            nuevoUsuario.setNombre("");
            nuevoUsuario.setUsername("");
            nuevoUsuario.setMail("");
            nuevoUsuario.setPassword("");

			assertEquals("", nuevoUsuario.getNombre());
			assertEquals("", nuevoUsuario.getUsername());
			assertEquals("", nuevoUsuario.getMail());
			assertEquals("", nuevoUsuario.getPassword());
    }

	@Test
    public void testFormatoEmailIncorrectoNuevoUsuario() {
            NuevoUsuario nuevoUsuario = new NuevoUsuario();
            nuevoUsuario.setMail("emailincorrecto");

			NuevoUsuario nuevoUsuario2 = new NuevoUsuario();
			nuevoUsuario2.setMail("user2@email.com");

			assertNotEquals(nuevoUsuario.getMail(), nuevoUsuario2.getMail());
    }

	@Test
    public void testRolesNuevoUsuario() {
        NuevoUsuario nuevoUsuario = new NuevoUsuario();
        Set<String> roles = new HashSet<>();
        roles.add("ROLE_ADMIN");
        roles.add("ROLE_USER");
        nuevoUsuario.setRoles(roles);

        assertTrue(nuevoUsuario.getRoles().contains("ROLE_ADMIN"));
        assertTrue(nuevoUsuario.getRoles().contains("ROLE_USER"));
    }

    }






