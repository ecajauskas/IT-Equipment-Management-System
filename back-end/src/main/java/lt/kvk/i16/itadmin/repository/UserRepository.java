package lt.kvk.i16.itadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.kvk.i16.itadmin.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

}
