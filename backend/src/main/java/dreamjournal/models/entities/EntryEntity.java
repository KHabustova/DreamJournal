package dreamjournal.models.entities;

import dreamjournal.models.Mood;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;

/**
 * Represents Journal entry in the Database.
 *  */
@Entity
public class EntryEntity {

    /**
     * The unique identifier for the journal entry.
     * Automatically generated as a primary key in the database.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    /**
     * The title of the journal entry. Can not be empty.
     */
    @Column(nullable = false)
    private String title;

    /**
     * The body of the journal entry. Can not be empty.
     * This field includes rich text formatting and is stored as a plain string.
     * */
    @Column(nullable = false)
    private String body;

    /**
     * The mood, or feelings associated with the dream. Stored as a String, maps to {@link Mood} enum.
     * Can not be empty.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private Mood mood;

    /**
     * Creation date of the entry.
     * This date is automatically set by Hibernate upon creation.
     * Can not be empty.
     */
    @CreationTimestamp
    @Column(nullable = false)
    private LocalDate creationDate;

    //Getters and Setters

    public long getId() {
        return id;
    }


    public void setId(long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }


    public Mood getMood() {
        return mood;
    }

    public void setMood(Mood mood) {
        this.mood = mood;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }
}
