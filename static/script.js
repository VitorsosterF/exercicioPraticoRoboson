// Lista de disciplinas (igual ao Prolog)
const disciplinas = [
    "algoritmos","logica","programacao1","programacao2","estrutura_dados",
    "banco_dados","sistemas_operacionais","redes","poo","projeto_software",
    "calculo1","calculo2","fisica1","fisica2","ia","compiladores","grafos",
    "estatistica","engenharia_software","seguranca","web1","web2",
    "bd_avancado","arquitetura_computadores"
];

const container = document.getElementById("disciplinas-container");

// Criar checkboxes automaticamente
disciplinas.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("disc-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = d;

    const label = document.createElement("label");
    label.textContent = d;

    div.appendChild(checkbox);
    div.appendChild(label);
    container.appendChild(div);
});

document.getElementById("btn-verificar").addEventListener("click", async () => {

    const disciplinaDesejada = document.getElementById("disciplina-desejada").value.trim();
    const resultado = document.getElementById("resultado");

    if (!disciplinaDesejada) {
        resultado.innerHTML = "<b>Digite a disciplina desejada.</b>";
        resultado.style.background = "#ffe0e0";
        return;
    }

    // Coletar disciplinas concluídas
    const concluídas = [];
    document.querySelectorAll("#disciplinas-container input:checked")
        .forEach(chk => concluídas.push(chk.value));

    // Enviar para API
    try {
        const resposta = await fetch("http://localhost:8000/pode_cursar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                disciplina: disciplinaDesejada,
                concluidas: concluídas
            })
        });

        const data = await resposta.json();

        if (data.erro) {
            resultado.innerHTML = `<b>Erro:</b> ${data.erro}`;
            resultado.style.background = "#ffe0e0";
            return;
        }

        if (data.pode) {
            resultado.style.background = "#d4ffd4";
            resultado.innerHTML = `
                👍 <b>Sim!</b> Você pode cursar <b>${disciplinaDesejada}</b>.
            `;
        } else {
            resultado.style.background = "#ffe0e0";
            resultado.innerHTML = `
                ❌ <b>Não pode cursar ${disciplinaDesejada}</b><br>
                <b>Falta completar:</b> ${data.faltando.join(", ")}
            `;
        }

    } catch (err) {
        resultado.innerHTML = "<b>Erro ao conectar com o servidor.</b>";
        resultado.style.background = "#ffe0e0";
    }
});
