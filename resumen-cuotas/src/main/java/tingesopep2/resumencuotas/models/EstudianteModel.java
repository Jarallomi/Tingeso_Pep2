package tingesopep2.resumencuotas.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstudianteModel {

    @Id
    @Column(unique = true, nullable = false)
    private String rut;

    private String apellidos;
    private String nombres;
    private String fecha_nacimiento;
    private String tipo_colegio;
    private String nombre_colegio;
    private Integer anio_egreso;
    private String tipo_pago;
    private Integer n_cuotas = 0;
}
