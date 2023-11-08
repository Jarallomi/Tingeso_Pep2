package tingesopep2.resumencuotas.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tingesopep2.resumencuotas.entities.ResumenEntity;

@Repository
public interface ResumenRepository extends CrudRepository<ResumenEntity, String> {
}

