# --- app.py ---
from flask import Flask, request, jsonify
from pyswip import Prolog

app = Flask(__name__)
prolog = Prolog()
prolog.consult("backend/base_conhecimento.pl")

def to_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return [str(v) for v in value]
    return [str(value)]

@app.post("/api/pode_cursar")
def api_pode_cursar():
    data = request.get_json(force=True)
    curso = str(data.get("curso", "")).strip()
    concluidas = [str(x).strip() for x in data.get("concluidas", [])]

    if not curso:
        return jsonify({"error": "Informe o campo 'curso'."}), 400

    # Pergunta ao Prolog quais faltam
    q = list(prolog.query(f"faltantes('{curso}', {concluidas}, F)."))
    if not q:
        # Curso inexistente ou algum problema de consulta
        return jsonify({
            "curso": curso,
            "pode": False,
            "faltantes": [],
            "erro": "Curso inexistente ou sem definição de pré-requisitos."
        }), 200

    faltantes = to_list(q[0].get("F"))
    pode = len(faltantes) == 0

    return jsonify({
        "curso": curso,
        "pode": pode,
        "faltantes": faltantes
    }), 200

if __name__ == "__main__":
    app.run(debug=True)
