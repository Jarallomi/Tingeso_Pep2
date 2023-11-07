package tingesopep2.subirarchivo.entities;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "archivo")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubirArchivoEntity {
    @Id
    @NotNull
    private String rut;

    private String fecha;
    private Integer puntaje;
    private Integer n_examenes;
}