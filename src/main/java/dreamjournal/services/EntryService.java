package dreamjournal.services;

import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.models.entities.EntryEntity;

import java.util.List;

public interface EntryService {
    void create(EntryDTO entry);
    List<EntryDTO> getAll();
    EntryDTO getByID(long entryID);
    void editEntry(EntryDTO entry);
    void deleteEntry(long id);

}
