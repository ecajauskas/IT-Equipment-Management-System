package lt.kvk.i16.itadmin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.i16.itadmin.model.User;
import lt.kvk.i16.itadmin.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@PreAuthorize("hasAuthority('ADMIN')")
	@GetMapping("/users")
	List<User> getAllUser() {
		return userRepository.findAll();
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/user/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
		userRepository.deleteById(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
