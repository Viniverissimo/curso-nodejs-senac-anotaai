/*	ANOTA AI	*/

CREATE DATABASE db_anotaai; -- Comando que cria um Banco de Dados

CREATE TABLE tb_usuario(
	id_usuario	INT 			AUTO_INCREMENT PRIMARY KEY
	,nome 		VARCHAR(255) 	NOT NULL
	,data_nasc 	DATE 			NOT NULL
	,email 		VARCHAR(255)	NOT NULL	UNIQUE
    ,senha		VARCHAR(255) 	NOT NULL
);

CREATE TABLE tb_anotacao(
	id_anotacao			INT 			AUTO_INCREMENT PRIMARY KEY
	,descricao 			VARCHAR(255) 	NOT NULL
	,data_finalizacao 	DATETIME		NULL
    ,data_criacao		DATETIME		NOT NULL
    ,id_usuario			INT				NULL
    
    ,FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id_usuario)
);

INSERT INTO tb_usuario(nome,data_nasc,email,senha) 
VALUES 
(
	'Vinicius'
    ,'1997-11-12'
    ,'vinicius@teste.com.br'
    ,'123456@'
),
(
	'Bianca'
    ,'1997-01-20'
    ,'bianca@teste.com.br'
    ,'123456@'
);

INSERT INTO tb_anotacao(descricao,data_finalizacao,data_criacao,id_usuario) 
VALUES 
(
	'Xburger,Batata,Refri'
    ,'2025-10-18 11:38:20'
    ,'2025-10-18 10:00:54'
    ,'3'
),
(
	'Xbacon e batata'
    ,'2025-10-18 11:18:43'
    ,'2025-10-18 10:04:43'
    ,'4'
),
(
	'Xsalada'
    ,'2025-10-18 13:45:31'
    ,'2025-10-18 13:01:56'
    ,NULL
);

SELECT * FROM tb_usuario;
SELECT * FROM tb_anotacao;