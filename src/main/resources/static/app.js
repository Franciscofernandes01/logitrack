const API_BASE_URL = '/api/remessas';
let authHeader = '';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const remessaForm = document.getElementById('remessa-form');
    
    // 1. Lógica de Autenticação
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');
        
        // Cria o cabeçalho de autenticação Basic
        const credentials = btoa(`${username}:${password}`);
        authHeader = `Basic ${credentials}`;

        try {
            // Tenta acessar um endpoint protegido para verificar a autenticação
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader
                }
            });

            if (response.ok) {
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('app-section').style.display = 'block';
                loginMessage.textContent = '';
                loadRemessas(); // Carrega os dados após o login
            } else if (response.status === 401) {
                loginMessage.textContent = 'Falha na autenticação. Verifique usuário e senha.';
            } else {
                loginMessage.textContent = 'Erro ao conectar ao servidor.';
            }
        } catch (error) {
            loginMessage.textContent = 'Erro de rede ou servidor indisponível.';
            console.error('Erro de login:', error);
        }
    });

    // 2. Lógica de Cadastro de Remessa (Transação)
    remessaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const remessaMessage = document.getElementById('remessa-message');
        remessaMessage.textContent = '';

        const novaRemessa = {
            origem: document.getElementById('origem').value,
            destino: document.getElementById('destino').value,
            pesoKg: parseFloat(document.getElementById('pesoKg').value),
            cliente: document.getElementById('cliente').value,
            descricao: document.getElementById('descricao').value
        };

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify(novaRemessa)
            });

            if (response.ok) {
                const remessaCriada = await response.json();
                remessaMessage.textContent = `Remessa cadastrada com sucesso! Código de Rastreio: ${remessaCriada.codigoRastreio}`;
                remessaForm.reset();
                loadRemessas(); // Atualiza a lista de consultas
            } else {
                remessaMessage.textContent = 'Erro ao cadastrar remessa. Verifique os dados.';
            }
        } catch (error) {
            remessaMessage.textContent = 'Erro de rede ao tentar cadastrar.';
            console.error('Erro de cadastro:', error);
        }
    });

    // 3. Lógica de Consultas e Relatórios
    async function loadRemessas() {
        const tbody = document.querySelector('#remessas-table tbody');
        tbody.innerHTML = ''; // Limpa a tabela
        const remessasMessage = document.getElementById('remessas-message');
        remessasMessage.textContent = '';

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader
                }
            });

            if (response.ok) {
                const remessas = await response.json();
                if (remessas.length === 0) {
                    remessasMessage.textContent = 'Nenhuma remessa cadastrada.';
                    return;
                }

                remessas.forEach(remessa => {
                    const row = tbody.insertRow();
                    row.insertCell().textContent = remessa.codigoRastreio;
                    row.insertCell().textContent = remessa.origem;
                    row.insertCell().textContent = remessa.destino;
                    row.insertCell().textContent = remessa.status;
                    
                    const actionCell = row.insertCell();
                    const updateButton = document.createElement('button');
                    updateButton.textContent = 'Atualizar Status';
                    updateButton.onclick = () => updateStatus(remessa.id, remessa.status);
                    actionCell.appendChild(updateButton);
                });

            } else if (response.status === 401) {
                remessasMessage.textContent = 'Sessão expirada. Faça login novamente.';
                document.getElementById('login-section').style.display = 'block';
                document.getElementById('app-section').style.display = 'none';
            } else {
                remessasMessage.textContent = 'Erro ao carregar remessas.';
            }
        } catch (error) {
            remessasMessage.textContent = 'Erro de rede ao carregar dados.';
            console.error('Erro ao carregar remessas:', error);
        }
    }

    // 4. Lógica de Atualização de Status (Transação)
    async function updateStatus(remessaId, currentStatus) {
        let newStatus;
        if (currentStatus === 'PENDENTE') {
            newStatus = 'EM_TRANSITO';
        } else if (currentStatus === 'EM_TRANSITO') {
            newStatus = 'ENTREGUE';
        } else {
            alert('Status finalizado. Não é possível atualizar.');
            return;
        }

        if (!confirm(`Deseja alterar o status da remessa ${remessaId} para ${newStatus}?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${remessaId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHeader
                },
                body: JSON.stringify(newStatus) // Envia o novo status como JSON
            });

            if (response.ok) {
                alert(`Status da remessa ${remessaId} atualizado para ${newStatus}.`);
                loadRemessas(); // Recarrega a lista
            } else {
                alert('Falha ao atualizar status.');
            }
        } catch (error) {
            alert('Erro de rede ao atualizar status.');
            console.error('Erro de atualização:', error);
        }
    }

    // Expõe a função para o escopo global para ser chamada pelos botões
    window.updateStatus = updateStatus;
});
