package com.pweb.eventhorizon.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.id.uuid.UuidGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    private String id;

    @Column(nullable=false)
    private String name;

    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date endDate;

    private String information;

    private String link;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "event_category",
            joinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "category_id", referencedColumnName = "id")
    )
    private List<EventCategory> categories = new ArrayList<>();

    @Column(nullable=false)
    @OneToMany(orphanRemoval = true, cascade=CascadeType.ALL, mappedBy = "event", fetch = FetchType.EAGER)
    private List<Location> locations = new ArrayList<>();

    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER, cascade=CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "event", fetch = FetchType.EAGER, cascade=CascadeType.ALL, orphanRemoval = true)
    private List<EventImage> images = new ArrayList<>();
}
