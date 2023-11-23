/* 
University: Universidad Nacional
School: Escuela de Informatica
Course: Paradigmas de Programación EIF 400
Semester: 2 Year: 2023
Team 02-1pm 
Members:
Luis Lopez Castro id: 402420889
Anderson Mora Aguero id: 115600170
David Morales Hidalgo id: 116300616
Alberto Aguero Herdocia id: 118450651
Project: OneFlowStream (OFS)
SubProyect: BackEndTraspiler
File: lexer.pl 
*/

%%%%%%%%%%%%%%%%%%%%%%%%%%%%% GENERATOR %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- module(generator, [
    formated_time/1,
    options/2,
    generator/2,
    write_ast/1,
    generate_statement/1,
    generate_imports/2,
    generate_expression/2,
    write_unrecognized_statement/1,
    generate_line_comment/1
]).


formated_time(FormattedTimeStamp) :- 
    get_time(TimeStamp),
    format_time(atom(FormattedTimeStamp), '%Y-%m-%d %T', TimeStamp).

options(splash, Splash) :- 
    formated_time(FormattedTimeStamp),
    format(atom(Splash), 'Generated by OFS compiler v 0.0 ~s', [FormattedTimeStamp]).

generator(StatementList, JSCodeString) :-
    options(splash, Splash),
    with_output_to(string(Str), (
        generate_line_comment(comment(Splash)),
        write_ast(StatementList),
        forall(member(Statement, StatementList), generate_statement(Statement))
    )),
    string_concat(Str, "\n", JSCodeString).

% Función para escribir el AST
write_ast(StatementList) :-
    format('/* AST: ~w */\n', [StatementList]).

% Generación de diferentes tipos de declaraciones y expresiones

generate_statement(expr(Expr)) :-
    generate_expression(Expr, ExprStr),
    format('~s;\n', [ExprStr]).

generate_statement(declaration(Type, id(I), Expr)) :-
    generate_expression(Expr, ExprStr),
    format('~s ~s = ~s;\n', [Type, I, ExprStr]).
	


generate_statement(import(Imports, From)) :-
    generate_imports(Imports, ImportsStr),
    format(atom(ImportStr), 'import ~s from "~s"', [ImportsStr, From]),
    write(ImportStr).

%%%%%% Caso por defecto para manejar AST no reconocidos %%%%%


generate_statement(S) :-
    write_unrecognized_statement(S).


generate_imports([Id], IdStr) :-
    generate_expression(Id, IdStr), !.
generate_imports(Ids, IdsStr) :-
    Ids = [_|_], % Asegurarse de que hay más de un elemento
    findall(IdStr, (member(Id, Ids), generate_expression(Id, IdStr)), IdStrs),
    atomic_list_concat(IdStrs, ', ', InnerIdsStr),
    format(atom(IdsStr), '{~s}', [InnerIdsStr]).	

%%
generate_expression(list(id(I), args(R)), ExprStr) :-
	process_args(R, Cadena),
    format(atom(ExprStr), ' ~s~s ', [I,Cadena]).
	
generate_expression(list(args(R)), ExprStr) :-
	process_args(R, Cadena),
    format(atom(ExprStr), ' ~s ', [Cadena]).
	
%%
generate_expression(conditional(expr(C), expr(I), expr(E)), ExprStr) :-
    generate_expression(C, CExprStr),
	generate_expression(I, IExprStr),
	generate_expression(E, EExprStr),
    format(atom(ExprStr), ' ~s? ~s : ~s', [CExprStr,IExprStr,EExprStr]).
	
	
%%% Manejo de llamadas a pipes y ofs funcions %%


generate_expression(pipe(Expr, Next), PipeStr) :-
    generate_expression(Expr, ExprStr),
    ( Next = [] ->
        PipeStr = ExprStr
    ; Next = pipe(_, _) ->
        generate_expression(Next, NextStr),
        format(atom(PipeStr), '~s.~s', [ExprStr, NextStr])
    ).		
	
generate_expression(iterate(int(N), expr(Last)), IterateStr) :-
	number_string(N, NStr),
    generate_expression(Last, LastStr),
    format(atom(IterateStr), 'iterate(~s, ~s)', [NStr, LastStr]).
		
	
generate_expression(filter(expr(Expr)), FilterStr) :-
    generate_expression(Expr, ExprStr),
    format(atom(FilterStr), 'filter(~s)', [ExprStr]).
	
generate_expression(cut(int(N)), CutStr) :-
    number_string(N, NStr),
    format(atom(CutStr), 'cut(~s)', [NStr]).
	
generate_expression(cut(id(Id)), CutStr) :-
    format(atom(CutStr), 'cut(~s)', [Id]).
	
generate_expression(map(expr(Expr)), MapStr) :-
    generate_expression(Expr, ExprStr),
    format(atom(MapStr), 'map(~s)', [ExprStr]).	

% Manejo de llamadas a métodos
generate_expression(method(Object, id(Method)), MethodStr) :-
    generate_expression(Object, ObjectStr),
    format(atom(MethodStr), '~s.~s', [ObjectStr, Method]).

generate_expression(method(Object, MethodCall), MethodStr) :-
    MethodCall = method(_, _),
    generate_expression(Object, ObjectStr),
    generate_expression(MethodCall, MethodCallStr),
    format(atom(MethodStr), '~s.~s', [ObjectStr, MethodCallStr]).
	
generate_expression(method(Object, MethodCall), MethodStr) :-
    MethodCall = cal(_, _),
    generate_expression(Object, ObjectStr),
    generate_method_call(MethodCall, MethodCallStr),
    format(atom(MethodStr), '~s.~s', [ObjectStr, MethodCallStr]).	
	
	
generate_expression(cal(Method, Args), CallStr) :-
    generate_expression(Method, MethodStr),
    generate_arguments(Args, ArgsStr),
    format(atom(CallStr), '~s(~s)', [MethodStr, ArgsStr]).

	
generate_expression(id(X), X) :- !.

generate_expression(literal(int(N)), Str) :- number_string(N, Str), !.

generate_expression(literal(str(S)), Str) :- format(atom(Str), '"~w"', [S]), !.  % Añadido manejo de literales string

generate_expression(Expr, ExprStr) :-
    Expr =.. [Op, Left, Right],
    generate_expression(Left, LeftStr),
    generate_expression(Right, RightStr),
    ( Op = arrow -> % Añadido manejo de expresiones de tipo flecha
        format(atom(ExprStr), '~s => ~s', [LeftStr, RightStr])
    ; format(atom(ExprStr), '~s ~s ~s', [LeftStr, Op, RightStr]) ).


generate_expression(arrow(id(Ident), expr(Body)), ArrowStr) :-
    generate_expression(Body, BodyStr),
    format(atom(ArrowStr), '~s => ~s', [Ident, BodyStr]).


generate_expression(Expr, ExprStr) :-
    Expr =.. [Op, Left, Right],
    generate_expression(Left, LeftStr),
    generate_expression(Right, RightStr),
    format(atom(ExprStr), '~s ~s ~s', [LeftStr, Op, RightStr]).	
	
	
% Generación de expresiones con paréntesis
generate_expression(expr_paren(InnerExpr), ExprStr) :-
    generate_expression(InnerExpr, InnerExprStr),
    format(atom(ExprStr), ' ( ~s )', [InnerExprStr]).
	

	
	


% Generación de la llamada al método
generate_method_call(cal(Method, Args), CallStr) :-
    generate_expression(Method, MethodStr),
    generate_arguments(Args, ArgsStr),
    format(atom(CallStr), '~s(~s)', [MethodStr, ArgsStr]).

% Generación de argumentos de la función
generate_arguments(Args, ArgsStr) :-
    maplist(generate_expression, Args, ArgsStrList),
    atomic_list_concat(ArgsStrList, ', ', ArgsStr).


% Función para manejar AST no reconocidos
write_unrecognized_statement(S) :-
    format('/* Unrecognized statement: ~w */\n', [S]).

% ... funciones para generar expresiones ...

generate_line_comment(comment(Comment)) :-
    format('// ~s\n', [Comment]).