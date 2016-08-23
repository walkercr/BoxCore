package io.boxcore.controllers;

import io.boxcore.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.SystemEnvironmentPropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Craig on 8/21/2016.
 */
@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    /**
     * Validates a user login
     * @param username the login username
     * @param password the login password
     * @return the id of the login user if it exists
     */
    @RequestMapping(
            value = "/api/login",
            params = {"username", "password"},
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> validateLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ) {
        Integer id = loginService.getId(username, password);
        if (id == null) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(id, HttpStatus.OK);
    }
}
