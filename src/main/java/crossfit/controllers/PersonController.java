package crossfit.controllers;

import java.util.List;

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

import crossfit.model.Person;
import crossfit.services.PersonService;

/**
 * The Player controller.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
@RestController
public class PersonController {

    @Autowired
    PersonService personService;

    /**
     * Retrieve all persons.
     * @return a list of all persons and the status code
     */
    @RequestMapping(value = "/api/person/", method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<List<Person>> getAllPlayers() {
        List<Person> persons = personService.getAllPersons();
        return new ResponseEntity<List<Person>>(persons, HttpStatus.OK);
    }

    /**
     * Create a person.
     * @param person the person to be created
     * @return http headers and the status code
     */
    @RequestMapping(value = "/api/person/", method = RequestMethod.POST,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Person> createPlayer(@RequestBody Person person) {
        Person createdPerson = personService.createPerson(person);
        if (createdPerson == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(createdPerson, HttpStatus.CREATED);
    }

    /**
     * Update a person.
     * @param id the id of the person to be updated
     * @return the status code
     */
    @RequestMapping(value = "/api/person/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Void> updatePerson(@PathVariable("id") int id, @RequestBody Person person) {

        if (!personService.updatePerson(id, person)) {
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

        if (!personService.deletePerson(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
