--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8

-- Started on 2024-10-21 10:50:21

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 33290)
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
-- TOC entry 216 (class 1259 OID 33293)
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
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Exercise_history_history_id_seq" OWNED BY public.exercise_history.history_id;


--
-- TOC entry 217 (class 1259 OID 33294)
-- Name: plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plans (
    plan_id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    n_class integer NOT NULL,
    type text NOT NULL
);


ALTER TABLE public.plans OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 33299)
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
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Plans_plan_id_seq" OWNED BY public.plans.plan_id;


--
-- TOC entry 219 (class 1259 OID 33300)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name_rol text NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 33305)
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
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Roles_id_seq" OWNED BY public.roles.id;


--
-- TOC entry 221 (class 1259 OID 33306)
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
-- TOC entry 222 (class 1259 OID 33309)
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
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Schedule_classes_class_id_seq" OWNED BY public.schedule_classes.class_id;


--
-- TOC entry 223 (class 1259 OID 33310)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    amount integer NOT NULL,
    transaction_status character varying(20) NOT NULL,
    transaction_date date NOT NULL,
    webpay_token text NOT NULL,
    response_code text NOT NULL,
    payment_type text NOT NULL,
    user_id integer NOT NULL,
    plan_id integer NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 33315)
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
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Transactions_transaction_id_seq" OWNED BY public.transactions.transaction_id;


--
-- TOC entry 225 (class 1259 OID 33316)
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
-- TOC entry 226 (class 1259 OID 33321)
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
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public.users.id;


--
-- TOC entry 227 (class 1259 OID 33322)
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
-- TOC entry 228 (class 1259 OID 33327)
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
-- TOC entry 229 (class 1259 OID 33330)
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
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 229
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.gym_schedule_gym_schedule_id_seq OWNED BY public.gym_schedule.gym_schedule_id;


--
-- TOC entry 230 (class 1259 OID 33331)
-- Name: nutri_schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutri_schedule (
    nutri_schedule_id integer NOT NULL,
    start_hour time without time zone NOT NULL,
    available boolean NOT NULL,
    client_id integer,
    nutri_id integer NOT NULL,
    "Date" date NOT NULL
);


ALTER TABLE public.nutri_schedule OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 33334)
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
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 231
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nutri_schedule_nutri_schedule_id_seq OWNED BY public.nutri_schedule.nutri_schedule_id;


--
-- TOC entry 232 (class 1259 OID 33335)
-- Name: nutrition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nutrition (
    id integer NOT NULL,
    name character varying,
    description character varying,
    price character varying
);


ALTER TABLE public.nutrition OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 33340)
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
-- TOC entry 234 (class 1259 OID 33341)
-- Name: suscription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suscription (
    suscription_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    additional_user integer,
    user_id integer NOT NULL,
    plan_id integer NOT NULL
);


ALTER TABLE public.suscription OWNER TO postgres;

--
-- TOC entry 3222 (class 2604 OID 33344)
-- Name: exercise_history history_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history ALTER COLUMN history_id SET DEFAULT nextval('public."Exercise_history_history_id_seq"'::regclass);


--
-- TOC entry 3228 (class 2604 OID 33345)
-- Name: gym_schedule gym_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule ALTER COLUMN gym_schedule_id SET DEFAULT nextval('public.gym_schedule_gym_schedule_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 33346)
-- Name: nutri_schedule nutri_schedule_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule ALTER COLUMN nutri_schedule_id SET DEFAULT nextval('public.nutri_schedule_nutri_schedule_id_seq'::regclass);


--
-- TOC entry 3223 (class 2604 OID 33347)
-- Name: plans plan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans ALTER COLUMN plan_id SET DEFAULT nextval('public."Plans_plan_id_seq"'::regclass);


--
-- TOC entry 3224 (class 2604 OID 33348)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);


--
-- TOC entry 3225 (class 2604 OID 33349)
-- Name: schedule_classes class_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes ALTER COLUMN class_id SET DEFAULT nextval('public."Schedule_classes_class_id_seq"'::regclass);


--
-- TOC entry 3226 (class 2604 OID 33350)
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public."Transactions_transaction_id_seq"'::regclass);


--
-- TOC entry 3227 (class 2604 OID 33351)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 3412 (class 0 OID 33290)
-- Dependencies: 215
-- Data for Name: exercise_history; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3424 (class 0 OID 33322)
-- Dependencies: 227
-- Data for Name: exercises; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3425 (class 0 OID 33327)
-- Dependencies: 228
-- Data for Name: gym_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3427 (class 0 OID 33331)
-- Dependencies: 230
-- Data for Name: nutri_schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3429 (class 0 OID 33335)
-- Dependencies: 232
-- Data for Name: nutrition; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.nutrition VALUES (0, 'Consulta basica', 'lorem ipsum dolor ola como estaslorem ipsum dolor ola como estas', '40000');
INSERT INTO public.nutrition VALUES (1, 'Consulta personalizada', 'lorem ipsum dolor ola como estaslorem ipsum dolor ola como estas', '60000');
INSERT INTO public.nutrition VALUES (2, 'nomre', 'des ', '1');
INSERT INTO public.nutrition VALUES (3, 'nomre', 'des ', '1');


--
-- TOC entry 3414 (class 0 OID 33294)
-- Dependencies: 217
-- Data for Name: plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.plans VALUES (1, 'Consulta personalisada', 'lorem ipsum dolor ola como estas', 60000, 3, '10000');
INSERT INTO public.plans VALUES (2, 'Consulta personalisada', 'lorem ipsum dolor ola como estas', 60000, 3, '10000');
INSERT INTO public.plans VALUES (3, 'Consulta personalisada', 'lorem ipsum dolor ola como estas', 60000, 3, '10000');
INSERT INTO public.plans VALUES (4, 'postman', 'se añadio este desde el postman', 50000, 3, 'el tipo no se que es');


--
-- TOC entry 3416 (class 0 OID 33300)
-- Dependencies: 219
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'admin', 'el papu');


--
-- TOC entry 3418 (class 0 OID 33306)
-- Dependencies: 221
-- Data for Name: schedule_classes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3431 (class 0 OID 33341)
-- Dependencies: 234
-- Data for Name: suscription; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3420 (class 0 OID 33310)
-- Dependencies: 223
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3422 (class 0 OID 33316)
-- Dependencies: 225
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'papu', 'andandrades@duocuc.cl', 'a123a123a123', '2024-10-19', 1, 12, 12);
INSERT INTO public.users VALUES (2, 'papu', '1', '1', '2024-10-19', 1, 12, 12);
INSERT INTO public.users VALUES (5, NULL, 'and.andrades@duocuc.cl', '$2b$10$W8375KfVsxt55vodfDD8VOkMMlDCgjvgnIN0JnfnavHq7pCDbvZhW', '2024-10-19', 1, NULL, NULL);


--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 216
-- Name: Exercise_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Exercise_history_history_id_seq"', 1, false);


--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 218
-- Name: Plans_plan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Plans_plan_id_seq"', 4, true);


--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 220
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Roles_id_seq"', 1, true);


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 222
-- Name: Schedule_classes_class_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Schedule_classes_class_id_seq"', 1, false);


--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 224
-- Name: Transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Transactions_transaction_id_seq"', 1, false);


--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 226
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 5, true);


--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 229
-- Name: gym_schedule_gym_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gym_schedule_gym_schedule_id_seq', 1, false);


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 231
-- Name: nutri_schedule_nutri_schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutri_schedule_nutri_schedule_id_seq', 1, false);


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 233
-- Name: nutrition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nutrition_id_seq', 3, true);


--
-- TOC entry 3231 (class 2606 OID 33353)
-- Name: exercise_history Exercise_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT "Exercise_history_pkey" PRIMARY KEY (history_id);


--
-- TOC entry 3233 (class 2606 OID 33355)
-- Name: plans Plans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plans
    ADD CONSTRAINT "Plans_pkey" PRIMARY KEY (plan_id);


--
-- TOC entry 3235 (class 2606 OID 33357)
-- Name: roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 33359)
-- Name: schedule_classes Schedule_classes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "Schedule_classes_pkey" PRIMARY KEY (class_id);


--
-- TOC entry 3255 (class 2606 OID 33361)
-- Name: suscription Suscription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "Suscription_pkey" PRIMARY KEY (suscription_id);


--
-- TOC entry 3241 (class 2606 OID 33363)
-- Name: transactions Transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (transaction_id);


--
-- TOC entry 3243 (class 2606 OID 33365)
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 3245 (class 2606 OID 33367)
-- Name: users email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email UNIQUE (email);


--
-- TOC entry 3247 (class 2606 OID 33369)
-- Name: exercises exercises_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT exercises_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 3249 (class 2606 OID 33371)
-- Name: gym_schedule gym_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT gym_schedule_pkey PRIMARY KEY (gym_schedule_id);


--
-- TOC entry 3251 (class 2606 OID 33373)
-- Name: nutri_schedule nutri_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT nutri_schedule_pkey PRIMARY KEY (nutri_schedule_id);


--
-- TOC entry 3253 (class 2606 OID 33451)
-- Name: nutrition nutrition_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutrition
    ADD CONSTRAINT nutrition_pk PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 33377)
-- Name: roles roles_name_rol_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_rol_key UNIQUE (name_rol);


--
-- TOC entry 3267 (class 2606 OID 33378)
-- Name: suscription fk_ plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT "fk_ plan_id" FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3268 (class 2606 OID 33383)
-- Name: suscription fk_additional_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_additional_user FOREIGN KEY (additional_user) REFERENCES public.users(id);


--
-- TOC entry 3264 (class 2606 OID 33388)
-- Name: gym_schedule fk_admin_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gym_schedule
    ADD CONSTRAINT fk_admin_id FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 3256 (class 2606 OID 33393)
-- Name: exercise_history fk_class_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES public.schedule_classes(class_id);


--
-- TOC entry 3265 (class 2606 OID 33398)
-- Name: nutri_schedule fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3258 (class 2606 OID 33403)
-- Name: schedule_classes fk_client_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT fk_client_id FOREIGN KEY (client_id) REFERENCES public.users(id);


--
-- TOC entry 3259 (class 2606 OID 33408)
-- Name: schedule_classes fk_gym _schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule_classes
    ADD CONSTRAINT "fk_gym _schedule_id" FOREIGN KEY (gym_schedule_id) REFERENCES public.gym_schedule(gym_schedule_id);


--
-- TOC entry 3263 (class 2606 OID 33413)
-- Name: exercises fk_history_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercises
    ADD CONSTRAINT fk_history_id FOREIGN KEY (history_id) REFERENCES public.exercise_history(history_id);


--
-- TOC entry 3266 (class 2606 OID 33418)
-- Name: nutri_schedule fk_nutri_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nutri_schedule
    ADD CONSTRAINT fk_nutri_id FOREIGN KEY (nutri_id) REFERENCES public.users(id);


--
-- TOC entry 3260 (class 2606 OID 33423)
-- Name: transactions fk_plan_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_plan_id FOREIGN KEY (plan_id) REFERENCES public.plans(plan_id);


--
-- TOC entry 3262 (class 2606 OID 33428)
-- Name: users fk_rol_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fk_rol_id FOREIGN KEY (fk_rol_id) REFERENCES public.roles(id);


--
-- TOC entry 3269 (class 2606 OID 33433)
-- Name: suscription fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suscription
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3257 (class 2606 OID 33438)
-- Name: exercise_history fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_history
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3261 (class 2606 OID 33443)
-- Name: transactions fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-10-21 10:50:21

--
-- PostgreSQL database dump complete
--

