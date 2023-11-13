package tingesopep2.subirarchivo.services;

import lombok.Generated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tingesopep2.subirarchivo.entities.SubirArchivoEntity;
import tingesopep2.subirarchivo.repositories.SubirArchivoRepository;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class SubirArchivoService {


    @Autowired
    private SubirArchivoRepository archivoRepository;

    private final Logger logg = LoggerFactory.getLogger(SubirArchivoService.class);

    @Generated
    public String guardar(MultipartFile file){
        String filename = file.getOriginalFilename();
        if(filename != null){
            if(!file.isEmpty()){
                try{
                    byte [] bytes = file.getBytes();
                    Path path = Paths.get(file.getOriginalFilename());
                    Files.write(path, bytes);
                    logg.info("Archivo subido");
                }
                catch(IOException e){
                    logg.error("ERROR",e);
                }
            }
            return "Archivo subido con exito!";
        }
        else{
            return "No se pudo subir el archivo";
        }
    }

    @Generated
    public void leerArchivo(MultipartFile file){
        String direccion = file.getOriginalFilename();
        String texto = "";
        BufferedReader bf = null;
        try{
            assert direccion != null;
            bf = new BufferedReader(new FileReader(direccion));
            String temp = "";
            String bfRead;
            int count = 1;
            while((bfRead = bf.readLine()) != null){
                if (count == 1){
                    count = 0;
                }
                else{
                    guardarArchivoDB(bfRead.split(";")[0], bfRead.split(";")[1], Integer.valueOf(bfRead.split(";")[2]));
                    temp = temp + "\n" + bfRead;
                }
            }
            texto = temp;
            System.out.println("Archivo leído exitosamente");
        }catch(Exception e){
            System.err.println("No se encontró el archivo");
        }finally{
            if(bf != null){
                try{
                    bf.close();
                }catch(IOException e){
                    logg.error("ERROR", e);
                }
            }
        }
    }
    public SubirArchivoEntity obtenerPorRut(String rut){
        Optional<SubirArchivoEntity> archivo = archivoRepository.findById(rut);
        return archivo.orElse(null);
    }

    public Optional<SubirArchivoEntity> obtenerPorRutOptional(String rut){
        return archivoRepository.findById(rut);
    }
    public void guardarArchivo(SubirArchivoEntity archivo) {
        archivoRepository.save(archivo);
    }

    public void guardarArchivoDB(String RUT, String fecha, Integer puntaje){
        SubirArchivoEntity estudiante_promedio = obtenerPorRut(RUT);
        if (estudiante_promedio != null){
            estudiante_promedio.setFecha(fecha);
            estudiante_promedio.setN_examenes(estudiante_promedio.getN_examenes() + 1);
            int promedio = (estudiante_promedio.getPuntaje() + puntaje) / (estudiante_promedio.getN_examenes());
            estudiante_promedio.setPuntaje(promedio);
            guardarArchivo(estudiante_promedio);
        }
        else{
            SubirArchivoEntity nuevo_archivo = new SubirArchivoEntity();
            nuevo_archivo.setRut(RUT);
            nuevo_archivo.setFecha(fecha);
            nuevo_archivo.setPuntaje(puntaje);
            nuevo_archivo.setN_examenes(1);
            guardarArchivo(nuevo_archivo);
        }
    }
}
