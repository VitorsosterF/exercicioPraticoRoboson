from fastapi import FastAPI
from pyswip import Prolog

app = FastAPI()
prolog = Prolog()

prolog.consult("disciplinas.pl")

@app.get("/requisitos/{disc}")
def get_requisitos(disc: str):
    query = f"requisitos({disc}, L)"
    result = list(prolog.query(query))
    if result:
        return {"disciplina": disc, "requisitos": result[0]["L"]}
    return {"erro": "Disciplina não encontrada ou sem requisitos"}

@app.get("/existe/{disc}")
def existe_disciplina(disc: str):
    query = f"existe_disciplina({disc})"
    result = list(prolog.query(query))
    return {"existe": len(result) > 0}

@app.get("/tem_requisitos/{disc}")
def tem_requisitos(disc: str):
    query = f"tem_requisitos({disc})"
    result = list(prolog.query(query))
    return {"tem_requisitos": len(result) > 0}

@app.get("/indireto/{x}/{y}")
def prerequisito_indireto(x: str, y: str):
    query = f"prerequisito_indireto({x}, {y})"
    result = list(prolog.query(query))
    return {"indireto": len(result) > 0}
