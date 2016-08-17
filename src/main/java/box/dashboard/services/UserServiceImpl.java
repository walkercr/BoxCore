package box.dashboard.services;

import java.util.List;

import box.dashboard.dao.UserDao;
import box.dashboard.model.User;

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

    public Integer createUser(User user) {
        return userDao.create(user);
    }

    public boolean updateUser(int id, User user) {
        return false;
    }

    public boolean deleteUser(int id) {
        return false;
    }
}
