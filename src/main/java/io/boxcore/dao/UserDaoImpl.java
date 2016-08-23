package io.boxcore.dao;

import io.boxcore.model.User;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * User DAO
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/17/2016
 *
 */
public class UserDaoImpl implements UserDao {

    private SessionFactory sessionFactory;

    public UserDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    @Transactional
    public List<User> list() {
        @SuppressWarnings("unchecked")
        List<User> userList = sessionFactory.getCurrentSession()
                .createCriteria(User.class)
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY).list();
        return userList;
    }

    @Override
    @Transactional
    public User getUser(int id) {
        return sessionFactory.getCurrentSession().get(User.class, id);
    }

    @Override
    @Transactional
    public Integer create(User user) {
        return (Integer) sessionFactory.getCurrentSession().save(user);
    }
}
