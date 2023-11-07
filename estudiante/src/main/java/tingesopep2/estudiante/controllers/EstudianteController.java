package tingesopep2.estudiante.controllers;
import tingesopep2.estudiante.entities.EstudianteEntity;
import tingesopep2.estudiante.services.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    private final EstudianteService estudianteService;
    @Autowired
    public EstudianteController(EstudianteService estudianteService) {

        this.estudianteService = estudianteService;
    }

    @GetMapping("/index")
    public String mostrarPaginaDeInicio() {
        return "index";
    }

    @GetMapping("/registroEstudiante")
    public String mostrarFormulario(Model model) {
        model.addAttribute("estudiante", new EstudianteEntity());
        return "registroEstudiante";
    }

    @PostMapping("/guardarEstudiante")
    public String guardarEstudiante(@RequestParam String rut,
                                    @RequestParam String apellidos,
                                    @RequestParam String nombres,
                                    @RequestParam String fecha_nacimiento,
                                    @RequestParam String tipo_colegio,
                                    @RequestParam String nombre_colegio,
                                    @RequestParam Integer anio_egreso,
                                    @RequestParam String tipo_pago,
                                    @RequestParam Integer n_cuotas){
        estudianteService.guardarEstudiante(rut, apellidos, nombres, fecha_nacimiento, tipo_colegio, nombre_colegio, anio_egreso, tipo_pago, n_cuotas);
        return "registroEstudiante";
    }
}
