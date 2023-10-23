package lt.kvk.i16.itadmin.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Computer {
	@Id
	@GeneratedValue
	private Long id;

	private String cpu;
	private String ram;
	private String gpu;
	private String inventoryNumber;
	private String networkNumber;
	private String storage;
	private String operatingSystem;
	private String software;
	private String note;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "office_id", nullable = true)
	private Office office;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "computer")
	private List<Equipment> equipment;

	public Long getId() {
		return id;
	}

	public String getCpu() {
		return cpu;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getGpu() {
		return gpu;
	}

	public void setGpu(String gpu) {
		this.gpu = gpu;
	}

	public String getInventoryNumber() {
		return inventoryNumber;
	}

	public void setInventoryNumber(String inventoryNumber) {
		this.inventoryNumber = inventoryNumber;
	}

	public String getNetworkNumber() {
		return networkNumber;
	}

	public void setNetworkNumber(String networkNumber) {
		this.networkNumber = networkNumber;
	}

	public String getStorage() {
		return storage;
	}

	public void setStorage(String storage) {
		this.storage = storage;
	}

	public String getOperatingSystem() {
		return operatingSystem;
	}

	public void setOperatingSystem(String operatingSystem) {
		this.operatingSystem = operatingSystem;
	}

	public String getSoftware() {
		return software;
	}

	public void setSoftware(String software) {
		this.software = software;
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

	public Computer() {

	}
	
	public Computer(String cpu, String ram, String gpu, String inventoryNumber, String networkNumber, String storage,
			String operatingSystem, String software, String note) {
		super();
		this.cpu = cpu;
		this.ram = ram;
		this.gpu = gpu;
		this.inventoryNumber = inventoryNumber;
		this.networkNumber = networkNumber;
		this.storage = storage;
		this.operatingSystem = operatingSystem;
		this.software = software;
		this.note = note;
	}
	
}