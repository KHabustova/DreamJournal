package data.repositaries;

import data.entities.EntryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryRepository extends CrudRepository<EntryEntity, Long> {
}
