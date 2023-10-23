package lt.kvk.i16.itadmin.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Office {

	@Id
	@GeneratedValue
	private long id;

	private String name;
	private String number;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "office")
	private List<Computer> computers;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "office")
	private List<Equipment> equipment;

	public Office() {

	}

	public Office(String name, String number) {
		this.name = name;
		this.number = number;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	@Override
	public String toString() {
		return "Office [id=" + id + ", name=" + name + ", number=" + number + "]";
	}
}