package com.craft.craft.model.sport;


import java.util.Date;

public interface ItemInCalendar {
    ItemInCalendarType getItemType();
    Date getStartItem();
    SportComplex getSportComplexOfItem();
}
