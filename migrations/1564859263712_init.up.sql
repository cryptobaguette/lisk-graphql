-- Accounts view
DROP VIEW IF EXISTS public.accounts_public;
CREATE VIEW public.accounts_public AS
 SELECT mem_accounts.address,
    mem_accounts.balance,
    encode(mem_accounts."publicKey", 'hex'::text) AS "publicKey",
    encode(mem_accounts."secondPublicKey", 'hex'::text) AS "secondPublicKey",
    -- Delegate fields
    mem_accounts.username,
    mem_accounts.vote,
    mem_accounts.rewards,
    mem_accounts."producedBlocks",
    mem_accounts."missedBlocks",
    -- TODO see for approval
    -- TODO see for productivity
    mem_accounts.rank
   FROM public.mem_accounts;

-- Transactions view
DROP VIEW IF EXISTS public.transactions_public;
CREATE VIEW public.transactions_public AS 
 SELECT trs.id,
    trs.amount,
    trs.fee,
    trs.type,
    trs.timestamp,
    trs."blockId",
    trs."senderId",
    encode(trs."senderPublicKey", 'hex'::text) AS "senderPublicKey",
    trs."recipientId",
    encode(trs."signature", 'hex'::text) AS "signature",
    encode(trs."signSignature", 'hex'::text) AS "signSignature",
    trs."signatures",
    trs."asset"
   FROM public.trs;

-- Blocks view
DROP VIEW IF EXISTS public.blocks_public;
CREATE VIEW public.blocks_public AS
 SELECT blocks.id,
    blocks.version,
    blocks.height,
    blocks.timestamp,
    -- TODO see for generatorAddress
    -- TODO see for generatorPublicKey
    blocks."payloadLength",
    encode(blocks."payloadHash", 'hex'::text) AS "payloadHash",
    encode(blocks."blockSignature", 'hex'::text) AS "blockSignature",
    (SELECT max("b"."height") + 1 FROM public.blocks AS "b") - blocks."height" AS confirmations,
    blocks."previousBlock" AS "previousBlockId",
    blocks."numberOfTransactions",
    blocks."totalAmount",
    blocks."totalFee",
    blocks.reward
    -- TODO see for totalForged
   FROM public.blocks;
