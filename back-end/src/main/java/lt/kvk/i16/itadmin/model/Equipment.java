package lt.kvk.i16.itadmin.model;

import jakarta.persistence.*;

@Entity
public class Equipment {
	@Id
	@GeneratedValue
	private Long id;

	private String category;
	private String name;
	private String description;
	private String inventoryNumber;
	private String note;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "office_id")
	private Office office;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "computer_id")
	private Computer computer;

	public Long getId() {
		return id;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getInventoryNumber() {
		return inventoryNumber;
	}

	public void setInventoryNumber(String inventoryNumber) {
		this.inventoryNumber = inventoryNumber;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public Office getOffice() {
		return office;
	}

	public void setOffice(Office office) {
		this.office = office;
	}

	public Computer getComputer() {
		return computer;
	}

	public void setComputer(Computer computer) {
		this.computer = computer;
	}
	
	public Equipment() {

	}

	public Equipment(String category, String name, String description, String inventoryNumber, String note) {
		super();
		this.category = category;
		this.name = name;
		this.description = description;
		this.inventoryNumber = inventoryNumber;
		this.note = note;
	}

}