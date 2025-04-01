package dreamjournal.services;

import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.models.entities.EntryEntity;

import java.util.List;

/**
 * Service interface for managing journal entries.
 * Provides CRUD operations for both {@link EntryDTO} and {@link EntryEntity}.
 */
public interface EntryService {
    /**
     * Creates an entry in database.
     * @param entry The {@link EntryDTO} containing the data of the entry to be made.
     */
    void create(EntryDTO entry);

    /**
     * Gets all entries in the database.
     * @return List of {@link EntryDTO} objects containing all entries in the database.
     */
    List<EntryDTO> getAll();

    /**
     * Gets journal entry by supplied ID.
     *
     * @param entryID The ID of entry to be fetched.
     * @return The {@link EntryDTO} containing data of the fetched entry.
     */
    EntryDTO getByID(long entryID);

    /**
     * Edits the entry.
     * @param entry The {@link EntryDTO} containing updated details for the entry.
     */
    void editEntry(EntryDTO entry);

    /**
     * Delete entry with the supplied ID.
     *
     * @param id The ID of the entry to be deleted.
     */
    void deleteEntry(long id);

}