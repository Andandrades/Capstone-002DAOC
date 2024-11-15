--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

-- Started on 2024-11-14 14:53:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16885)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16886)
-- Name: exercise_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_history (
    history_id integer NOT NULL,
    created_date date NOT NULL,
    user_id integer NOT NULL,
    class_id integer NOT NULL
);


ALTER TABLE public.exercise_history OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16889)
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Exercise_history_history_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Exercise_history_history_id_seq" OWNER TO postgres;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercise_history_history_id_seq" OWNED BY public.exercise_history.history_id;


--
-- TOC entry 217 (class 1259 OID 16890)
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    plan_id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    offer_price integer,
    type text NOT NULL,
    n_class integer NOT NULL,
    color character varying
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16895)
-- Name: Plans_plan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Plans_plan_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Plans_plan_id_seq" OWNER TO postgres;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Plans_plan_id_seq" OWNED BY public.plans.plan_id;


--
-- TOC entry 219 (class 1259 OID 16896)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name_rol text NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16901)
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_id_seq" OWNER TO postgres;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public.roles.id;


--
-- TOC entry 221 (class 1259 OID 16902)
-- Name: schedule_classes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule_classes (
    class_id integer NOT NULL,
    scheduled_date date NOT NULL,
    actual_cap integer NOT NULL,
    gym_schedule_id integer NOT NULL,
    client_id integer NOT NULL
);


ALTER TABLE public.schedule_classes OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16905)
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Schedule_classes_class_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Schedule_classes_class_id_seq" OWNER TO postgres;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Schedule_classes_class_id_seq" OWNED BY public.schedule_classes.class_id;


--
-- TOC entry 223 (class 1259 OID 16906)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    buy_order character varying NOT NULL,
    session_id character varying NOT NULL,
    token character varying NOT NULL,
    authorization_code character varying(50),
    payment_type_code character varying(50),
    user_id integer,
    plan_id integer,
    amount numeric NOT NULL,
    status character varying(50),
    transaction_date timestamp without time zone
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16911)
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Transactions_transaction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Transactions_transaction_id_seq" OWNER TO postgres;

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transactions_transaction_id_seq" OWNED BY public.transactions.transaction_id;


--
-- TOC entry 225 (class 1259 OID 16912)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text NOT NULL,
    password text NOT NULL,
    register_date date,
    fk_rol_id integer NOT NULL,
    weight integer,
    height integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16917)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public.users.id;


--
-- TOC entry 227 (class 1259 OID 16918)
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    exercise_id integer NOT NULL,
    history_id integer NOT NULL,
    exercise_name text NOT NULL,
    machine text,
    weight integer,
    sets integer,
    repetitions integer,
    total_reps integer,
    notes text
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16923)
-- Name: gym_schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gym_schedule (
    gym_schedule_id integer NOT NULL,
    start_hour time without time zone NOT NULL,
    end_hour time without time zone NOT NULL,
    max_cap integer NOT NULL,
    actual_cap integer NOT NULL,
    admin_id integer NOT NULL,
    schedule_date date NOT NULL
);


ALTER TABLE public.gym_schedule OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16926)
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.gym_schedule_gym_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gym_schedule_gym_schedule_id_seq OWNER TO postgres;

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 229
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_schedule_gym_schedule_id_seq OWNED BY public.gym_schedule.gym_schedule_id;


--
-- TOC entry 230 (class 1259 OID 16927)
-- Name: nutri_schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutri_schedule (
    nutri_schedule_id integer NOT NULL,
    start_hour time without time zone NOT NULL,
    available boolean NOT NULL,
    client_id integer,
    nutri_id integer NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.nutri_schedule OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16930)
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nutri_schedule_nutri_schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nutri_schedule_nutri_schedule_id_seq OWNER TO postgres;

--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 231
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutri_schedule_nutri_schedule_id_seq OWNED BY public.nutri_schedule.nutri_schedule_id;


--
-- TOC entry 232 (class 1259 OID 16931)
-- Name: nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition (
    id integer NOT NULL,
    name character varying,
    description character varying,
    price character varying,
    offer_price integer
);


ALTER TABLE public.nutrition OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16936)
-- Name: nutrition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.nutrition ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.nutrition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16937)
-- Name: suscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscription (
    suscription_id integer NOT NULL,
    start_date date NOT NULL,
    additional_user integer,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    remaining_classes integer
);


ALTER TABLE public.suscription OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17045)
-- Name: suscription_suscription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suscription_suscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suscription_suscription_id_seq OWNER TO postgres;

--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 235
-- Name: suscription_suscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscription_suscription_id_seq OWNED BY public.suscription.suscription_id;


--
-- TOC entry 3223 (class 2604 OID 16940)
-- Name: exercise_history history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history ALTER COLUMN history_id SET DEFAULT nextval('public."Exercise_history_history_id_seq"'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16941)
-- Name: gym_schedule gym_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule ALTER COLUMN gym_schedule_id SET DEFAULT nextval('public.gym_schedule_gym_schedule_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16942)
-- Name: nutri_schedule nutri_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule ALTER COLUMN nutri_schedule_id SET DEFAULT nextval('public.nutri_schedule_nutri_schedule_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 16943)
-- Name: plans plan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN plan_id SET DEFAULT nextval('public."Plans_plan_id_seq"'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16944)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 3226 (class 2604 OID 16945)
-- Name: schedule_classes class_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes ALTER COLUMN class_id SET DEFAULT nextval('public."Schedule_classes_class_id_seq"'::regclass);


--
-- TOC entry 3231 (class 2604 OID 17046)
-- Name: suscription suscription_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription ALTER COLUMN suscription_id SET DEFAULT nextval('public.suscription_suscription_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16946)
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public."Transactions_transaction_id_seq"'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16947)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3414 (class 0 OID 16886)
-- Dependencies: 215
-- Data for Name: exercise_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3426 (class 0 OID 16918)
-- Dependencies: 227
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3427 (class 0 OID 16923)
-- Dependencies: 228
-- Data for Name: gym_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.gym_schedule VALUES (3, '00:00:00', '00:00:00', 1, 1, 31, '2024-11-12');


--
-- TOC entry 3429 (class 0 OID 16927)
-- Dependencies: 230
-- Data for Name: nutri_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3431 (class 0 OID 16931)
-- Dependencies: 232
-- Data for Name: nutrition; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.nutrition VALUES (4, 'Consulta basica', 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina', '30000', 30000);


--
-- TOC entry 3416 (class 0 OID 16890)
-- Dependencies: 217
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.plans VALUES (49, 'Plan basico', 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina', 10000, NULL, 'Individual', 1, '#6f42c1');
INSERT INTO public.plans VALUES (51, 'Especial navidad', 'plan especial para navidad plan especial para navidad plan especial para navidad plan especial para navidad plan especial para navidad ', 123456789, NULL, 'Individual', 10, '#6f42c1');
INSERT INTO public.plans VALUES (50, 'Plan premium', 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto fina', 20000, NULL, 'Individual', 1, '#007bff');


--
-- TOC entry 3418 (class 0 OID 16896)
-- Dependencies: 219
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'Cliente', 'usuario');
INSERT INTO public.roles VALUES (2, 'Entrenador', 'Entrenador');
INSERT INTO public.roles VALUES (4, 'Administrador', 'Administrador');
INSERT INTO public.roles VALUES (3, 'Nutricionista', 'Nutricionista');


--
-- TOC entry 3420 (class 0 OID 16902)
-- Dependencies: 221
-- Data for Name: schedule_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.schedule_classes VALUES (1, '2024-11-12', 1, 3, 31);


--
-- TOC entry 3433 (class 0 OID 16937)
-- Dependencies: 234
-- Data for Name: suscription; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.suscription VALUES (3, '2024-11-12', 32, 31, 50, 10);
INSERT INTO public.suscription VALUES (4, '2024-11-12', 32, 31, 50, 10);
INSERT INTO public.suscription VALUES (5, '2024-11-12', 32, 31, 50, 10);
INSERT INTO public.suscription VALUES (6, '2024-11-12', 32, 31, 50, 10);
INSERT INTO public.suscription VALUES (7, '2024-11-12', 32, 31, 50, 10);


--
-- TOC entry 3422 (class 0 OID 16906)
-- Dependencies: 223
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.transactions VALUES (85, 'Plan basico', 'mi_sesion', '01ab4d442e01790028b8d9c792a9726c4ee3dd5d6c9841efc7cf519564121ae7', '137031', 'VD', 31, NULL, 10000, 'Autorizada', '2024-11-12 16:02:48.863');
INSERT INTO public.transactions VALUES (86, 'Plan premium', 'mi_sesion', '01ab32fe594bf9f8b59b9c2d84a7093ba4d53e253b48598a99e31952b2c45dce', '382195', 'VD', 33, NULL, 20000, 'Autorizada', '2024-11-12 22:20:24.981');
INSERT INTO public.transactions VALUES (87, 'Especial navidad', 'mi_sesion', '01ab27292d91c234931e6e9b9c7cca36730330fba76ea4b197937bb248e727b0', '114436', 'VD', 33, NULL, 123456789, 'Autorizada', '2024-11-12 22:21:22.492');
INSERT INTO public.transactions VALUES (88, 'Plan basico', 'mi_sesion', '01abc8ed6ed2cd23ecc13f9ed2e6245bc7a5e598df7c617070ef91460ad3d1f8', '966778', 'VD', 33, NULL, 10000, 'Autorizada', '2024-11-12 22:23:02.946');
INSERT INTO public.transactions VALUES (89, 'Especial navidad', 'mi_sesion', '01abaee19121eaeb6cc8a2d3847c78255e78891afc8fc8ae3ea6eda5796085e4', '584324', 'VD', 33, NULL, 123456789, 'Autorizada', '2024-11-12 22:28:20.065');
INSERT INTO public.transactions VALUES (90, 'Especial navidad', 'mi_sesion', '01ab9b31eb0053252316015b7933118ba75e050bcef4dc7b200fbf3e84c45c62', '222654', 'VD', 33, NULL, 123456789, 'Autorizada', '2024-11-12 22:29:49.88');
INSERT INTO public.transactions VALUES (91, 'Plan basico', 'mi_sesion', '01ab724dbcf259e8b8ac262884232cb0b9b22802fa11e69d3bae2462a6672d79', '836961', 'VD', 33, NULL, 10000, 'Autorizada', '2024-11-12 22:30:59.526');
INSERT INTO public.transactions VALUES (92, 'Especial navidad', 'mi_sesion', '01abe116c9370b5865e47e018680d218bf604c2596610c1ef5ae9307ee5c2a24', '877161', 'VD', 33, NULL, 123456789, 'Autorizada', '2024-11-12 22:33:53.998');
INSERT INTO public.transactions VALUES (93, 'Especial navidad', 'mi_sesion', '01ab4cdc0244e4a2ac9bd48ceedebb6916152e5ddf0cbfd9fd533b2318f6a69f', '353390', 'VD', 33, NULL, 123456789, 'Autorizada', '2024-11-12 22:37:30.849');
INSERT INTO public.transactions VALUES (94, 'Plan basico', 'mi_sesion', '01ab93510c0fd4f3aa0402db507dc1114f5ec680fafa55f3a14b6d02fb164b07', '157538', 'VD', 33, NULL, 10000, 'Autorizada', '2024-11-12 22:42:40.315');
INSERT INTO public.transactions VALUES (95, 'Plan basico', 'mi_sesion', '01ab65a0d5f9bba97a4fd05e92378bc1e0d1217fd549050aaafbe018c7f61dd3', '737130', 'VD', 33, NULL, 10000, 'Autorizada', '2024-11-12 22:45:03.903');
INSERT INTO public.transactions VALUES (96, 'Consulta basica', 'mi_sesion', '01ab18680674e2e197f8cd5bda7e7f99bc8229274ff1225aa45fe4377a244b3b', NULL, NULL, 33, NULL, 30000, NULL, NULL);
INSERT INTO public.transactions VALUES (97, 'Especial navidad', 'mi_sesion', '01ab42277f8d3feb2fa9c34da025c95327510b416d3b5cd524efb208c1ffa3e1', '197515', 'VD', 33, 51, 123456789, 'Autorizada', '2024-11-12 22:55:17.427');
INSERT INTO public.transactions VALUES (98, 'Especial navidad', 'mi_sesion', '01ab41576c3e5ce5da257308d94aa338493945b2bfca97507b695a40ce97e56c', '167443', 'VD', 33, 51, 123456789, 'Autorizada', '2024-11-12 22:56:19.338');
INSERT INTO public.transactions VALUES (99, 'Plan premium', 'mi_sesion', '01ab9fc560b0326a6da55125eb934837f9ef96c9c64021095df1fe207815d910', '181942', 'VD', 33, 50, 20000, 'Autorizada', '2024-11-12 22:56:54.749');
INSERT INTO public.transactions VALUES (100, 'Plan basico', 'mi_sesion', '01ab6de7e3258c5bf4043fa11f78d93ddf570ae243fff841c45657e6443bcb1a', '108716', 'VD', 33, 49, 10000, 'Autorizada', '2024-11-12 22:58:19.771');


--
-- TOC entry 3424 (class 0 OID 16912)
-- Dependencies: 225
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (31, 'Draken', 'draken@draken.cl', '$2b$10$Ko5KeHnTtgNErCJgNNgrJ.2HJ5.SnVddkGXOopRWyzsTDlfvTit6y', '2024-11-11', 1, NULL, NULL);
INSERT INTO public.users VALUES (32, 'Cliente de ejemplo', 'clientedeejemplo@cliente.cl', '$2b$10$kvbprAsdGZOa9DNUo9KYB.RVpR0TbIoRu3hCAZNX4Va0YoZQMskRm', '2024-11-11', 1, NULL, NULL);
INSERT INTO public.users VALUES (33, 'JWTCLIENTE', 'a@a.cl', '$2b$10$.Qp4InhinmLyR7PHBO7fGeDM9dixOju4bribRcBMinECFkoCC/mVO', '2024-11-11', 1, NULL, NULL);
INSERT INTO public.users VALUES (35, 'Cliente ', 'Cliente@draken.cl', '$2b$10$Ko5KeHnTtgNErCJgNNgrJ.2HJ5.SnVddkGXOopRWyzsTDlfvTit6y', '2024-11-11', 1, NULL, NULL);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercise_history_history_id_seq"', 1, false);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Plans_plan_id_seq"', 51, true);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 3, true);


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Schedule_classes_class_id_seq"', 1, true);


--
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transactions_transaction_id_seq"', 100, true);


--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 48, true);


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 229
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_schedule_gym_schedule_id_seq', 3, true);


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 231
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutri_schedule_nutri_schedule_id_seq', 1, false);


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 233
-- Name: nutrition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_id_seq', 4, true);


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 235
-- Name: suscription_suscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscription_suscription_id_seq', 8, true);


--
-- TOC entry 3233 (class 2606 OID 16949)
-- Name: exercise_history Exercise_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT "Exercise_history_pkey" PRIMARY KEY (history_id);


--
-- TOC entry 3235 (class 2606 OID 16951)
-- Name: plans Plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT "Plans_pkey" PRIMARY KEY (plan_id);


--
-- TOC entry 3237 (class 2606 OID 16953)
-- Name: roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16955)
-- Name: schedule_classes Schedule_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "Schedule_classes_pkey" PRIMARY KEY (class_id);


--
-- TOC entry 3257 (class 2606 OID 16957)
-- Name: suscription Suscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "Suscription_pkey" PRIMARY KEY (suscription_id);


--
-- TOC entry 3243 (class 2606 OID 16959)
-- Name: transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (transaction_id);


--
-- TOC entry 3245 (class 2606 OID 16961)
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3247 (class 2606 OID 16963)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3249 (class 2606 OID 16965)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 3251 (class 2606 OID 16967)
-- Name: gym_schedule gym_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT gym_schedule_pkey PRIMARY KEY (gym_schedule_id);


--
-- TOC entry 3253 (class 2606 OID 16969)
-- Name: nutri_schedule nutri_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT nutri_schedule_pkey PRIMARY KEY (nutri_schedule_id);


--
-- TOC entry 3255 (class 2606 OID 16971)
-- Name: nutrition nutrition_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition
    ADD CONSTRAINT nutrition_pk PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16973)
-- Name: roles roles_name_rol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_rol_key UNIQUE (name_rol);


--
-- TOC entry 3269 (class 2606 OID 16974)
-- Name: suscription fk_ plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "fk_ plan_id" FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3270 (class 2606 OID 16979)
-- Name: suscription fk_additional_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_additional_user FOREIGN KEY (additional_user) REFERENCES public.users(id);


--
-- TOC entry 3266 (class 2606 OID 16984)
-- Name: gym_schedule fk_admin_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 3258 (class 2606 OID 16989)
-- Name: exercise_history fk_class_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES public.schedule_classes(class_id);


--
-- TOC entry 3267 (class 2606 OID 16994)
-- Name: nutri_schedule fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3260 (class 2606 OID 16999)
-- Name: schedule_classes fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3261 (class 2606 OID 17004)
-- Name: schedule_classes fk_gym _schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "fk_gym _schedule_id" FOREIGN KEY (gym_schedule_id) REFERENCES public.gym_schedule(gym_schedule_id);


--
-- TOC entry 3265 (class 2606 OID 17009)
-- Name: exercises fk_history_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT fk_history_id FOREIGN KEY (history_id) REFERENCES public.exercise_history(history_id);


--
-- TOC entry 3268 (class 2606 OID 17014)
-- Name: nutri_schedule fk_nutri_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_nutri_id FOREIGN KEY (nutri_id) REFERENCES public.users(id);


--
-- TOC entry 3262 (class 2606 OID 17019)
-- Name: transactions fk_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_plan_id FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3264 (class 2606 OID 17024)
-- Name: users fk_rol_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_rol_id FOREIGN KEY (fk_rol_id) REFERENCES public.roles(id);


--
-- TOC entry 3271 (class 2606 OID 17029)
-- Name: suscription fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3259 (class 2606 OID 17034)
-- Name: exercise_history fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3263 (class 2606 OID 17039)
-- Name: transactions fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-11-14 14:53:38

--
-- PostgreSQL database dump complete
--

