% to run: swipl pl_server.pl
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_path)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/html_write)).
:- use_module(ofs_sudo_grammar_1pm).

% URL handlers.
:- http_handler('/retrieve', handle_retrieve, [method(get)]).
:- http_handler('/', home, []).

% Folder where files to retrieve are stored.
safe_folder('./scripts.js/').

handle_retrieve(Request) :-
    http_parameters(Request, [filename(Filename, [])]),
    safe_folder(SafeFolder),
    atom_concat(SafeFolder, Filename, FullPath),
    ( exists_file(FullPath) 
      -> read_file_to_string(FullPath, FileContent, []),
        atom_codes(FileContent, Codes),
         (catch(ofs_sudo_grammar_1pm:ofs_program(Codes, Ast), 
         Exception, 
         handle_error(Exception, Codes))
     -> generator(Ast, JSCodeString),
        reply_json_dict(_{content: JSCodeString})
     ;  reply_json_dict(_{error: "Error processing file."})
     )
      ;  reply_json_dict(_{error: "File not found."})
    ).

home(_Request) :-
    reply_html_page(title('File Retrieve Service'),
                    [ h1('To use it:'),
                      p([h4('Send a get messsage'),
                         h4('URI:/retrieve?filename=your_file_name'),
                         h4('Service Responds with JSON containing the file content with header.')])
                    ]).

% Start the server on a specific port.
server(Port) :-
    http_server(http_dispatch, [port(Port)]).

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
:- initialization
    format('*** Starting Server ***~n', []),
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    format('*** Serving on port ~d *** ~n', [Port]),
    server(Port).
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
handle_error(parser_error(NoAceptable), Data) :- !,
    format('Parser Error: ~q with Data: ~q~n', [NoAceptable, Data]).
handle_error(generate_error(NoAceptable), Data) :- !,
    format('Generate Error: ~q with Data: ~q~n', [NoAceptable, Data]).
handle_error(UnknownError, Data) :-
    format('Parser Error: ~q with Data: ~q~n', [UnknownError, Data]).