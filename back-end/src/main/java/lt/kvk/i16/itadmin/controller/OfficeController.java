package lt.kvk.i16.itadmin.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.i16.itadmin.exception.ResourceNotFoundException;
import lt.kvk.i16.itadmin.model.Computer;
import lt.kvk.i16.itadmin.model.Equipment;
import lt.kvk.i16.itadmin.model.Office;
import lt.kvk.i16.itadmin.repository.ComputerRepository;
import lt.kvk.i16.itadmin.repository.EquipmentRepository;
import lt.kvk.i16.itadmin.repository.OfficeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class OfficeController {

	@Autowired
	private OfficeRepository officeRepository;
	
	@Autowired
	private ComputerRepository computerRepository;
	
	@Autowired
	private EquipmentRepository equipmentRepository;

	@GetMapping("/offices")
	public ResponseEntity<List<Office>> getAllOffices(@RequestParam(required = false) String name) {
		List<Office> offices = new ArrayList<Office>();

		if (name == null)
			officeRepository.findAll().forEach(offices::add);
		else
			officeRepository.findByNameContaining(name).forEach(offices::add);

		if (offices.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(offices, HttpStatus.OK);
	}

	@GetMapping("/offices/{id}")
	public ResponseEntity<Office> getOfficeById(@PathVariable("id") long id) {
		Office office = officeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found office with id = " + id));

		return new ResponseEntity<>(office, HttpStatus.OK);
	}
	
	@GetMapping("/offices/search")
	public List<Office> searchOffices(String query) {
		List<Office> offices = officeRepository.searchOffices(query);
		return offices;
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/offices")
	public ResponseEntity<Office> createOffice(@RequestBody Office office) {
		Office _office = officeRepository.save(new Office(office.getName(), office.getNumber()));
		return new ResponseEntity<>(_office, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/offices/{id}")
	public ResponseEntity<Office> updateOffice(@PathVariable("id") long id, @RequestBody Office office) {
		Office _office = officeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found office with id = " + id));

		_office.setName(office.getName());
		_office.setNumber(office.getNumber());

		return new ResponseEntity<>(officeRepository.save(_office), HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/offices/{id}")
	public ResponseEntity<HttpStatus> deleteOffice(@PathVariable("id") long id) {
		List<Computer> computers = computerRepository.findByOfficeId(id);
		for (Computer computer : computers) {
			computer.setOffice(null);
		}
		
		List<Equipment> equipmentList = equipmentRepository.findByOfficeId(id);
		for (Equipment equipment : equipmentList) {
			equipment.setOffice(null);
		}
		
		officeRepository.deleteById(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
}