package com.craft.craft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.internal.build.AllowSysOut;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SetLabIdDto {
    String username;
    Integer labID;
}
