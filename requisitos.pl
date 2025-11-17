% disciplina(Nome)
disciplina(algoritmos).
disciplina(logica).
disciplina(programacao1).
disciplina(programacao2).
disciplina(estrutura_dados).
disciplina(banco_dados).
disciplina(sistemas_operacionais).
disciplina(redes).
disciplina(poo).
disciplina(projeto_software).
disciplina(calculo1).
disciplina(calculo2).
disciplina(fisica1).
disciplina(fisica2).
disciplina(ia).
disciplina(compiladores).
disciplina(grafos).
disciplina(estatistica).
disciplina(engenharia_software).
disciplina(seguranca).
disciplina(web1).
disciplina(web2).
disciplina(bd_avancado).
disciplina(arquitetura_computadores).

% prerequisito(Disciplina, PreRequisito)
prerequisito(programacao2, programacao1).
prerequisito(estrutura_dados, programacao2).
prerequisito(poo, estrutura_dados).
prerequisito(web2, web1).
prerequisito(banco_dados, algoritmos).
prerequisito(bd_avancado, banco_dados).
prerequisito(compiladores, estrutura_dados).
prerequisito(grafos, estrutura_dados).
prerequisito(sistemas_operacionais, arquitetura_computadores).
prerequisito(redes, sistemas_operacionais).
prerequisito(ia, estatistica).
prerequisito(fisica2, fisica1).
prerequisito(calculo2, calculo1).
prerequisito(projeto_software, engenharia_software).
prerequisito(seguranca, redes).

% Regra 1: lista de pré-requisitos diretos
requisitos(Disciplina, Lista) :-
    findall(Req, prerequisito(Disciplina, Req), Lista).

% Regra 2: verifica se uma disciplina existe
existe_disciplina(D) :-
    disciplina(D).

% Regra 3: verifica se uma disciplina tem pré-requisitos
tem_requisitos(D) :-
    prerequisito(D, _).

% Regra 4: verifica se X é pré-requisito indireto de Y
% Ex: programacao1 é prerequisito indireto de estrutura_dados
prerequisito_indireto(X, Y) :-
    prerequisito(Y, X).
prerequisito_indireto(X, Y) :-
    prerequisito(Y, Z),
    prerequisito_indireto(X, Z).
