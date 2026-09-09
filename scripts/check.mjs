// SPDX-License-Identifier: Apache-2.0
import { readFile, readdir } from 'node:fs/promises';
const files=(await readdir('site')).filter(x=>x.endsWith('.html'));
const ids=new Map();
for(const file of files){const text=await readFile(`site/${file}`,'utf8'); ids.set(file,new Set([...text.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1])));}
const failures=[];
for(const file of files){const text=await readFile(`site/${file}`,'utf8');for(const match of text.matchAll(/href="([^"#]+)?#([^"]+)"/g)){const target=match[1]||file;if(!ids.get(target)?.has(match[2])) failures.push(`${file}: missing ${target}#${match[2]}`);}}
for(const required of ['installation','supplier','modeling','connectors','delta','quality','matching','survivorship','approvals','correction','relationships','configuration','sdks','service-accounts','oidc','scim','secrets','publication','compose','kubernetes','offline','backups','recovery','upgrade','observability','troubleshooting','contributing']) if(!ids.get('guides.html')?.has(required)) failures.push(`missing guide ${required}`);
if(failures.length){console.error(failures.join('\n'));process.exit(1)} console.log(`Checked ${files.length} HTML files and 27 required guides.`);
