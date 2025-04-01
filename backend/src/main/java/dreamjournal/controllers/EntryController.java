package dreamjournal.controllers;

import dreamjournal.Exceptions.EntryNotFoundException;
import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.services.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Provides endpoints for retrieving, creating, updating, and deleting journal entries.
 */
@RestController
@RequestMapping("/")
public class EntryController {

    @Autowired
    private EntryService entryService;

    /**
     * Retrieves all journal entries.
     * If no entries are found, returns a 204 No Content response.
     *
     * @return A {@link ResponseEntity} containing the list of all {@link EntryDTO} entries.
     *         Returns a 200 OK response if entries are found, or 204 No Content if no entries exist.
     */
    @GetMapping()
    public ResponseEntity<List<EntryDTO>> drawIndex(){
        if (entryService.getAll().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(entryService.getAll());
    }

    /**
     * Creates a new journal entry.
     * Accepts an {@link EntryDTO} in the request body, creates the entry, and returns a success message.
     *
     * @param entry The entry data to be created.
     * @return A {@link ResponseEntity} with a success message indicating the entry was created.
     */
    @PostMapping("/new")
    public ResponseEntity createEntry(@RequestBody EntryDTO entry){
        entryService.create(entry);
        return ResponseEntity.ok("Entry created successfully!");
    }

    /**
     * Deletes a specific journal entry by its ID.
     *
     * @param id The ID of the entry to delete.
     * @return A {@link ResponseEntity} with a success message confirming the entry deletion.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntry(@PathVariable Long id){
        entryService.deleteEntry(id);
        return ResponseEntity.ok("Entry deleted successfully!");
    }

    /**
     * Retrieves a journal entry by its ID.
     *
     * @param id The ID of the entry to retrieve.
     * @return A {@link ResponseEntity} containing the {@link EntryDTO} of the requested entry.
     */
    @GetMapping("/{id}")
    public ResponseEntity viewEntry(@PathVariable Long id){
        EntryDTO foundEntry = entryService.getByID(id);
        return ResponseEntity.ok(foundEntry);
    }

    /**
     * Updates an existing journal entry.
     * Accepts a {@link EntryDTO} in the request body and updates the specified entry.
     *
     * @param id The ID of the entry to update.
     * @param entry The updated entry data.
     * @return A {@link ResponseEntity} with a success message confirming the update.
     */
    @PutMapping("{id}")
    public ResponseEntity updateEntry(@PathVariable Long id, @RequestBody EntryDTO entry){
        EntryDTO currentEntry = entryService.getByID(id);
        currentEntry.setMood(entry.getMood());
        currentEntry.setBody(entry.getBody());
        currentEntry.setTitle(entry.getTitle());
        entryService.editEntry(currentEntry);
        return ResponseEntity.ok("Successfully updated!");
    }
}