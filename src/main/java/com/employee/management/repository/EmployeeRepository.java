package com.employee.management.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.management.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	List<Employee> findByNameContainingIgnoreCase(String name);
	
	

}
