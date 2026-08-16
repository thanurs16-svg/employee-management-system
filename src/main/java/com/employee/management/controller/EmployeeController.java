package com.employee.management.controller;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;

import com.employee.management.Employee;
import com.employee.management.service.EmployeeService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/employees")
public class EmployeeController {
	 private final EmployeeService employeeService;

	    public EmployeeController(EmployeeService employeeService) {
	        this.employeeService = employeeService;
	    }

	    @PostMapping
	    public Employee addEmployee(@RequestBody Employee employee) {
	        return employeeService.addEmployee(employee);
	    }

	    @GetMapping
	    public List<Employee> getAllEmployees() {
	        return employeeService.getAllEmployees();
	    }

	    @GetMapping("/{id}")
	    public Employee getEmployeeById(@PathVariable Long id) {
	        return employeeService.getEmployeeById(id);
	    }

	    @DeleteMapping("/{id}")
	    public String deleteEmployee(@PathVariable Long id) {
	        employeeService.deleteEmployee(id);
	        return "Employee deleted successfully";
	    }
	    @PutMapping("/{id}")
	    public Employee updateEmployee(@PathVariable Long id,
	                                   @RequestBody Employee employee) {
	        return employeeService.updateEmployee(id, employee);
	    }
	    @GetMapping("/search")
	    public List<Employee> searchEmployees(@RequestParam String name) {
	        return employeeService.searchEmployees(name);
	    }
	}



