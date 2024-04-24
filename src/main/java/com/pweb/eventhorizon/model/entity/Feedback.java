package com.pweb.eventhorizon.model.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.id.uuid.UuidGenerator;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="feedbacks")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name = "UUID", type = UuidGenerator.class)
    private String id;

    @Column(nullable = false)
    @Email
    private String email;

    @Column(nullable = false)
    private String feedbackType;

    @Column(nullable = false)
    private String satisfaction;

    @Column(nullable = false)
    private boolean contactConsent;

    @Column(nullable = false, length = 1024)
    private String comments;

    @Temporal(TemporalType.TIMESTAMP)
    private Date submittedAt = new Date();
}
