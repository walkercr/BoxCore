package io.boxcore.dao;

/**
 * Created by Craig on 8/20/2016.
 */
public interface LoginDao {
    Integer getId(String username, String password);
}
