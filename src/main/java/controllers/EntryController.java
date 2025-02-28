package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EntryController {
    public String Test(){
        return "test";
    }

}
