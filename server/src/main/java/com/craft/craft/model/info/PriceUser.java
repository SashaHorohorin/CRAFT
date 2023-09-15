package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.user.BaseUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Objects;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PriceUser extends BaseEntity {
    @ManyToOne
    private Price price;
    @OneToOne(cascade = {CascadeType.REFRESH, CascadeType.MERGE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private BaseUser user;
    private Date timeOfPurchase;
    @NotNull
    private Integer maxTrains;
    private Integer remainingTrains;


    @PreRemove
    private void preRemove() {
        user.setPrice(null);
        price.getPriceUserList().remove(this);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode());
    }
}
