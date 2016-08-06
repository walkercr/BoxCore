package crossfit.model;

/**
 * The Player controller.
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
public class Person {

    private int id;
    private String firstName;
    private String lastName;
    private String username;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
