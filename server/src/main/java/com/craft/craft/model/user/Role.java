package com.craft.craft.model.user;

import com.craft.craft.model.BaseEntity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Role extends BaseEntity {
    @NonNull
    @Enumerated(EnumType.STRING)
    private RoleName name;
    @Transient
    @ManyToMany(mappedBy = "roles")
    private Set<BaseUser> users;
}