package io.boxcore.dao;

import io.boxcore.model.User;

import java.util.List;

/**
 * User DAO interface
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/17/2016
 *
 */
public interface UserDao {
    List<User> list();
    User getUser(int id);
    Integer create(User user);
}
