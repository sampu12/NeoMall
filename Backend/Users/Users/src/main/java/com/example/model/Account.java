package com.example.model;

import jakarta.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;

import com.example.enums.AccountStatus;
import com.example.enums.AccountType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Account {
    @Id
    private int accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType type;

    private Date registrationDate;
    private Timestamp lastLogin;

    @Enumerated(EnumType.STRING)
    private AccountStatus status;

    private boolean emailVerified;
    private boolean phoneVerified;

    @JsonIgnore
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Users user;

    // Getters and Setters
    public int getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(int accountNumber) {
        this.accountNumber = accountNumber;
    }

    public AccountType getType() {
        return type;
    }

    public void setType(AccountType type) {
        this.type = type;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public Timestamp getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(Timestamp lastLogin) {
        this.lastLogin = lastLogin;
    }

    public AccountStatus getStatus() {
        return status;
    }

    public void setStatus(AccountStatus status) {
        this.status = status;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public boolean isPhoneVerified() {
        return phoneVerified;
    }

    public void setPhoneVerified(boolean phoneVerified) {
        this.phoneVerified = phoneVerified;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}