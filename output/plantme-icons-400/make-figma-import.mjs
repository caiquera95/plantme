import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('output/plantme-icons-400');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const category = process.argv[2];
const categoryIndex = [...new Set(manifest.icons.map(icon => icon.category))].indexOf(category);
if (categoryIndex < 0) throw new Error(`Unknown category: ${category}`);

const items = manifest.icons
  .filter(icon => icon.category === category)
  .map(icon => ({
    name: icon.name,
    stroke: fs.readFileSync(path.join(root, 'svg', 'stroke-rounded', `${icon.name}.svg`), 'utf8'),
    solid: fs.readFileSync(path.join(root, 'svg', 'solid-rounded', `${icon.name}.svg`), 'utf8')
  }));

const data = JSON.stringify({ category, categoryIndex, items });
process.stdout.write(`const data=${data};
let page=figma.root.children.find(p=>p.name==="01 — Componentes");
if(!page){page=figma.createPage();page.name="01 — Componentes";}
await figma.setCurrentPageAsync(page);
const made=[];const skipped=[];
for(let i=0;i<data.items.length;i++){
  const item=data.items[i];
  const setName="Icon/"+data.category+"/"+item.name;
  const found=page.findOne(n=>n.type==="COMPONENT_SET"&&n.name===setName);
  if(found){skipped.push(found.id);continue;}
  const strokeFrame=figma.createNodeFromSvg(item.stroke);
  strokeFrame.name="Stroke source";
  page.appendChild(strokeFrame);
  const strokeComp=figma.createComponentFromNode(strokeFrame);
  strokeComp.name="Style=Stroke Rounded";
  strokeComp.description="PlantMe icon, 24 px grid, rounded 1.8 px stroke.";
  const solidFrame=figma.createNodeFromSvg(item.solid);
  solidFrame.name="Solid source";
  page.appendChild(solidFrame);
  const solidComp=figma.createComponentFromNode(solidFrame);
  solidComp.name="Style=Solid Rounded";
  solidComp.description="PlantMe icon, 24 px grid, solid rounded style.";
  const set=figma.combineAsVariants([strokeComp,solidComp],page);
  set.name=setName;
  set.description="Original PlantMe icon. Choose Style: Stroke Rounded or Solid Rounded.";
  set.x=data.categoryIndex*560+(i%4)*128;
  set.y=80+Math.floor(i/4)*112;
  made.push(set.id);
}
return {pageId:page.id,category:data.category,created:made.length,skipped:skipped.length,componentSetIds:made,skippedIds:skipped};`);
