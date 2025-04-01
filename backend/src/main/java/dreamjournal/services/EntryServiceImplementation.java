package dreamjournal.services;

import dreamjournal.Exceptions.EntryNotFoundException;
import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.models.DTO.EntryMapper;
import dreamjournal.models.entities.EntryEntity;
import dreamjournal.models.repositaries.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of the {@link EntryService} interface.
 * Provides CRUD operations for both {@link EntryDTO} and {@link EntryEntity}.
 */
@Service
public class EntryServiceImplementation implements EntryService {

    @Autowired
    private EntryRepository entryRepository;

    @Autowired
    private EntryMapper entryMapper;

    /**
     * Creates a new journal entry.
     *
     * @param entry The entry data transfer object (DTO) containing entry details.
     */
    @Override
    public void create(EntryDTO entry) {
        EntryEntity newEntity = entryMapper.toEntry(entry);
        entryRepository.save(newEntity);
    }

    /**
     * Retrieves all journal entries sorted by ID in descending order.
     *
     * @return A list of entry DTOs.
     */
    @Override
    public List<EntryDTO> getAll() {
        return entryRepository.findAll(Sort.by(Sort.Direction.DESC, "id"))
                .stream()
                .map(entryMapper::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Retrieves a specific journal entry by its ID.
     *
     * @param entryID The ID of the entry.
     * @return The corresponding entry DTO.
     * @throws EntryNotFoundException If the entry is not found.
     */
    @Override
    public EntryDTO getByID(long entryID) {
        EntryEntity fetchedEntry = findEntry(entryID);
        return entryMapper.toDTO(fetchedEntry);
    }

    /**
     * Updates an existing journal entry.
     *
     * @param entry The updated entry DTO.
     * @throws EntryNotFoundException If the entry does not exist.
     */
    @Override
    public void editEntry(EntryDTO entry) {
        EntryEntity fetchedEntry = findEntry(entry.getId());
        entryMapper.updateEntryEntity(entry, fetchedEntry);
        entryRepository.save(fetchedEntry);
    }

    /**
     * Deletes a journal entry by its ID.
     *
     * @param id The ID of the entry to be deleted.
     * @throws EntryNotFoundException If the entry is not found.
     */
    @Override
    public void deleteEntry(long id) {
        EntryEntity fetchedEntry = findEntry(id);
        entryRepository.delete(fetchedEntry);
    }

    /**
     * Finds an entry by its ID.
     *
     * @param id The ID of the entry.
     * @return The corresponding entry entity.
     * @throws EntryNotFoundException If no entry with the given ID exists.
     */
    private EntryEntity findEntry(long id) {
        return entryRepository.findById(id)
                .orElseThrow(() -> new EntryNotFoundException("Entry with ID " + id + " not found. Process aborted."));
    }
}