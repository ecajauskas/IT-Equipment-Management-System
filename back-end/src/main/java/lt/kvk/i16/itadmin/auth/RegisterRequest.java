package lt.kvk.i16.itadmin.auth;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
	private String firstname;
	private String lastname;
	
	@Column(length = 40, unique = true)
	private String email;
	private String password;
}
