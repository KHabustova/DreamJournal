package dreamjournal.controllers;

import dreamjournal.models.Mood;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

/**
 * Provides endpoint related to the {@link Mood} values.
 */
@RestController
@RequestMapping("/api")
public class MoodController {
    /**
     * Endpoint to retrieve all available moods.
     * @return A {@link ResponseEntity} containing a list of all {@link Mood} values,
     *         returned as a 200 OK response.
     */
    @GetMapping("/moods")
    public ResponseEntity<List<Mood>> sendMoodList(){
        return ResponseEntity.ok(Arrays.asList(Mood.values()));
    }

}
