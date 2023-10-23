package lt.kvk.i16.itadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jakarta.transaction.Transactional;
import lt.kvk.i16.itadmin.model.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
	List<Equipment> findByOfficeId(Long officeId);
	List<Equipment> findByComputerId(Long computerId);
	
	@Transactional
	void deleteByOfficeId(long officeId);
	
	@Query("SELECT e FROM Equipment e WHERE " +
	"e.category LIKE CONCAT('%',:query, '%')" +
	"OR e.name LIKE CONCAT('%',:query, '%')" +
	"OR e.description LIKE CONCAT('%',:query, '%')" +
	"OR e.inventoryNumber LIKE CONCAT('%',:query, '%')" +
	"OR e.note LIKE CONCAT('%',:query, '%')")
	List<Equipment> searchEquipment(String query);
}
