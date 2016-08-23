package io.boxcore.services;

import java.util.List;

import io.boxcore.dao.UserDao;
import io.boxcore.dto.SignUpDto;
import io.boxcore.model.User;

/**
 * The User Service.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    public List<User> getAllUsers() {
        return userDao.list();
    }

    public User getUser(int id) {
        return userDao.getUser(id);
    }

    public Integer createUser(SignUpDto signUpDto) {
        if (signUpDto == null) {
            return null;
        }
        User user = new User(signUpDto.getUsername(),
                             signUpDto.getFirstName(),
                             signUpDto.getLastName(),
                             signUpDto.getEmail());
        return userDao.create(user);
    }

    public boolean updateUser(int id, User user) {
        return false;
    }

    public boolean deleteUser(int id) {
        return false;
    }
}
