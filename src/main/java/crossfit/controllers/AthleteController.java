package crossfit.controllers;

import java.util.List;

import crossfit.model.Athlete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import crossfit.services.AthleteService;

/**
 * The Player controller.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
@RestController
public class AthleteController {

    @Autowired
    AthleteService athleteService;

    /**
     * Retrieve all persons.
     * @return a list of all persons and the status code
     */
    @RequestMapping(value = "/api/person/", method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<List<Athlete>> getAllPlayers() {
        List<Athlete> athletes = athleteService.getAllPersons();
        return new ResponseEntity<List<Athlete>>(athletes, HttpStatus.OK);
    }

    /**
     * Create a athlete.
     * @param athlete the athlete to be created
     * @return http headers and the status code
     */
    @RequestMapping(value = "/api/person/", method = RequestMethod.POST,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Athlete> createPlayer(@RequestBody Athlete athlete) {
        Athlete createdAthlete = athleteService.createPerson(athlete);
        if (createdAthlete == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(createdAthlete, HttpStatus.CREATED);
    }

    /**
     * Update a athlete.
     * @param id the id of the athlete to be updated
     * @return the status code
     */
    @RequestMapping(value = "/api/person/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Void> updatePerson(@PathVariable("id") int id, @RequestBody Athlete athlete) {

        if (!athleteService.updatePerson(id, athlete)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete a person.
     * @param id the id of the person to be deleted
     * @return the status code
     */
    @RequestMapping(value = "/api/person/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deletePerson(@PathVariable("id") int id) {

        if (!athleteService.deletePerson(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
