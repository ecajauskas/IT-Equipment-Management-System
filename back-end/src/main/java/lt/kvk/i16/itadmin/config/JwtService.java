package lt.kvk.i16.itadmin.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

	private static final String SECRET_KEY = "576D5A7133743677397A24432646294A404E635266556A586E32723575377821";

	public String extractUsername(String jwt) {
		return extractClaim(jwt, Claims::getSubject);

	}

	public <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(jwt);
		return claimsResolver.apply(claims);
	}

	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		return Jwts.builder().setClaims(extraClaims).setSubject(userDetails.getUsername())
				.claim("authorities", userDetails.getAuthorities()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}

	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}

	private Claims extractAllClaims(String jwt) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(jwt).getBody();
	}

	private Key getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public boolean isTokenValid(String jwt, UserDetails userDetails) {

		final String userEmail = extractUsername(jwt);
		return (userEmail.equals(userDetails.getUsername()) && !isTokenExpired(jwt));

	}

	private boolean isTokenExpired(String jwt) {

		return extractExpiration(jwt).before(new Date());

	}

	private Date extractExpiration(String jwt) {

		return extractClaim(jwt, Claims::getExpiration);
	}

}
