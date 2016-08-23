package io.boxcore.dao;

import io.boxcore.model.Login;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The User Service.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
public class LoginDaoImpl implements LoginDao {

    private SessionFactory sessionFactory;

    public LoginDaoImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    @Transactional
    public Integer getId(String username, String password) {
        try {
            Query query = sessionFactory.getCurrentSession()
                    .createQuery(
                            "select login from Login login " +
                            "where login.username = :username " +
                            "and login.password = :password");
            query.setParameter("username", username);
            query.setParameter("password", password);
            Login login = (Login) query.uniqueResult();
            return (login == null) ? null : login.getId();
        } catch (Exception ex) {
            // log exception
            return null;
        }
    }
}
