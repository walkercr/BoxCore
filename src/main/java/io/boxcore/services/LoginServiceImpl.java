package io.boxcore.services;

import io.boxcore.dao.LoginDao;

/**
 * Created by Craig on 8/21/2016.
 */
public class LoginServiceImpl implements LoginService {

    private LoginDao loginDao;

    public LoginServiceImpl(LoginDao loginDao) {
        this.loginDao = loginDao;
    }

    public Integer getId(String username, String password) {
        return loginDao.getId(username, password);
    }
}
