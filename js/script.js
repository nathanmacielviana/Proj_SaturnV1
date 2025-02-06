document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // Abre/fecha o menu ao clicar no botão
    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link dentro dele
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function () {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Fecha o menu ao clicar fora dele
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });

    // Fecha o menu ao pressionar a tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            menuToggle.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
});


const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        mensagem: formData.get('mensagem')
    };

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);

        // Enviar e-mail
        await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: 'saturnfrontwork',
                subject: 'Novo contato via formulário',
                text: `Nome: ${data.nome}\nE-mail: ${data.email}\nMensagem: ${data.mensagem}`
            })
        });
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        alert('Erro ao enviar formulário. Tente novamente.');
    }
});
