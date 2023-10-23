package lt.kvk.i16.itadmin.repository;

import java.util.List;

import jakarta.transaction.Transactional;
import lt.kvk.i16.itadmin.model.Computer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ComputerRepository extends JpaRepository<Computer, Long> {
	List<Computer> findByOfficeId(Long officeId);
	
	@Transactional
	void deleteByOfficeId(long officeId);
	
	@Query("SELECT c FROM Computer c WHERE " +
	"c.cpu LIKE CONCAT('%',:query, '%')" +
	"OR c.ram LIKE CONCAT('%',:query, '%')" +
	"OR c.gpu LIKE CONCAT('%',:query, '%')" +
	"OR c.inventoryNumber LIKE CONCAT('%',:query, '%')" +
	"OR c.networkNumber LIKE CONCAT('%',:query, '%')" +
	"OR c.storage LIKE CONCAT('%',:query, '%')" +
	"OR c.operatingSystem LIKE CONCAT('%',:query, '%')" +
	"OR c.software LIKE CONCAT('%',:query, '%')" + 
	"OR c.note LIKE CONCAT('%',:query, '%')")
	List<Computer> searchComputers(String query);
}