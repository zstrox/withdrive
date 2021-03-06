package nl.fontys.withdrive.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.fontys.withdrive.enumeration.ApplicationStatus;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="applications")
public class TripApplication {
    @EmbeddedId
    TripApplicationKEY id = new TripApplicationKEY();

    @ManyToOne
    @MapsId("userID")
    @JoinColumn(name = "userID")
    private @Getter @Setter User applicant;

    @ManyToOne
    @MapsId("tripID")
    @JoinColumn(name = "tripID")
    private @Getter @Setter
    Trip trip;

    @Enumerated(EnumType.STRING)
    private @Getter @Setter ApplicationStatus status;
    @Lob
    private @Getter @Setter String text;
}
