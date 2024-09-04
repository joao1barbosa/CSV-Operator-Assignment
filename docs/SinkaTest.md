Teste desenvolvedor

	Objetivo
		Criar um sistema de importação de dados CSV e distribuição entre operadores cadastrados.

	Necessidades
		- Cadastrar Operadores
			- Somente Nome
		- Importar um arquivo CSV
			- Exemplo de CSV no Anexo 1
		- Salvar os dados importados
		- Distribuir os clientes entre os operadores
			- A distribuição deverá se sequencial
			- Ex:
				CSV:
					Cliente 1
					Cliente 2
					Cliente 3
					Cliente 4
					Cliente 5

				Operadores:
					Operador 1
					Operador 2
					Operador 3

				Distribuição:
					Operador 1
						Cliente 1
						Cliente 4
					Operador 2
						Cliente 2
						Cliente 5
					Operador 3
						Cliente 3
		- Exibir uma lista de operadores com seus devidos clientes

	Requisitos
		- Utilização de GIT
		- Framework Backend e Frontend
		- Stack Recomendada
			- Node.js+MySQL+React.js

	Diferencial
		- Exportar dados em formato CSV
		- Disponibilizar o projeto em uma cloud para testes e nos enviar o link para utilizarmos como usuários
		- CRUD dos Operadores
		- Função para redistribuir clientes(caso mais operadores sejam adicionados após importação)
		- Testes

	O que será avaliado:
		- Lógica utilizada
		- Utilização de Clean Code
		- Estruturação das tabelas
		- Validação e cleanup dos dados
		- Documentação para testes e execução
		- UI/UX


ANEXO 1 - Exemplo CSV
nome, nascimento, valor, email
Cliente 01, 25/05/1985, 042.42, cliente01@teste.com.br
Cliente 02, 04/05/1973, 153.73, cliente02@teste.com.br
Cliente 03, 20/08/1977, 282.11, cliente03@teste.com.br
Cliente 04, 31/10/1981, 967.29, cliente04@teste.com.br
Cliente 05, 18/11/1984, 835.39, cliente05@teste.com.br
Cliente 06, 09/10/1985, 335.52, cliente06@teste.com.br
Cliente 07, 12/05/1990, 373.86, cliente07@teste.com.br
Cliente 08, 05/10/1992, 908.19, cliente08@teste.com.br
Cliente 09, 02/04/1998, 943.71, cliente09@teste.com.br
Cliente 10, 07/06/2002, 410.67, cliente11@teste.com.br