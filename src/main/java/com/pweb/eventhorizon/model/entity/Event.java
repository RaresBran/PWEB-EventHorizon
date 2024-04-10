package com.pweb.eventhorizon.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    private String name;

    private String type;

    private Date startDate;

    private Date endDate;

    private String information;

    private String link;

    @OneToMany(orphanRemoval = true, cascade=CascadeType.ALL, mappedBy = "event")
    private List<Location> locations = new ArrayList<>();
}
