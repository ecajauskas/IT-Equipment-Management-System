package lt.kvk.i16.itadmin.controller;

import lombok.RequiredArgsConstructor;
import lt.kvk.i16.itadmin.auth.AuthenticationRequest;
import lt.kvk.i16.itadmin.auth.AuthenticationResponse;
import lt.kvk.i16.itadmin.auth.AuthenticationService;
import lt.kvk.i16.itadmin.auth.RegisterRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

	private final AuthenticationService service;

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(service.authenticate(request));
	}

}
