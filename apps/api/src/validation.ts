export const snowflake=/^\d{17,20}$/;
export function validDiscordId(v:unknown):v is string{return typeof v==="string"&&snowflake.test(v);}
export function validSpecies(v:unknown):v is string{
 return typeof v==="string"&&/^[\p{L}\p{N} ._-]{2,40}$/u.test(v);
}
export function validDescription(v:unknown):v is string{return typeof v==="string"&&v.length<=160;}
export function validMemberLimit(v:unknown):v is number{return Number.isInteger(v)&&(v as number)>=2&&(v as number)<=8;}
