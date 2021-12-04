package nl.fontys.withdrive.controller;

import nl.fontys.withdrive.dto.rating.RatingDTO;
import nl.fontys.withdrive.dto.user.UserDTO;
import nl.fontys.withdrive.interfaces.service.IApplicationService;
import nl.fontys.withdrive.interfaces.service.IRatingService;
import nl.fontys.withdrive.interfaces.service.ITripService;
import nl.fontys.withdrive.interfaces.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rating")
public class RatingController {
    private final IRatingService ratings;
    private final ITripService trips;
    private final IUserService users;

    @Autowired
    public RatingController(IRatingService ratings, ITripService trips,IUserService users){
        this.ratings = ratings;
        this.trips = trips;
        this.users = users;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void postRating(@RequestBody RatingDTO rating) {
        UserDTO loggedInUser = this.users.retrieveByEmail(SecurityContextHolder.getContext().getAuthentication().getName());
        rating.setRater(loggedInUser.getUserID());
        rating.setUser(trips.RetrieveByNumber(rating.getTrip()).getDriver().getUserID());
        ratings.add(rating);
    }

    @GetMapping("/by/user")
    @ResponseStatus(HttpStatus.OK)
    public void getRatingsByUser(@RequestBody RatingDTO rating) {
        ratings.add(rating);
    }

    @GetMapping("/by/ratertrip")
    @ResponseStatus(HttpStatus.OK)
    public void getRatingsByRater(@RequestBody RatingDTO rating) {
        ratings.add(rating);
    }
}
