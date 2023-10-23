package lt.kvk.i16.itadmin.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.i16.itadmin.exception.ResourceNotFoundException;
import lt.kvk.i16.itadmin.model.Computer;
import lt.kvk.i16.itadmin.model.Equipment;
import lt.kvk.i16.itadmin.repository.ComputerRepository;
import lt.kvk.i16.itadmin.repository.EquipmentRepository;
import lt.kvk.i16.itadmin.repository.OfficeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class ComputerController {

	@Autowired
	private OfficeRepository officeRepository;

	@Autowired
	private ComputerRepository computerRepository;
	
	@Autowired
	private EquipmentRepository equipmentRepository;

	@GetMapping("/offices/{officeId}/computers")
	public ResponseEntity<List<Computer>> getAllComputersByOfficeId(@PathVariable(value = "officeId") Long officeId) {
		if (!officeRepository.existsById(officeId)) {
			throw new ResourceNotFoundException("Not found office with id = " + officeId);
		}

		List<Computer> computers = computerRepository.findByOfficeId(officeId);
		return new ResponseEntity<>(computers, HttpStatus.OK);
	}

	@GetMapping("/computers")
	public List<Computer> getAllComputer() {
		return computerRepository.findAll(Sort.by(Sort.Direction.ASC, "office.number"));
	}

	@GetMapping("/computers/{id}")
	public ResponseEntity<Computer> getComputersByOfficeId(@PathVariable(value = "id") Long id) {
		Computer computer = computerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found computer with id = " + id));

		return new ResponseEntity<>(computer, HttpStatus.OK);
	}

	@GetMapping("/computers/search")
	public List<Computer> searchComputers(String query) {
		List<Computer> computers = computerRepository.searchComputers(query);
		return computers;
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/offices/{officeId}/computers")
	public ResponseEntity<Computer> createComputer(@PathVariable(value = "officeId") Long officeId,
			@RequestBody Computer computerRequest) {
		Computer computer = officeRepository.findById(officeId).map(office -> {
			computerRequest.setOffice(office);
			return computerRepository.save(computerRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Not found office with id = " + officeId));

		return new ResponseEntity<>(computer, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/computers")
	Computer newComputer(@RequestBody Computer newComputer) {
		return computerRepository.save(newComputer);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/computers/{id}")
	public ResponseEntity<Computer> updateComputer(@PathVariable("id") long id, @RequestBody Computer computerRequest) {
		Computer computer = computerRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ComputerId " + id + "not found"));

		computer.setCpu(computerRequest.getCpu());
		computer.setRam(computerRequest.getRam());
		computer.setGpu(computerRequest.getGpu());
		computer.setInventoryNumber(computerRequest.getInventoryNumber());
		computer.setNetworkNumber(computerRequest.getNetworkNumber());
		computer.setStorage(computerRequest.getStorage());
		computer.setOperatingSystem(computerRequest.getOperatingSystem());
		computer.setSoftware(computerRequest.getSoftware());
		computer.setOffice(computerRequest.getOffice());
		computer.setNote(computerRequest.getNote());

		return new ResponseEntity<>(computerRepository.save(computer), HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/computers/{id}")
	public ResponseEntity<HttpStatus> deleteComputer(@PathVariable("id") long id) {
		List<Equipment> equipmentList = equipmentRepository.findByComputerId(id);
		for (Equipment equipment : equipmentList) {
			equipment.setComputer(null);
		}
		
		computerRepository.deleteById(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
