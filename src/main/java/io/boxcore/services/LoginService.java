package io.boxcore.services;

/**
 * The Login Service interface.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/21/2016
 *
 */
public interface LoginService {
    Integer getId(String username, String password);
}
