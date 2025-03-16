package dreamjournal.controllers;

import dreamjournal.models.Mood;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MoodController {

    @GetMapping("/moods")
    public ResponseEntity<List<Mood>> sendMoodList(){
        return ResponseEntity.ok(Arrays.asList(Mood.values()));
    }

}
