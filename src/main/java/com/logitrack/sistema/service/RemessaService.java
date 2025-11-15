package com.logitrack.sistema.service;

import com.logitrack.sistema.model.Remessa;
import com.logitrack.sistema.repository.RemessaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RemessaService {

    @Autowired
    private RemessaRepository remessaRepository;

    public List<Remessa> findAll() {
        return remessaRepository.findAll();
    }

    public Optional<Remessa> findById(Long id) {
        return remessaRepository.findById(id);
    }

    public Remessa save(Remessa remessa) {
        if (remessa.getId() == null) {
            // Nova remessa - Transação de Cadastro
            remessa.setCodigoRastreio(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            remessa.setDataCriacao(LocalDateTime.now());
            remessa.setStatus("PENDENTE");
        }
        remessa.setDataAtualizacao(LocalDateTime.now());
        return remessaRepository.save(remessa);
    }

    public Remessa updateStatus(Long id, String newStatus) {
        // Transação de Atualização de Status
        return remessaRepository.findById(id).map(remessa -> {
            remessa.setStatus(newStatus);
            remessa.setDataAtualizacao(LocalDateTime.now());
            return remessaRepository.save(remessa);
        }).orElseThrow(() -> new RuntimeException("Remessa não encontrada com ID: " + id));
    }

    public void deleteById(Long id) {
        remessaRepository.deleteById(id);
    }
}
