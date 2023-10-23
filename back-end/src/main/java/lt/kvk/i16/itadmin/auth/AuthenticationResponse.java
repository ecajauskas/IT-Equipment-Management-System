package lt.kvk.i16.itadmin.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Data
@Builder
@AllArgsConstructor
@NonNull
public class AuthenticationResponse {
	private String token;
}
