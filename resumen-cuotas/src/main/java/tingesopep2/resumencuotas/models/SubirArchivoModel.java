package tingesopep2.resumencuotas.models;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class SubirArchivoModel {
    @Id
    @NotNull
    private String rut;

    private String fecha;
    private Integer puntaje;
    private Integer n_examenes;
}
