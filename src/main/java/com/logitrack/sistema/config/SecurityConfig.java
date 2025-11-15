package com.logitrack.sistema.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF para API REST
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/remessas/**").authenticated() // Requer autenticação para API de remessas
                .anyRequest().permitAll() // Permite acesso a outros endpoints (incluindo o front-end estático)
            )
            .httpBasic(httpBasic -> {}) // Usa autenticação Basic (username/password)
            .formLogin(form -> form.disable()); // Desabilita formulário de login padrão

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Usuário de teste para demonstração de Autenticação e Autorização
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        
        UserDetails admin = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("adminpass")
            .roles("ADMIN")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}
