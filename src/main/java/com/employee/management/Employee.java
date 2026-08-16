package com.employee.management;
import jakarta.persistence.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Employee {
	 @Id
	 @SequenceGenerator(
			    name = "employee_seq",
			    sequenceName = "employee_seq",
			    allocationSize = 1
			)
			@GeneratedValue(
			    strategy = GenerationType.SEQUENCE,
			    generator = "employee_seq"
			)
			private Long id;

	    private String name;
	    private String email;
	    @Column(name="PHONE")
	    private String phone;
	    private String department;
	    private double salary;

	    public Employee() {
	    }

	    public Employee(String name, String email, String phone,
	                    String department, double salary) {
	        this.name = name;
	        this.email = email;
	        this.phone = phone;
	        this.department = department;
	        this.salary = salary;
	    }

	    public Long getId() {
	        return id;
	    }

	    public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }

	    public String getEmail() {
	        return email;
	    }

	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public String getPhone() {
	    	
	        return phone;
	    }

	    public void setPhone(String phone) {
	        this.phone = phone;
	    }

	    public String getDepartment() {
	        return department;
	    }

	    public void setDepartment(String department) {
	        this.department = department;
	    }

	    public double getSalary() {
	        return salary;
	    }

	    public void setSalary(double salary) {
	        this.salary = salary;
	    }
	}



