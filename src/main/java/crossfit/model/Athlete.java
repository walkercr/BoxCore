package crossfit.model;

/**
 * Athlete POJO
 *
 * @author Craig Walker
 * @version 1.0
 * @since 8/5/2016
 *
 */
public class Athlete {

    private int id;
    private String username;
    private String firstName;
    private String lastName;
    private boolean enabled;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) { this.username = username; }

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

    public boolean getEnabled() { return enabled; }

    public void setEnabled(boolean enabled) { this.enabled = enabled; }
}
