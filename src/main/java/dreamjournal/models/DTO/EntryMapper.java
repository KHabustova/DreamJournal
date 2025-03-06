package dreamjournal.models.DTO;

import dreamjournal.models.entities.EntryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface EntryMapper {
    EntryEntity toEntry (EntryDTO entryDTO);
    EntryDTO toDTO (EntryEntity entryDTO);
    void updateEntryDTO(EntryDTO source, @MappingTarget EntryDTO target);
    void updateEntryEntity(EntryDTO source, @MappingTarget EntryEntity target);

}
