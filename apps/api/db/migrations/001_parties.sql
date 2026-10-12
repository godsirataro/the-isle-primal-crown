-- Community planning parties are not native in-game groups.
CREATE TABLE IF NOT EXISTS parties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  species varchar(40) NOT NULL,
  description varchar(160) NOT NULL DEFAULT '',
  creator_discord_id varchar(20) NOT NULL,
  max_members integer NOT NULL CHECK (max_members BETWEEN 2 AND 8),
  status varchar(10) NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS party_members (
  party_id uuid NOT NULL REFERENCES parties(id) ON DELETE CASCADE,
  discord_user_id varchar(20) NOT NULL,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (party_id,discord_user_id)
);
CREATE INDEX IF NOT EXISTS idx_parties_status_created ON parties(status,created_at DESC);
CREATE TABLE IF NOT EXISTS schema_migrations (
  id varchar(120) PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
