import {test} from "node:test";
import {strict as assert} from "node:assert";
import {validDiscordId,validSpecies,validDescription,validMemberLimit} from "./validation";
test("discord snowflake validation",()=>{assert.equal(validDiscordId("123456789012345678"),true);assert.equal(validDiscordId("not-an-id"),false);});
test("species input validation",()=>{assert.equal(validSpecies("Carnotaurus"),true);assert.equal(validSpecies("<script>"),false);});
test("party size validation",()=>{assert.equal(validMemberLimit(4),true);assert.equal(validMemberLimit(500),false);});
test("description limit",()=>{assert.equal(validDescription("hello"),true);assert.equal(validDescription("x".repeat(200)),false);});
