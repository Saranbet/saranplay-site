create extension if not exists "pgcrypto";

create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null,
  address text,
  phone text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  role text not null default 'cashier' check (role in ('owner','manager','cashier','stock')),
  store_id uuid references stores(id),
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique,
  category_id uuid references categories(id),
  description text,
  cost_price numeric(12,2) default 0,
  sale_price numeric(12,2) not null default 0,
  minimum_stock integer default 0,
  image_url text,
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists inventory (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  store_id uuid not null references stores(id) on delete cascade,
  quantity integer not null default 0,
  updated_at timestamptz default now(),
  unique(product_id,store_id)
);

alter table stores enable row level security;
alter table profiles enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table inventory enable row level security;

create policy "Public can read active products" on products for select using (active = true);
create policy "Public can read categories" on categories for select using (active = true);
create policy "Authenticated can read stores" on stores for select to authenticated using (true);
create policy "Authenticated can read inventory" on inventory for select to authenticated using (true);
create policy "Authenticated can manage products" on products for all to authenticated using (true) with check (true);
create policy "Authenticated can manage inventory" on inventory for all to authenticated using (true) with check (true);

insert into stores (name,city,address,phone) values
('SaranPlay Tete','Tete','Av. 25 de Junho, Steia','875563554'),
('SaranPlay Chimoio','Chimoio',null,'845635541'),
('SaranPlay Nampula','Nampula',null,'845635541')
on conflict do nothing;

insert into categories (name) values ('Mesas'),('Acessórios'),('Peças') on conflict do nothing;
