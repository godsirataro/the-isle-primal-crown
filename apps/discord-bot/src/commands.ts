import {SlashCommandBuilder} from "discord.js";
export const commands=[
 new SlashCommandBuilder().setName("server").setDescription("View verified PRIMAL CROWN server status"),
 new SlashCommandBuilder().setName("help").setDescription("How to find or create community parties"),
 new SlashCommandBuilder().setName("party").setDescription("Community party planner (not native game groups)")
 .addSubcommand(s=>s.setName("list").setDescription("List open community parties"))
 .addSubcommand(s=>s.setName("create").setDescription("Create a community planning party")
  .addStringOption(o=>o.setName("species").setDescription("Dinosaur species").setRequired(true))
  .addIntegerOption(o=>o.setName("max_members").setDescription("Party size 2-8; game group limits still apply").setRequired(true).setMinValue(2).setMaxValue(8))
  .addStringOption(o=>o.setName("description").setDescription("Short description").setMaxLength(160)))
 .addSubcommand(s=>s.setName("join").setDescription("Join by party ID")
  .addStringOption(o=>o.setName("id").setDescription("UUID from /party list").setRequired(true)))
 .addSubcommand(s=>s.setName("close").setDescription("Close a party you created")
  .addStringOption(o=>o.setName("id").setDescription("Your party UUID").setRequired(true)))
].map(c=>c.toJSON());
