// frontend/script.js
function parseLista(texto) {
  return (texto || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

document.getElementById("btn").addEventListener("click", async () => {
  const concluidasTxt = document.getElementById("concluidas").value;
  const curso = document.getElementById("curso").value.trim();
  const concluidas = parseLista(concluidasTxt);

  const resDiv = document.getElementById("resultado");
  resDiv.innerHTML = "";

  try {
    const resp = await fetch("/api/pode_cursar", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ curso, concluidas })
    });

    const data = await resp.json();

    if (!resp.ok) {
      resDiv.innerHTML = `<div class="err"><strong>Erro:</strong> ${data.error || "Falha na verificação."}</div>`;
      return;
    }

    if (data.erro) {
      resDiv.innerHTML = `<div class="warn"><strong>Aviso:</strong> ${data.erro}</div>`;
      return;
    }

    if (data.pode) {
      resDiv.innerHTML = `<div class="ok">✅ Você pode cursar <strong>${data.curso}</strong>. Todos os pré-requisitos foram atendidos.</div>`;
    } else {
      const falt = (data.faltantes || []).join(", ");
      resDiv.innerHTML = `<div class="warn">⚠️ Faltam pré-requisitos para <strong>${data.curso}</strong>: <em>${falt || "(lista vazia)"}</em>.</div>`;
    }
  } catch (e) {
    resDiv.innerHTML = `<div class="err"><strong>Erro inesperado:</strong> ${e?.message || e}</div>`;
  }
});
