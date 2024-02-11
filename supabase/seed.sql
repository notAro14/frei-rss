--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', 'e7c1dc49-ab60-4099-afda-adffc5ac1e75', 'authenticated', 'authenticated', 'mamitiana.dev.js@gmail.com', '', '2023-11-27 19:49:04.420814+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-02-08 21:20:18.775578+00', '{"provider": "github", "providers": ["github"]}', '{"iss": "https://api.github.com", "sub": "47597252", "name": "Aro", "email": "tech@andriamaro.com", "full_name": "Aro", "user_name": "notAro14", "avatar_url": "https://avatars.githubusercontent.com/u/47597252?v=4", "provider_id": "47597252", "email_verified": true, "phone_verified": false, "preferred_username": "notAro14"}', NULL, '2023-11-27 19:49:04.4134+00', '2024-02-08 21:20:18.782183+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);

--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('47597252', 'e7c1dc49-ab60-4099-afda-adffc5ac1e75', '{"iss": "https://api.github.com", "sub": "47597252", "name": "Aro", "email": "tech@andriamaro.com", "full_name": "Aro", "user_name": "notAro14", "avatar_url": "https://avatars.githubusercontent.com/u/47597252?v=4", "provider_id": "47597252", "email_verified": true, "phone_verified": false, "preferred_username": "notAro14"}', 'github', '2023-11-27 19:49:04.417398+00', '2023-11-27 19:49:04.417435+00', '2024-02-08 21:20:18.591755+00', 'bd4702cb-d158-463b-b288-031d3797cf82');

--
-- Data for Name: feeds; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."feeds" ("created_at", "url", "name", "id", "user_id", "website") VALUES
	('2024-02-08 21:29:33.453687+00', 'https://www.frenchweb.fr/feed', 'FRENCHWEB.FR', 'c0beb44e-2582-47ee-9ae8-57f644ff9244', 'e7c1dc49-ab60-4099-afda-adffc5ac1e75', 'https://www.frenchweb.fr/');

--
-- Data for Name: feed_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."feed_items" ("created_at", "url", "fk_feed_id", "pub_date", "title", "id",  "user_id", "content", "favorite", "status") VALUES
	('2024-02-08 21:29:33.479581+00', 'https://www.frenchweb.fr/vous-etes-en-pleine-croissance-et-vous-faites-face-a-un-afflux-dappareils-apple/446997', 'c0beb44e-2582-47ee-9ae8-57f644ff9244', '2024-02-08', 'Vous êtes en pleine croissance et vous faites face à un afflux d’appareils Apple ?', 'eef0ff3b-6b46-4cda-bb0c-ae7cbd71705a', 'e7c1dc49-ab60-4099-afda-adffc5ac1e75', '<p>Déploiements Zero-Touch pour les appareils Apple. Découvrez les secrets de déploiements Zéro Touch pour les appareils Apple dans cet ebook captivant ! Apprenez à simplifier la gestion des Mac, iPad, iPhone et Apple TV de votre entreprise, à automatiser les tâches fastidieuses et à libérer du temps précieux pour votre équipe. Téléchargez dès maintenant pour maîtriser &#8230;</p>
<p>L’article <a rel="nofollow" href="https://www.frenchweb.fr/vous-etes-en-pleine-croissance-et-vous-faites-face-a-un-afflux-dappareils-apple/446997">Vous êtes en pleine croissance et vous faites face à un afflux d’appareils Apple ?</a> est apparu en premier sur <a rel="nofollow" href="https://www.frenchweb.fr">FRENCHWEB.FR</a>.</p>
', false, 'unread'),
	('2024-02-08 21:29:33.479581+00', 'https://www.frenchweb.fr/au-ces-de-las-vegas-la-tech-diagnostique-des-maladies-et-berce-les-bebes/446593', 'c0beb44e-2582-47ee-9ae8-57f644ff9244', '2024-01-09', 'Au CES de Las Vegas, la tech diagnostique des maladies et berce les bébés', '543aac8c-2056-45c2-8a9b-74c7a3a71e35', 'e7c1dc49-ab60-4099-afda-adffc5ac1e75', '<p>Des start-up du monde entier en quête de débouchés pour leurs prototypes et innovations gonflées à l&#8217;intelligence artificielle (IA), des miroirs connectés aux poussettes électriques, sont depuis dimanche au CES, le salon annuel des technologies à Las Vegas. Morceaux choisis lors des avant-première pour la presse, avant l&#8217;ouverture officielle mardi. &#8211; Miroir, mon beau miroir&#8230; &#8230;</p>
<p>L’article <a rel="nofollow" href="https://www.frenchweb.fr/au-ces-de-las-vegas-la-tech-diagnostique-des-maladies-et-berce-les-bebes/446593">Au CES de Las Vegas, la tech diagnostique des maladies et berce les bébés</a> est apparu en premier sur <a rel="nofollow" href="https://www.frenchweb.fr">FRENCHWEB.FR</a>.</p>
', false, 'unread');

--
-- PostgreSQL database dump complete
--

RESET ALL;
