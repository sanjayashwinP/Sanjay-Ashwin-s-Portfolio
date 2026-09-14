package com.sanjay.portfolio.repository;

import com.sanjay.portfolio.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findAllByOrderByCategoryAscDisplayOrderAsc();
    List<Skill> findByCategoryOrderByDisplayOrderAsc(String category);
}
