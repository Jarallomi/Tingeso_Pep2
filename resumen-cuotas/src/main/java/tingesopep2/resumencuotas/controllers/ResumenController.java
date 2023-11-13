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

    @PostMapping("/registrarPagoCuotas")
    public ResponseEntity<?> registrarPagoCuotas(@RequestBody PagoCuotaRequest pagoCuotaRequest) {
        try {
            resumenService.modificarCuota(pagoCuotaRequest.getFechaPago(), pagoCuotaRequest.getRut());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al procesar el pago de la cuota");
        }
    }

    @Getter
    public static class PagoCuotaRequest {
        private String rut;
        @Getter
        private Date fechaPago;
    }



}
