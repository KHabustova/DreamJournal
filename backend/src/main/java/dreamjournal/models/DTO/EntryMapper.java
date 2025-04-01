package dreamjournal.models.DTO;

import dreamjournal.models.entities.EntryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

/**
 * A mapper interface for converting between {@link EntryDTO} and {@link EntryEntity}.
 * Utilizes MapStruct to automatically generate the implementation for mapping
 * data between the DTO and the Entity classes.
 */

 @Mapper(componentModel = "spring")
 public interface EntryMapper {

    /**
     * Converts an {@link EntryDTO} to an {@link EntryEntity}.
     *
     * @param entryDTO The DTO to be converted.
     * @return The corresponding {@link EntryEntity}.
     */
    EntryEntity toEntry(EntryDTO entryDTO);

    /**
     * Converts an {@link EntryEntity} to an {@link EntryDTO}.
     *
     * @param entryEntity The Entity to be converted.
     * @return The corresponding {@link EntryDTO}.
     */
    EntryDTO toDTO(EntryEntity entryEntity);

    /**
     * Updates an existing {@link EntryDTO} with values from another {@link EntryDTO}.
     *
     * @param source The {@link EntryDTO} containing updated data.
     * @param target The {@link EntryDTO} to be updated.
     */
    void updateEntryDTO(EntryDTO source, @MappingTarget EntryDTO target);

    /**
     * Updates an existing {@link EntryEntity} with values from an {@link EntryDTO}.
     *
     * @param source The {@link EntryDTO} containing updated data.
     * @param target The {@link EntryEntity} to be updated.
     */
    void updateEntryEntity(EntryDTO source, @MappingTarget EntryEntity target);
}
