--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

-- Started on 2024-12-06 20:38:04

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

ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_user_id;
ALTER TABLE ONLY public.exercise_history DROP CONSTRAINT fk_user_id;
ALTER TABLE ONLY public.suscription DROP CONSTRAINT fk_user_id;
ALTER TABLE ONLY public.users DROP CONSTRAINT fk_rol_id;
ALTER TABLE ONLY public.transactions DROP CONSTRAINT fk_plan_id;
ALTER TABLE ONLY public.nutri_schedule DROP CONSTRAINT fk_nutri_id;
ALTER TABLE ONLY public.exercises DROP CONSTRAINT fk_history_id;
ALTER TABLE ONLY public.schedule_classes DROP CONSTRAINT "fk_gym _schedule_id";
ALTER TABLE ONLY public.schedule_classes DROP CONSTRAINT fk_client_id;
ALTER TABLE ONLY public.nutri_schedule DROP CONSTRAINT fk_client_id;
ALTER TABLE ONLY public.exercise_history DROP CONSTRAINT fk_class_id;
ALTER TABLE ONLY public.gym_schedule DROP CONSTRAINT fk_admin_id;
ALTER TABLE ONLY public.suscription DROP CONSTRAINT fk_additional_user;
ALTER TABLE ONLY public.suscription DROP CONSTRAINT "fk_ plan_id";
ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_name_rol_key;
ALTER TABLE ONLY public.nutrition DROP CONSTRAINT nutrition_pk;
ALTER TABLE ONLY public.nutri_schedule DROP CONSTRAINT nutri_schedule_pkey;
ALTER TABLE ONLY public.gym_schedule DROP CONSTRAINT gym_schedule_pkey;
ALTER TABLE ONLY public.exercises DROP CONSTRAINT exercises_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT email;
ALTER TABLE ONLY public.users DROP CONSTRAINT "Users_pkey";
ALTER TABLE ONLY public.transactions DROP CONSTRAINT "Transactions_pkey";
ALTER TABLE ONLY public.suscription DROP CONSTRAINT "Suscription_pkey";
ALTER TABLE ONLY public.schedule_classes DROP CONSTRAINT "Schedule_classes_pkey";
ALTER TABLE ONLY public.roles DROP CONSTRAINT "Roles_pkey";
ALTER TABLE ONLY public.plans DROP CONSTRAINT "Plans_pkey";
ALTER TABLE ONLY public.exercise_history DROP CONSTRAINT "Exercise_history_pkey";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.transactions ALTER COLUMN transaction_id DROP DEFAULT;
ALTER TABLE public.suscription ALTER COLUMN suscription_id DROP DEFAULT;
ALTER TABLE public.schedule_classes ALTER COLUMN class_id DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.plans ALTER COLUMN plan_id DROP DEFAULT;
ALTER TABLE public.nutri_schedule ALTER COLUMN nutri_schedule_id DROP DEFAULT;
ALTER TABLE public.gym_schedule ALTER COLUMN gym_schedule_id DROP DEFAULT;
ALTER TABLE public.exercise_history ALTER COLUMN history_id DROP DEFAULT;
DROP SEQUENCE public.suscription_suscription_id_seq;
DROP TABLE public.suscription;
DROP TABLE public.nutrition;
DROP SEQUENCE public.nutri_schedule_nutri_schedule_id_seq;
DROP TABLE public.nutri_schedule;
DROP SEQUENCE public.gym_schedule_gym_schedule_id_seq;
DROP TABLE public.gym_schedule;
DROP TABLE public.exercises;
DROP SEQUENCE public.exercises_id_seq;
DROP SEQUENCE public.exercise_id_seq;
DROP SEQUENCE public."Users_id_seq";
DROP TABLE public.users;
DROP SEQUENCE public."Transactions_transaction_id_seq";
DROP TABLE public.transactions;
DROP SEQUENCE public."Schedule_classes_class_id_seq";
DROP TABLE public.schedule_classes;
DROP SEQUENCE public."Roles_id_seq";
DROP TABLE public.roles;
DROP SEQUENCE public."Plans_plan_id_seq";
DROP TABLE public.plans;
DROP SEQUENCE public."Exercise_history_history_id_seq";
DROP TABLE public.exercise_history;
DROP SCHEMA public;
--
-- TOC entry 6 (class 2615 OID 33857)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 33858)
-- Name: exercise_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_history (
    history_id integer NOT NULL,
    created_date date NOT NULL,
    user_id integer NOT NULL,
    class_id integer NOT NULL,
    target character varying
);


ALTER TABLE public.exercise_history OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 33863)
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
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercise_history_history_id_seq" OWNED BY public.exercise_history.history_id;


--
-- TOC entry 217 (class 1259 OID 33864)
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
-- TOC entry 218 (class 1259 OID 33869)
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
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Plans_plan_id_seq" OWNED BY public.plans.plan_id;


--
-- TOC entry 219 (class 1259 OID 33870)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name_rol text NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33875)
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
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public.roles.id;


--
-- TOC entry 221 (class 1259 OID 33876)
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
-- TOC entry 222 (class 1259 OID 33879)
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
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Schedule_classes_class_id_seq" OWNED BY public.schedule_classes.class_id;


--
-- TOC entry 223 (class 1259 OID 33880)
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
-- TOC entry 224 (class 1259 OID 33885)
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
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transactions_transaction_id_seq" OWNED BY public.transactions.transaction_id;


--
-- TOC entry 225 (class 1259 OID 33886)
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
    height integer,
    profile_picture bytea,
    last_login date,
    gender character(1)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 33891)
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
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public.users.id;


--
-- TOC entry 227 (class 1259 OID 33892)
-- Name: exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_id_seq OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 33893)
-- Name: exercises_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercises_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercises_id_seq OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 33894)
-- Name: exercises; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercises (
    exercise_id integer DEFAULT nextval('public.exercises_id_seq'::regclass) NOT NULL,
    history_id integer NOT NULL,
    exercise_name text NOT NULL,
    machine text,
    weight integer,
    sets integer,
    repetitions integer,
    total_reps integer,
    notes text,
    image bytea,
    target character varying,
    exercise_api_id integer
);


ALTER TABLE public.exercises OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 33900)
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
-- TOC entry 231 (class 1259 OID 33903)
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
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 231
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_schedule_gym_schedule_id_seq OWNED BY public.gym_schedule.gym_schedule_id;


--
-- TOC entry 232 (class 1259 OID 33904)
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
-- TOC entry 233 (class 1259 OID 33907)
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
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 233
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutri_schedule_nutri_schedule_id_seq OWNED BY public.nutri_schedule.nutri_schedule_id;


--
-- TOC entry 234 (class 1259 OID 33908)
-- Name: nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition (
    id integer NOT NULL,
    name character varying,
    description character varying,
    price integer,
    offer_price integer
);


ALTER TABLE public.nutrition OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 33913)
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
-- TOC entry 236 (class 1259 OID 33914)
-- Name: suscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscription (
    suscription_id integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    additional_user integer,
    user_id integer NOT NULL,
    plan_id integer NOT NULL,
    remaining_classes integer
);


ALTER TABLE public.suscription OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 33917)
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
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 237
-- Name: suscription_suscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suscription_suscription_id_seq OWNED BY public.suscription.suscription_id;


--
-- TOC entry 3225 (class 2604 OID 33918)
-- Name: exercise_history history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history ALTER COLUMN history_id SET DEFAULT nextval('public."Exercise_history_history_id_seq"'::regclass);


--
-- TOC entry 3232 (class 2604 OID 33919)
-- Name: gym_schedule gym_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule ALTER COLUMN gym_schedule_id SET DEFAULT nextval('public.gym_schedule_gym_schedule_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 33920)
-- Name: nutri_schedule nutri_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule ALTER COLUMN nutri_schedule_id SET DEFAULT nextval('public.nutri_schedule_nutri_schedule_id_seq'::regclass);


--
-- TOC entry 3226 (class 2604 OID 33921)
-- Name: plans plan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN plan_id SET DEFAULT nextval('public."Plans_plan_id_seq"'::regclass);


--
-- TOC entry 3227 (class 2604 OID 33922)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 3228 (class 2604 OID 33923)
-- Name: schedule_classes class_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes ALTER COLUMN class_id SET DEFAULT nextval('public."Schedule_classes_class_id_seq"'::regclass);


--
-- TOC entry 3234 (class 2604 OID 33924)
-- Name: suscription suscription_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription ALTER COLUMN suscription_id SET DEFAULT nextval('public.suscription_suscription_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 33925)
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public."Transactions_transaction_id_seq"'::regclass);


--
-- TOC entry 3230 (class 2604 OID 33926)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3417 (class 0 OID 33858)
-- Dependencies: 215
-- Data for Name: exercise_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3431 (class 0 OID 33894)
-- Dependencies: 229
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3432 (class 0 OID 33900)
-- Dependencies: 230
-- Data for Name: gym_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3434 (class 0 OID 33904)
-- Dependencies: 232
-- Data for Name: nutri_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3436 (class 0 OID 33908)
-- Dependencies: 234
-- Data for Name: nutrition; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3419 (class 0 OID 33864)
-- Dependencies: 217
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3421 (class 0 OID 33870)
-- Dependencies: 219
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'Cliente', 'usuario');
INSERT INTO public.roles VALUES (2, 'Entrenador', 'Entrenador');
INSERT INTO public.roles VALUES (4, 'Administrador', 'Administrador');
INSERT INTO public.roles VALUES (3, 'Nutricionista', 'Nutricionista');


--
-- TOC entry 3423 (class 0 OID 33876)
-- Dependencies: 221
-- Data for Name: schedule_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3438 (class 0 OID 33914)
-- Dependencies: 236
-- Data for Name: suscription; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3425 (class 0 OID 33880)
-- Dependencies: 223
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3427 (class 0 OID 33886)
-- Dependencies: 225
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercise_history_history_id_seq"', 1, false);


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Plans_plan_id_seq"', 1, false);


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 3, true);


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Schedule_classes_class_id_seq"', 1, false);


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transactions_transaction_id_seq"', 1, false);


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 1, false);


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 227
-- Name: exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_id_seq', 1, false);


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 228
-- Name: exercises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercises_id_seq', 6, true);


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 231
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_schedule_gym_schedule_id_seq', 1, false);


--
-- TOC entry 3465 (class 0 OID 0)
-- Dependencies: 233
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutri_schedule_nutri_schedule_id_seq', 1, false);


--
-- TOC entry 3466 (class 0 OID 0)
-- Dependencies: 235
-- Name: nutrition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_id_seq', 1, false);


--
-- TOC entry 3467 (class 0 OID 0)
-- Dependencies: 237
-- Name: suscription_suscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.suscription_suscription_id_seq', 1, false);


--
-- TOC entry 3236 (class 2606 OID 33939)
-- Name: exercise_history Exercise_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT "Exercise_history_pkey" PRIMARY KEY (history_id);


--
-- TOC entry 3238 (class 2606 OID 33941)
-- Name: plans Plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT "Plans_pkey" PRIMARY KEY (plan_id);


--
-- TOC entry 3240 (class 2606 OID 33943)
-- Name: roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 33945)
-- Name: schedule_classes Schedule_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "Schedule_classes_pkey" PRIMARY KEY (class_id);


--
-- TOC entry 3260 (class 2606 OID 33947)
-- Name: suscription Suscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "Suscription_pkey" PRIMARY KEY (suscription_id);


--
-- TOC entry 3246 (class 2606 OID 33949)
-- Name: transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (transaction_id);


--
-- TOC entry 3248 (class 2606 OID 33951)
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 33953)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3252 (class 2606 OID 33955)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 3254 (class 2606 OID 33957)
-- Name: gym_schedule gym_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT gym_schedule_pkey PRIMARY KEY (gym_schedule_id);


--
-- TOC entry 3256 (class 2606 OID 33959)
-- Name: nutri_schedule nutri_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT nutri_schedule_pkey PRIMARY KEY (nutri_schedule_id);


--
-- TOC entry 3258 (class 2606 OID 33961)
-- Name: nutrition nutrition_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition
    ADD CONSTRAINT nutrition_pk PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 33963)
-- Name: roles roles_name_rol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_rol_key UNIQUE (name_rol);


--
-- TOC entry 3272 (class 2606 OID 33964)
-- Name: suscription fk_ plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "fk_ plan_id" FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3273 (class 2606 OID 33969)
-- Name: suscription fk_additional_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_additional_user FOREIGN KEY (additional_user) REFERENCES public.users(id);


--
-- TOC entry 3269 (class 2606 OID 33974)
-- Name: gym_schedule fk_admin_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 3261 (class 2606 OID 33979)
-- Name: exercise_history fk_class_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES public.schedule_classes(class_id);


--
-- TOC entry 3270 (class 2606 OID 33984)
-- Name: nutri_schedule fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3263 (class 2606 OID 33989)
-- Name: schedule_classes fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3264 (class 2606 OID 33994)
-- Name: schedule_classes fk_gym _schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "fk_gym _schedule_id" FOREIGN KEY (gym_schedule_id) REFERENCES public.gym_schedule(gym_schedule_id);


--
-- TOC entry 3268 (class 2606 OID 33999)
-- Name: exercises fk_history_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT fk_history_id FOREIGN KEY (history_id) REFERENCES public.exercise_history(history_id);


--
-- TOC entry 3271 (class 2606 OID 34004)
-- Name: nutri_schedule fk_nutri_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_nutri_id FOREIGN KEY (nutri_id) REFERENCES public.users(id);


--
-- TOC entry 3265 (class 2606 OID 34009)
-- Name: transactions fk_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_plan_id FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3267 (class 2606 OID 34014)
-- Name: users fk_rol_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_rol_id FOREIGN KEY (fk_rol_id) REFERENCES public.roles(id);


--
-- TOC entry 3274 (class 2606 OID 34019)
-- Name: suscription fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3262 (class 2606 OID 34024)
-- Name: exercise_history fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3266 (class 2606 OID 34029)
-- Name: transactions fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2024-12-06 20:38:05

--
-- PostgreSQL database dump complete
--

