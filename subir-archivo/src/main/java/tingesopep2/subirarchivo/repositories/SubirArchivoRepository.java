package tingesopep2.subirarchivo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tingesopep2.subirarchivo.entities.SubirArchivoEntity;

@Repository
public interface SubirArchivoRepository extends CrudRepository<SubirArchivoEntity, String> {
}
