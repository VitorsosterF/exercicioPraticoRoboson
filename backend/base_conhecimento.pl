% --- base_conhecimento.pl ---
:- use_module(library(lists)).

% Disciplinas (exemplos)
disciplina('bd1').
disciplina('bd2').
disciplina('calc1').
disciplina('calc2').
disciplina('eda').     % Estruturas de Dados
disciplina('alg1').

% Pré-requisitos diretos
pre_requisito('bd2', 'bd1').
pre_requisito('calc2', 'calc1').
pre_requisito('eda', 'alg1').

% Encadeamento de pré-requisitos (transitividade)
% requires(Curso, Pre) é verdadeiro se Pre é (direta ou indiretamente) pré de Curso
requires(Curso, Pre) :-
    pre_requisito(Curso, Pre).
requires(Curso, Pre) :-
    pre_requisito(Curso, X),
    requires(X, Pre).

% Conjunto de todos os pré-requisitos de um curso
todos_pre_requisitos(Curso, Unicos) :-
    findall(P, requires(Curso, P), Ps),
    sort(Ps, Unicos).  % remove duplicados

% Verifica se o aluno pode cursar: todos os pré-requisitos ∈ Concluidas
pode_cursar(Curso, Concluidas) :-
    todos_pre_requisitos(Curso, Ps),
    subset(Ps, Concluidas).

% Lista faltantes = pré-requisitos - concluídas
faltantes(Curso, Concluidas, Faltantes) :-
    todos_pre_requisitos(Curso, Ps),
    subtract(Ps, Concluidas, F),
    sort(F, Faltantes).

% subset/2: verdadeiro se a 1ª lista é subconjunto da 2ª
subset([], _).
subset([H|T], L) :- member(H, L), subset(T, L).
