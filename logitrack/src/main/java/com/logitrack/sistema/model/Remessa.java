package com.logitrack.sistema.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Remessa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoRastreio;
    private String origem;
    private String destino;
    private Double pesoKg;
    private String cliente;
    private String descricao;
    private String status; // Ex: EM_TRANSITO, ENTREGUE, PENDENTE
    private LocalDateTime dataCriacao;
    private LocalDateTime dataAtualizacao;

}
