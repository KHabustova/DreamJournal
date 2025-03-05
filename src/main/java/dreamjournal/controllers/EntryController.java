package dreamjournal.controllers;

import dreamjournal.Exceptions.EntryNotFoundException;
import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.services.EntryService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class EntryController {

    @Autowired
    private EntryService entryService;

    @GetMapping()
    public ResponseEntity<List<EntryDTO>> drawIndex(){
        if (entryService.getAll().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(entryService.getAll());
    }

    @PostMapping("/new")
    public ResponseEntity createEntry(@RequestBody EntryDTO entry){
        entryService.create(entry);
        return ResponseEntity.ok("Entry created successfully!");

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEntry(@PathVariable Long id){
            entryService.deleteEntry(id);
            return ResponseEntity.ok("Entry deleted successfully!");


    }

    @GetMapping("/{id}")
    public ResponseEntity viewEntry(@PathVariable Long id){
        EntryDTO foundEntry = entryService.getByID(id);
        return ResponseEntity.ok(foundEntry);
    }

    @PutMapping("{id}")
    public ResponseEntity updateEntry(@PathVariable Long id, @RequestBody EntryDTO entry){
        EntryDTO currentEntry = entryService.getByID(id);
        currentEntry.setMood(entry.getMood());
        currentEntry.setBody(entry.getBody());
        currentEntry.setTitle(entry.getTitle());
        return ResponseEntity.ok("Sucesfully updated!");
    }


}
