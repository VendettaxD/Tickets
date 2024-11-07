        // Função para alternar entre as abas
        function openTab(tabId) {
            // Remove a classe "active" de todas as abas e conteúdos
            let tabs = document.querySelectorAll(".tab");
            let contents = document.querySelectorAll(".tab-content");
            tabs.forEach(tab => tab.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Adiciona a classe "active" para a aba e conteúdo selecionado
            document.querySelector(`[onclick="openTab('${tabId}')"]`).classList.add("active");
            document.getElementById(tabId).classList.add("active");
        }

        function showContainer(containerId) {
            const containers = document.querySelectorAll('.container-options');
            containers.forEach(container => {
                container.style.display = 'none';
            });

            const selectedContainer = document.getElementById(containerId);
            selectedContainer.style.display = 'flex';
        }
