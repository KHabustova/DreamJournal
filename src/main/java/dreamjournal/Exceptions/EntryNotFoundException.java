package dreamjournal.Exceptions;

public class EntryNotFoundException extends RuntimeException {
    public EntryNotFoundException(String errorMessage) {
        super(errorMessage);
    }
}
