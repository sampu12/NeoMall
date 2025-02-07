package com.programming.adminservice.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.programming.adminservice.model.Admin;
import com.programming.adminservice.service.AdminService;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        Admin admin = adminService.getAdminById(id);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/validateAdmin/{username}/{password}")
    public ResponseEntity<?> validateAdmin(@PathVariable String username, @PathVariable String password) {
        boolean isValid = adminService.validateAdmin(username, password);
        return isValid ? ResponseEntity.ok("{\"status\": \"success\"}") 
                       : ResponseEntity.status(401).body("{\"status\": \"failure\"}");
    }

    @PostMapping
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.createAdmin(admin);
        return (newAdmin != null) ? ResponseEntity.ok(newAdmin) : ResponseEntity.badRequest().body("Admin creation failed");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }
}
