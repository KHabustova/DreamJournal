package dreamjournal.models.repositaries;

import dreamjournal.models.entities.EntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository that interfaces with the database. {@link JpaRepository} provides built-in CRUD operation.
 */
@Repository
public interface EntryRepository extends JpaRepository<EntryEntity, Long> {
}
