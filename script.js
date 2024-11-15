// function to show the opens tickets

function tickets2() {  
    return [
        {user: 'aaaaaaaaaaaa', department: 'Financeiro', title: 'Mal funcionamento dos periféricos', status: 'Analista', nameAnalista: 'Arnold'},
        {user: 'Maria Silva', department: 'TI', title: 'Problema de rede', status: 'Analista', nameAnalista: 'Carlos'},
    ];
}

function createTicketContent() {
    const dynamicContent = document.getElementById('ticketList');
    
    // Verificação adicional para assegurar que o elemento foi encontrado
    if (!dynamicContent) {
        console.error('Elemento ticketList não encontrado na página.');
        return;
    }

    const ticketList = tickets2();

    ticketList.forEach(ticket => {
        const container = document.createElement('div');
        container.className = 'container-options';

        container.innerHTML = `
            <div class="container-options-box">
                <div class="circle-foto"></div>
                <div class="info-conlunm">
                    <i>${ticket.user} | ${ticket.department}</i>
                    <h4>${ticket.title}</h4>
                </div>
                <div class="circle-options">
                    <h3>Status</h3>
                    <div class="circle-status"></div>
                </div>
                <div class="name-column">
                    <h3>${ticket.status}</h3>
                    <h3>${ticket.nameAnalista}</h3>
                </div>
            </div>
        `;

        dynamicContent.appendChild(container);
    });
}

document.addEventListener('DOMContentLoaded', createTicketContent);

// Simulação de dados de cinco tickets
let tickets = [
    { id: 1, title: "Ticket #12342024", messages: [] },
    { id: 2, title: "Ticket #23452024", messages: [] },
    { id: 3, title: "Ticket #34562024", messages: [] }
];

let activeTicketId = null;

const tabsContainer = document.querySelector('.tabs');
const messagesContainer = document.getElementById('messages');

// Função para gerar o protocolo do ticket (sequencial + data no formato DDMMYYYY)
function generateTicketProtocol() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Formata o mês com 2 dígitos (0-based)
    const year = date.getFullYear(); // Obtém o ano completo (ex: 2024)

    const protocolNumber = tickets.length + 1; // Número sequencial baseado na quantidade de tickets

    return `${protocolNumber}${day}${month}${year}`; // Ex: 12312024 (1 + 31/12/2024)
}



// Criar um novo ticket
function createNewTicket() {
    const newTicketProtocol = generateTicketProtocol(); // Gera o protocolo com número sequencial e data
    const newTicketId = tickets.length + 1; // Criação de um novo ticket com ID incremental
    const newTicket = { id: newTicketId, title: `Ticket #${newTicketProtocol}`, messages: [] };
    tickets.push(newTicket);
    renderTabs(); // Re-renderizar as abas dos tickets
    openTicket(newTicketId); // Abrir o novo ticket criado
    window.location.href = "/openticket.html";
}


// Renderizar as abas dos tickets
function renderTabs() {
    tabsContainer.innerHTML = '';
    tickets.forEach(ticket => {
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.textContent = ticket.title;

        // Botão de fechar
        const closeButton = document.createElement('span');
        closeButton.className = 'close-btn';
        closeButton.textContent = 'X';
        closeButton.onclick = (e) => {
            e.stopPropagation();
            closeTab(ticket.id);
        };

        tab.appendChild(closeButton);
        tab.onclick = () => openTicket(ticket.id);

        tabsContainer.appendChild(tab);
    });
}

// Abrir um ticket e exibir as mensagens
function openTicket(id) {
    activeTicketId = id;
    const ticket = tickets.find(ticket => ticket.id === id);

    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    renderMessages(ticket.messages);
}

// Renderizar as mensagens no chat
function renderMessages(messages) {
    messagesContainer.innerHTML = ''; // Limpa a área de mensagens
    messages.forEach(message => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${message.sender}`; // Adiciona a classe de quem enviou a mensagem

        // Cria a estrutura de exibição da mensagem com o nome do remetente
        const nameDiv = document.createElement('div');
        nameDiv.className = 'sender-name';
        nameDiv.textContent = message.name; // Exibe o nome do remetente

        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        textDiv.textContent = message.text; // Exibe o conteúdo da mensagem

        msgDiv.appendChild(nameDiv); // Adiciona o nome do remetente
        msgDiv.appendChild(textDiv); // Adiciona a mensagem de texto

        messagesContainer.appendChild(msgDiv); // Adiciona a mensagem na área de mensagens
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Garante que a área de mensagens desça até o final
}
// Enviar mensagem do usuário e simular resposta do administrador
function sendMessage() {
    const input = document.getElementById('userInput');
    const userMessage = input.value.trim();
    if (!userMessage || activeTicketId === null) return;

    const ticket = tickets.find(ticket => ticket.id === activeTicketId);
    
    // Adiciona a mensagem do usuário
    ticket.messages.push({ 
        sender: 'user', 
        name: 'João da Silva',  // Nome do usuário
        text: userMessage 
    });

    renderMessages(ticket.messages); // Atualiza as mensagens
    input.value = ''; // Limpa o campo de input

    // Simular resposta do administrador após 1 segundo
    setTimeout(() => {
        const adminMessage = { 
            sender: 'admin', 
            name: 'Administrador',  // Nome do administrador
            text: "Resposta automática do administrador." 
        };
        ticket.messages.push(adminMessage); // Adiciona a mensagem do administrador
        renderMessages(ticket.messages); // Atualiza as mensagens
    }, 1000);
}

// Fechar uma aba de ticket
function closeTab(id) {
    tickets = tickets.filter(ticket => ticket.id !== id);
    if (id === activeTicketId) {
        activeTicketId = tickets.length ? tickets[0].id : null;
        renderTabs();
        if (activeTicketId) openTicket(activeTicketId);
    } else {
        renderTabs();
    }
}

// Inicializar o sistema de tickets
renderTabs();
if (tickets.length) openTicket(tickets[0].id);


// JavaScript para alternar entre as seções da esquerda
function showSection(sectionNumber) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    // Exibir a seção selecionada
    document.getElementById(`section${sectionNumber}`).style.display = 'block';
}

function handleFileSelection() {
    const fileInput = document.getElementById("fileInput");
    const selectedFile = fileInput.files[0]; // Obtém o primeiro arquivo selecionado

    if (selectedFile) {
      // Aqui você pode manipular o arquivo selecionado, exibir o nome ou enviar o arquivo
      alert("Arquivo selecionado: " + selectedFile.name);
    }
  }

  function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    // Aqui você pode enviar a mensagem
    alert("Mensagem enviada: " + userInput);
  }