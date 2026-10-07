// Test delivery composition locally with a mocked mail transport. No email is sent.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const label={buyer:"Buying",seller:"Selling",investor:"Investing",renovations:"Renovations",general:"Something else"};
const env={RESEND_API_KEY:"test-only"};
let delivered;
const context={
 exports:{},process:{env},Request,Response,AbortSignal,Map,Date,
 require:(id)=>{
  if(id==="next/server")return {NextResponse:{json:(value,init)=>Response.json(value,init)}};
  if(id==="@/lib/site")return {person:{email:"test@example.invalid"}};
  if(id==="@/lib/inquiry")return {EMAIL_RE:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,INTENT_LABEL:label,MAX_FIELD_LENGTH:2000,MAX_PAYLOAD_BYTES:16000,REPLY_PREFERENCES:["Email","Phone call","Text"]};
  throw Error(id);
 },
 fetch:async(url,options)=>{assert.equal(url,"https://api.resend.com/emails");delivered=JSON.parse(options.body);return new Response("{}",{status:200});},
};
const source=fs.readFileSync(new URL("../app/api/inquiry/route.ts",import.meta.url),"utf8");
vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
const send=(body)=>context.exports.POST(new Request("http://localhost/api/inquiry",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(body)}));
const body={name:"Test <visitor>",email:"test@example.com",intent:"buyer",replyPreference:"Email",clientLocation:"Oregon",canVisit:"I can arrange a visit",message:"Area and timing"};
assert.equal((await send(body)).status,200);
assert.ok(delivered.html.includes("Oregon"));assert.ok(delivered.html.includes("I can arrange a visit"));assert.ok(delivered.html.includes("Test &lt;visitor&gt;"));
assert.equal((await send({...body,email:"bad"})).status,400);
env.RESEND_API_KEY="";assert.equal((await send(body)).status,503);
console.log("PASS: new contact fields reach the delivery payload, HTML is escaped, invalid email is rejected, and missing credentials return 503. No email sent.");
