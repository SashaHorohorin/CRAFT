package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class Price extends BaseEntity {
    @NotNull
    @NonNull
    private String title;
    private int oldPrice;
    @NonNull
    @NotNull
    private int nowPrice;
    private int discount;
    private String textUnderPrice;
    @ElementCollection
    @CollectionTable(name = "services_price", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "service")
    List<String> services = new ArrayList<>();

    @PrePersist
    public void setDiscount(){
        if(this.oldPrice > 0)
            this.discount = (int)((1 - (double)nowPrice/oldPrice) * 100) + 1;
    }

}
