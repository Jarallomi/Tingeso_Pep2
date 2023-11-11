package tingesopep2.resumencuotas.controllers;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import tingesopep2.resumencuotas.entities.ResumenEntity;
import tingesopep2.resumencuotas.models.EstudianteModel;
import tingesopep2.resumencuotas.models.SubirArchivoModel;
import tingesopep2.resumencuotas.services.ResumenService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resumen")
public class ResumenController {

    @Autowired
    private ResumenService resumenService;

    @GetMapping("/lista")
    public List<ResumenEntity> obtenerResumenes() {
        resumenService.guardarResumen();
        return resumenService.obtenerTodosLosResumenes();
    }
    @GetMapping("/")
    public List<ResumenEntity> mostrarResumen() {
        resumenService.guardarResumen();
        return resumenService.obtenerTodosLosResumenes();
    }

    /*@GetMapping("/registrarPagoCuotas")
    public String mostrarFormularioPagoCuotas(@RequestParam("rut") String rut, Model model) {
        model.addAttribute("rut", rut);
        return "formularioPagoCuotas";
    }*/

    @PostMapping("/registrarPagoCuotas")
    public ResponseEntity<?> registrarPagoCuotas(@RequestBody PagoCuotaRequest pagoCuotaRequest) {
        try {
            resumenService.modificarCuota(pagoCuotaRequest.getFechaPago(), pagoCuotaRequest.getRut());
            return ResponseEntity.ok().build(); // Puedes devolver un objeto más informativo si es necesario
        } catch (Exception e) {
            // Manejo de la excepción, p.ej., si no se puede realizar el registro
            return ResponseEntity.badRequest().body("Error al procesar el pago de la cuota");
        }
    }

    // Clase interna para manejar el cuerpo de la solicitud
    @Getter
    public static class PagoCuotaRequest {
        private String rut;
        // Getter para la fecha de pago
        @Getter
        private Date fechaPago;

    }



}
