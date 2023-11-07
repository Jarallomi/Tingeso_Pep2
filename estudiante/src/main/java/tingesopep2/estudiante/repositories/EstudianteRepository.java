package tingesopep2.estudiante.repositories;

import tingesopep2.estudiante.entities.EstudianteEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends CrudRepository<EstudianteEntity, String> {
}
