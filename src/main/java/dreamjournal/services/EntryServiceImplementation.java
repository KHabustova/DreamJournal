package dreamjournal.services;

import dreamjournal.Exceptions.EntryNotFoundException;
import dreamjournal.models.DTO.EntryDTO;
import dreamjournal.models.DTO.EntryMapper;
import dreamjournal.models.entities.EntryEntity;
import dreamjournal.models.repositaries.EntryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@Service
public class EntryServiceImplementation implements EntryService {
    @Autowired
    private EntryRepository entryRepository;

    @Autowired
    private EntryMapper entryMapper;

    @Override
    public void create(EntryDTO entry) {
        EntryEntity newEntity = entryMapper.toEntry(entry);

        entryRepository.save(newEntity);

    }

    @Override
    public List<EntryDTO> getAll() {
        return StreamSupport.stream(entryRepository.findAll().spliterator(), false)
                .map(i -> entryMapper.toDTO(i)).toList();
    }

    @Override
    public EntryDTO getByID(long entryID) {
        EntryEntity fetchedEntry = findEntry(entryID);
        return entryMapper.toDTO(fetchedEntry);
    }

    @Override
    public void editEntry(EntryDTO entry) {
        EntryEntity fetchedEntry = findEntry(entry.getId());

        entryMapper.updateEntryEntity(entry, fetchedEntry);
        entryRepository.save(fetchedEntry);
    }

    @Override
    public void deleteEntry(long id) {
        EntryEntity fetchedEntry = findEntry(id);
        entryRepository.delete(fetchedEntry);
    }

    private EntryEntity findEntry(long id) {
        return entryRepository.findById(id).orElseThrow(()->new EntryNotFoundException("Entry with ID of " + id + " not found. Process aborted."));
    }

}
