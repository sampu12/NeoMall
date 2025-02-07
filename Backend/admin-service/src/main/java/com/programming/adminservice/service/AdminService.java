package com.programming.adminservice.service;

import java.util.List;

import com.programming.adminservice.model.Admin;

public interface AdminService {
	public List<Admin> getAllAdmins();

    public Admin getAdminById(Long id);

    public Admin createAdmin(Admin admin);

    public void deleteAdmin(Long id);
    
    public boolean validateAdmin(String username, String password);
}
