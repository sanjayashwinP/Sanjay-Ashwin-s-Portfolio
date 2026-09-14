package com.sanjay.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String category; // Languages, Frontend, Backend, Database, Tools, Cloud, Concepts

    @Column(name = "proficiency_level", length = 50)
    private String proficiencyLevel = "Proficient";

    @Column(name = "display_order")
    private Integer displayOrder = 0;

    public Skill() {
    }

    public Skill(String name, String category, String proficiencyLevel, Integer displayOrder) {
        this.name = name;
        this.category = category;
        this.proficiencyLevel = proficiencyLevel;
        this.displayOrder = displayOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProficiencyLevel() {
        return proficiencyLevel;
    }

    public void setProficiencyLevel(String proficiencyLevel) {
        this.proficiencyLevel = proficiencyLevel;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
