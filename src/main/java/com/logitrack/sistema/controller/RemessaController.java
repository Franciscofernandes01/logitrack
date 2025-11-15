package com.logitrack.sistema.controller;

import com.logitrack.sistema.model.Remessa;
import com.logitrack.sistema.service.RemessaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/remessas")
@CrossOrigin(origins = "*") // Permite acesso do Front-end
public class RemessaController {

    @Autowired
    private RemessaService remessaService;

    @GetMapping
    public List<Remessa> getAllRemessas() {
        return remessaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Remessa> getRemessaById(@PathVariable Long id) {
        return remessaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Remessa createRemessa(@RequestBody Remessa remessa) {
        return remessaService.save(remessa);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Remessa> updateRemessaStatus(@PathVariable Long id, @RequestBody String newStatus) {
        try {
            Remessa updatedRemessa = remessaService.updateStatus(id, newStatus);
            return ResponseEntity.ok(updatedRemessa);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRemessa(@PathVariable Long id) {
        remessaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
