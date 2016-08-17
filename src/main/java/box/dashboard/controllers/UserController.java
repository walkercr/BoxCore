package box.dashboard.controllers;

import java.util.List;

import box.dashboard.model.User;
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

import box.dashboard.services.UserServiceImpl;

/**
 * The User controller.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
@RestController
public class UserController {

    @Autowired
    UserServiceImpl userService;

    /**
     * Retrieve all users.
     * @return a list of all users
     */
    @RequestMapping(value = "/api/user/", method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    /**
     * Create a user.
     * @param user the user to be created
     * @return the id of the created user
     */
    @RequestMapping(value = "/api/user/", method = RequestMethod.POST,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> createUser(@RequestBody User user) {
        Integer id = userService.createUser(user);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }

    /**
     * Update a user.
     * @param id the id of the user to be updated
     * @return the status code
     */
    @RequestMapping(value = "/api/user/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Void> updateUser(@PathVariable("id") int id, @RequestBody User user) {

        if (!userService.updateUser(id, user)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Delete a user.
     * @param id the id of the user to be deleted
     * @return the status code
     */
    @RequestMapping(value = "/api/user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {

        if (!userService.deleteUser(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
