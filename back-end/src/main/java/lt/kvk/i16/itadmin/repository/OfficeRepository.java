package lt.kvk.i16.itadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import lt.kvk.i16.itadmin.model.Office;

public interface OfficeRepository extends JpaRepository<Office, Long> {
	List<Office> findByNameContaining(String name);
	
	@Query("SELECT o FROM Office o WHERE " +
	"o.name LIKE CONCAT('%',:query, '%')" +
	"OR o.number LIKE CONCAT('%',:query, '%')")
	List<Office> searchOffices(String query);
}