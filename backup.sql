--
-- PostgreSQL database dump
--

\restrict Fvdsgky6NrYTeW3Lp06gDNj0aYMgTJfvAAfBW0tagUbs5nQZl0en7J2wbIH1Lww

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    nome character varying NOT NULL,
    "limiteGasto" numeric(10,2) NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    "usuarioId" integer
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categoria_id_seq OWNER TO postgres;

--
-- Name: categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;


--
-- Name: despesa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.despesa (
    id integer NOT NULL,
    "nomeDespesa" character varying NOT NULL,
    valor numeric(10,2) NOT NULL,
    "quantidadeParcelas" integer,
    "dataVencimento" date,
    status character varying NOT NULL,
    fixo boolean DEFAULT false NOT NULL,
    "parcelaAtual" integer,
    "grupoParcelas" character varying,
    "categoriaId" integer,
    "formaPagamentoId" integer,
    "usuarioId" integer
);


ALTER TABLE public.despesa OWNER TO postgres;

--
-- Name: despesa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.despesa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.despesa_id_seq OWNER TO postgres;

--
-- Name: despesa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.despesa_id_seq OWNED BY public.despesa.id;


--
-- Name: forma_pagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forma_pagamento (
    id integer NOT NULL,
    nome character varying NOT NULL,
    "tipoPagamento" character varying NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    "usuarioId" integer
);


ALTER TABLE public.forma_pagamento OWNER TO postgres;

--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forma_pagamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.forma_pagamento_id_seq OWNER TO postgres;

--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forma_pagamento_id_seq OWNED BY public.forma_pagamento.id;


--
-- Name: receita; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receita (
    id integer NOT NULL,
    nome character varying NOT NULL,
    "valorSalario" numeric(10,2) NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    "usuarioId" integer
);


ALTER TABLE public.receita OWNER TO postgres;

--
-- Name: receita_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receita_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.receita_id_seq OWNER TO postgres;

--
-- Name: receita_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receita_id_seq OWNED BY public.receita.id;


--
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying NOT NULL,
    "dataNascimento" character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    ativo boolean DEFAULT true NOT NULL
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_seq OWNER TO postgres;

--
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);


--
-- Name: despesa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.despesa ALTER COLUMN id SET DEFAULT nextval('public.despesa_id_seq'::regclass);


--
-- Name: forma_pagamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento ALTER COLUMN id SET DEFAULT nextval('public.forma_pagamento_id_seq'::regclass);


--
-- Name: receita id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receita ALTER COLUMN id SET DEFAULT nextval('public.receita_id_seq'::regclass);


--
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- Data for Name: categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categoria (id, nome, "limiteGasto", ativo, "usuarioId") FROM stdin;
1	Estudos	500.00	t	1
\.


--
-- Data for Name: despesa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.despesa (id, "nomeDespesa", valor, "quantidadeParcelas", "dataVencimento", status, fixo, "parcelaAtual", "grupoParcelas", "categoriaId", "formaPagamentoId", "usuarioId") FROM stdin;
1	Uninter	350.00	12	2026-05-07	Não Pago	f	1	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
2	Uninter	350.00	12	2026-06-07	Não Pago	f	2	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
3	Uninter	350.00	12	2026-07-07	Não Pago	f	3	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
4	Uninter	350.00	12	2026-08-07	Não Pago	f	4	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
5	Uninter	350.00	12	2026-09-07	Não Pago	f	5	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
6	Uninter	350.00	12	2026-10-07	Não Pago	f	6	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
7	Uninter	350.00	12	2026-11-07	Não Pago	f	7	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
8	Uninter	350.00	12	2026-12-07	Não Pago	f	8	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
9	Uninter	350.00	12	2027-01-07	Não Pago	f	9	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
10	Uninter	350.00	12	2027-02-07	Não Pago	f	10	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
11	Uninter	350.00	12	2027-03-07	Não Pago	f	11	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
12	Uninter	350.00	12	2027-04-07	Não Pago	f	12	505ac9ec-781d-40a3-a5d5-eafa2140175a	1	1	1
13	Prestação casa	650.00	\N	2026-05-13	Não Pago	t	\N	\N	1	1	1
\.


--
-- Data for Name: forma_pagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forma_pagamento (id, nome, "tipoPagamento", ativo, "usuarioId") FROM stdin;
1	Sicredi	Conta Bancária / PIX	t	1
\.


--
-- Data for Name: receita; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receita (id, nome, "valorSalario", ativo, "usuarioId") FROM stdin;
1	Elaine	10000.00	t	1
\.


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuario (id, nome, "dataNascimento", email, senha, ativo) FROM stdin;
1	Elaine Santos	1997-02-05	elaine@teste.com	$2b$10$E3v8s5QIXVOj4X0/.zvDlOJVUaI1hTYtdxFeH8BcsFoQFFefQYvQ.	t
\.


--
-- Name: categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categoria_id_seq', 1, true);


--
-- Name: despesa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.despesa_id_seq', 13, true);


--
-- Name: forma_pagamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forma_pagamento_id_seq', 1, true);


--
-- Name: receita_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receita_id_seq', 1, true);


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 1, true);


--
-- Name: forma_pagamento PK_059f733b255fa01d5100a8fa53c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento
    ADD CONSTRAINT "PK_059f733b255fa01d5100a8fa53c" PRIMARY KEY (id);


--
-- Name: despesa PK_180d33aa63e7bae94e289ad23e0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.despesa
    ADD CONSTRAINT "PK_180d33aa63e7bae94e289ad23e0" PRIMARY KEY (id);


--
-- Name: receita PK_2b53bc8637e0b3fbc7978646d73; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receita
    ADD CONSTRAINT "PK_2b53bc8637e0b3fbc7978646d73" PRIMARY KEY (id);


--
-- Name: usuario PK_a56c58e5cabaa04fb2c98d2d7e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);


--
-- Name: categoria PK_f027836b77b84fb4c3a374dc70d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY (id);


--
-- Name: usuario UQ_2863682842e688ca198eb25c124; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);


--
-- Name: despesa FK_38c02126bbcc1516212585dc79a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.despesa
    ADD CONSTRAINT "FK_38c02126bbcc1516212585dc79a" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- Name: categoria FK_3bb40403954737f051775510190; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "FK_3bb40403954737f051775510190" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- Name: receita FK_6217394772dc5cd70f368d047d4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receita
    ADD CONSTRAINT "FK_6217394772dc5cd70f368d047d4" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- Name: despesa FK_6e4b580c8d4a4e42d9665bad4b0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.despesa
    ADD CONSTRAINT "FK_6e4b580c8d4a4e42d9665bad4b0" FOREIGN KEY ("formaPagamentoId") REFERENCES public.forma_pagamento(id);


--
-- Name: despesa FK_aa4f9e225e3194bdba59b36e4b0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.despesa
    ADD CONSTRAINT "FK_aa4f9e225e3194bdba59b36e4b0" FOREIGN KEY ("categoriaId") REFERENCES public.categoria(id);


--
-- Name: forma_pagamento FK_df0eaa7b39872aea77df31efe98; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forma_pagamento
    ADD CONSTRAINT "FK_df0eaa7b39872aea77df31efe98" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);


--
-- PostgreSQL database dump complete
--

\unrestrict Fvdsgky6NrYTeW3Lp06gDNj0aYMgTJfvAAfBW0tagUbs5nQZl0en7J2wbIH1Lww

