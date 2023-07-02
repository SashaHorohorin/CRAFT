package com.craft.craft.model.info;

import com.craft.craft.model.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlacemarkOnMap extends BaseEntity {
    private double longitude;
    private double latitude;
    private String placemarkText;
    private String address;
    private String text;
}
