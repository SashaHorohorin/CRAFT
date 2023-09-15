package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.craft.craft.model.sport.CompetitionPair;
import com.craft.craft.model.sport.SportComplex;
import com.craft.craft.model.user.BaseUser;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of={"title","oldPrice","nowPrice","discount"}, callSuper = true)
@Data
public class Price extends BaseEntity {
    @NotNull
    @NonNull
    private Integer maxTrains;
    private int oldPrice;
    @NonNull
    @NotNull
    private int nowPrice;
    private int discount;
    private String textUnderPrice;
    @Enumerated(EnumType.STRING)
    private SportComplex sportComplex;
    @Enumerated(EnumType.STRING)
    private PriceType type;
    @ElementCollection
    @CollectionTable(name = "services_price", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "service")
    List<String> services = new ArrayList<>();
    private boolean active;
    @OneToMany(mappedBy = "price", fetch = FetchType.EAGER, cascade = {CascadeType.ALL})
    Set<PriceUser> priceUserList = new HashSet<>();
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "order_price_user",
            joinColumns = {@JoinColumn(name = "price_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")}
    )
    Set<BaseUser> userOrders = new HashSet<>();
    @PrePersist
    public void setDiscount(){
        if(this.oldPrice > 0)
            this.discount = (int)((1 - (double)nowPrice/oldPrice) * 100) + 1;
    }

}
