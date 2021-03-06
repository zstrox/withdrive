package nl.fontys.withdrive.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.withdrive.enumeration.TripStatus;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="trips")
public class Trip{
    @Id
    @Column(name="ID")
    @Type(type="org.hibernate.type.UUIDCharType")
    private @Getter @Setter UUID tripID;
    private @Getter @Setter String origin;
    private @Getter @Setter String destination;
    private @Getter @Setter String description;
    private @Getter @Setter String date;
    private @Getter @Setter String licensePlate;
    private @Getter @Setter int maxPassengers;
    private @Getter @Setter double pricePerPassenger;

    @Enumerated(EnumType.STRING)
    private @Getter @Setter TripStatus status;

    @OneToMany(mappedBy = "trip",
            cascade ={ CascadeType.REMOVE,CascadeType.REFRESH,CascadeType.PERSIST})
    Set<TripApplication> application;

    @OneToMany(mappedBy = "trip",
            cascade ={ CascadeType.REMOVE,CascadeType.REFRESH,CascadeType.PERSIST})
    Set<Rating> trip;

    @ManyToOne
    private @Getter @Setter User driver;

}