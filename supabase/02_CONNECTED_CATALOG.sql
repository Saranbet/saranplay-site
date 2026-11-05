begin;
create schema if not exists site_private;
revoke all on schema site_private from public,anon,authenticated;
create table if not exists public.site_admin_emails(email text primary key check (email=lower(email)));
alter table public.site_admin_emails enable row level security;
revoke all on public.site_admin_emails from public,anon,authenticated;
grant select on public.site_admin_emails to authenticated;
create policy "administrator_can_read_own_email" on public.site_admin_emails for select to authenticated using (email=lower((select auth.jwt()->>'email')));
insert into public.site_admin_emails(email) values ('owner_email@example.com') on conflict do nothing;
create table if not exists public.documents(id text primary key,data jsonb not null,revision bigint not null default 0 check(revision>=0));
alter table public.documents enable row level security;
revoke all on public.documents from public,anon,authenticated;
grant select,update on public.documents to authenticated;
create policy "administrator_read_catalog" on public.documents for select to authenticated using (exists(select 1 from public.site_admin_emails where email=lower((select auth.jwt()->>'email'))));
create policy "administrator_update_catalog" on public.documents for update to authenticated using (exists(select 1 from public.site_admin_emails where email=lower((select auth.jwt()->>'email')))) with check (exists(select 1 from public.site_admin_emails where email=lower((select auth.jwt()->>'email'))));
create table if not exists public.public_catalog(id text primary key,data jsonb not null,revision bigint not null);
alter table public.public_catalog enable row level security;
revoke all on public.public_catalog from public,anon,authenticated;
grant select on public.public_catalog to anon,authenticated;
create policy "visitors_read_published_catalog" on public.public_catalog for select to anon,authenticated using (id='catalog');
create or replace function site_private.publish_catalog() returns trigger language plpgsql security definer set search_path='' as $function$
begin
 insert into public.public_catalog(id,data,revision) values(new.id,(new.data-'products')||jsonb_build_object('products',coalesce((select jsonb_agg(p) from jsonb_array_elements(new.data->'products') p where p->>'active'='true'),'[]'::jsonb)),new.revision)
 on conflict(id) do update set data=excluded.data,revision=excluded.revision;
 return new;
end;
$function$;
revoke all on function site_private.publish_catalog() from public,anon,authenticated;
create trigger publish_catalog_after_write after insert or update on public.documents for each row execute function site_private.publish_catalog();
insert into public.documents(id,data,revision) values ('catalog', $catalog${"name": "SaranPlay", "tagline": "Bilhares & Acessórios", "headline": "O próximo grande jogo começa aqui.", "intro": "Mesas de bilhar, matraquilhos e acessórios. Encontre o equipamento para o seu espaço e peça uma proposta à SaranPlay.", "about": "A SaranPlay dedica-se à venda de mesas de bilhar e acessórios. Ajudamos a encontrar o equipamento adequado ao seu espaço, seja para casa, um salão de jogos ou um estabelecimento comercial.", "whatsapp": "258875563554", "phone": "+258 87 556 3554", "email": "owner_email@example.com", "address": "Tete, Moçambique", "hours": "", "facebook": "", "instagram": "", "logo": "/images/saranplay-logo.jpeg", "hero": "/images/loja-mesa-bilhar.jpeg", "currency": "MZN", "notice": "", "personalized": "Dê personalidade à sua mesa. Fale connosco sobre modelos, cores e opções de personalização.", "delivery": "Consulte a SaranPlay para conhecer as condições e o custo de entrega na sua localização.", "returns": "As condições de garantia e devolução são confirmadas pela SaranPlay antes da encomenda.", "privacy": "Os dados enviados pelo WhatsApp ou e-mail são utilizados para responder ao seu pedido. Contacte a SaranPlay para questões sobre os seus dados.", "categories": ["Mesas metálicas", "Mesas de madeira", "Sinuca", "Matraquilhos", "Tacos", "Bolas", "Acessórios", "Peças e componentes", "Campismo", "Lazer"], "products": []}$catalog$::jsonb,0) on conflict(id) do nothing;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('saranplay-media','saranplay-media',true,4194304,array['image/jpeg','image/png','image/webp']) on conflict(id) do nothing;
create policy "administrator_upload_catalog_image" on storage.objects for insert to authenticated with check(bucket_id='saranplay-media' and exists(select 1 from public.site_admin_emails where email=lower((select auth.jwt()->>'email'))));
DO $block$ begin
 if to_regprocedure('public.rls_auto_enable()') is not null then
  revoke execute on function public.rls_auto_enable() from public,anon,authenticated;
 end if;
end $block$;
notify pgrst,'reload schema';
commit;
