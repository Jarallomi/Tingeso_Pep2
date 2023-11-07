package tingesopep2.subirarchivo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import tingesopep2.subirarchivo.services.SubirArchivoService;

@RestController
@RequestMapping("/subirArchivo")
public class SubirArchivoController {

    @Autowired
    private SubirArchivoService subirArchivo;

    @GetMapping("/")
    public String mainArchivo() {
        return "subirArchivo";
    }

    @PostMapping("/")
    public String upload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes){
        if (!file.isEmpty()){
            subirArchivo.guardar(file);
            redirectAttributes.addFlashAttribute("mensaje", "Archivo subido con exito!");
            subirArchivo.leerArchivo(file);
        }
        else{
            redirectAttributes.addFlashAttribute("mensaje", "Error: el archivo esta vacio.");
        }
        return "redirect:/subirArchivo";
    }

}