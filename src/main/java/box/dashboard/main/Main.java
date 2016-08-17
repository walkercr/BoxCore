package box.dashboard.main;

public class Main {
	
	/*
	 * Runs the application
	 * @param args command-line parameters
	 */
	public static void main(String[] args) {
		System.setProperty("environment", "dev");
		Application.run(args);
	}
}