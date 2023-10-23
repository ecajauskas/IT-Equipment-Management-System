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
import lt.kvk.i16.itadmin.model.Equipment;
import lt.kvk.i16.itadmin.repository.ComputerRepository;
import lt.kvk.i16.itadmin.repository.EquipmentRepository;
import lt.kvk.i16.itadmin.repository.OfficeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class EquipmentController {

	@Autowired
	private OfficeRepository officeRepository;

	@Autowired
	private EquipmentRepository equipmentRepository;

	@Autowired
	private ComputerRepository computerRepository;

	@GetMapping("/offices/{officeId}/equipment")
	public ResponseEntity<List<Equipment>> getAllEquipmentsByOfficeId(@PathVariable(value = "officeId") Long officeId) {
		if (!officeRepository.existsById(officeId)) {
			throw new ResourceNotFoundException("Not found office with id = " + officeId);
		}

		List<Equipment> equipment = equipmentRepository.findByOfficeId(officeId);
		return new ResponseEntity<>(equipment, HttpStatus.OK);
	}

	@GetMapping("/computers/{computerId}/equipment")
	public ResponseEntity<List<Equipment>> getAllEquipmentsByComputerId(
			@PathVariable(value = "computerId") Long computerId) {
		if (!computerRepository.existsById(computerId)) {
			throw new ResourceNotFoundException("Not found computer with id = " + computerId);
		}

		List<Equipment> equipment = equipmentRepository.findByComputerId(computerId);
		return new ResponseEntity<>(equipment, HttpStatus.OK);
	}

	@GetMapping("/equipment")
	public List<Equipment> getAllEquipment() {
		return equipmentRepository.findAll(Sort.by(Sort.Direction.ASC, "office.number"));
	}

	@GetMapping("/equipment/{id}")
	public ResponseEntity<Equipment> getEquipmentsByOfficeId(@PathVariable(value = "id") Long id) {
		Equipment equipment = equipmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Not found equipment with id = " + id));

		return new ResponseEntity<>(equipment, HttpStatus.OK);
	}
	
	@GetMapping("/equipment/search")
	public List<Equipment> searchEquipment(String query) {
		List<Equipment> equipment = equipmentRepository.searchEquipment(query);
		return equipment;
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/offices/{officeId}/equipment")
	public ResponseEntity<Equipment> createEquipment(@PathVariable(value = "officeId") Long officeId,
			@RequestBody Equipment equipmentRequest) {
		Equipment equipment = officeRepository.findById(officeId).map(office -> {
			equipmentRequest.setOffice(office);
			return equipmentRepository.save(equipmentRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Not found office with id = " + officeId));

		return new ResponseEntity<>(equipment, HttpStatus.CREATED);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/computers/{computerId}/equipment")
	public ResponseEntity<Equipment> createEquipmentForComputer(@PathVariable(value = "computerId") Long computerId,
			@RequestBody Equipment equipmentRequest) {
		Equipment equipment = computerRepository.findById(computerId).map(computer -> {
			equipmentRequest.setComputer(computer);
			return equipmentRepository.save(equipmentRequest);
		}).orElseThrow(() -> new ResourceNotFoundException("Not found office with id = " + computerId));

		return new ResponseEntity<>(equipment, HttpStatus.CREATED);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/equipment")
	public Equipment newEquipment(@RequestBody Equipment newEquipment) {
		return equipmentRepository.save(newEquipment);
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PutMapping("/equipment/{id}")
	public ResponseEntity<Equipment> updateEquipment(@PathVariable("id") long id,
			@RequestBody Equipment equipmentRequest) {
		Equipment equipment = equipmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("EquipmentId " + id + "not found"));

		equipment.setCategory(equipmentRequest.getCategory());
		equipment.setName(equipmentRequest.getName());
		equipment.setDescription(equipmentRequest.getDescription());
		equipment.setInventoryNumber(equipmentRequest.getInventoryNumber());
		equipment.setNote(equipmentRequest.getNote());
		equipment.setOffice(equipmentRequest.getOffice());
		equipment.setComputer(equipmentRequest.getComputer());
		return new ResponseEntity<>(equipmentRepository.save(equipment), HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/equipment/{id}")
	public ResponseEntity<HttpStatus> deleteEquipment(@PathVariable("id") long id) {
		equipmentRepository.deleteById(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
