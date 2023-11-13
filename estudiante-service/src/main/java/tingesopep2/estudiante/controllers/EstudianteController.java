package tingesopep2.estudiante.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tingesopep2.estudiante.entities.EstudianteEntity;
import tingesopep2.estudiante.services.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteController {

    private final EstudianteService estudianteService;
    @Autowired
    public EstudianteController(EstudianteService estudianteService) {

        this.estudianteService = estudianteService;
    }
    @GetMapping("/")
    public ResponseEntity<List<EstudianteEntity>> obtenerTodosLosEstudiantes() {
        List<EstudianteEntity> estudiantes = estudianteService.encontrarTodos();
        if (estudiantes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(estudiantes);
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
    public ResponseEntity<EstudianteEntity> guardarEstudiante(@RequestBody EstudianteEntity estudiante){
        EstudianteEntity savedEstudiante = estudianteService.guardarEstudiante(estudiante);
        if (savedEstudiante == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(savedEstudiante);
    }

}
