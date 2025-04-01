package dreamjournal.models.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import dreamjournal.models.Mood;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

/**
 * Represents journal entity.
 * Transfers data between layers of application (in both the direction
 * of input -> controller -> service -> database and vice versa).
 */
public class EntryDTO {
    /**
     * Unique identification of the journal entry.
     * Not supplied during creation, as it is automatically generated during creation of database entry.
     */
    private long id;

    /**
     * The title of the journal entry.
     * This field cannot be blank and must have a maximum length of 150 characters. */
    @NotBlank(message = "Title can't be empty.")
    @Size(max = 150, message = "The title is too long.")
    private String title;

    /**
     * The body of the entry. It is a rich-text represented as plain text.
     * This field cannot be blank.
     */
    @NotBlank(message = "Content can not be empty.")
    private String body;

    /**
     * Emotion the user associated with the dream.
     * Corresponds to one of values in the {@link Mood}.
     * Cannot be empty (the front-end automatically sends NEUTRAL value,
     * even if the enum list is not fetched.)
     */
    @NotNull(message="Mood is required.")
    private Mood mood;

    /**
     * The creation date of the journal entry.
     * This field is formatted as a string in the format "dd.MM.yyyy" when serialized to JSON.
     * This is set during the creation of database entry and is not supplied by front-end.
     */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
    private LocalDate creationDate;

    // Setters and Getters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}