# Copyright (C) 2026 Ivan Voitkov. ARGONCAKECALC-COMMERCIAL-1.0.
# https://github.com/Argonstudio/ArgonCakeCalc — preserve attribution (section 7 of the Commercial Source-Available License).
"""Independent exact financial oracle: Python fractions.Fraction, no CakeCalc formulas imported.
Runs a batch bridge only to obtain actual engine results. No third-party packages.
"""
from fractions import Fraction as F
import random,json,subprocess
from pathlib import Path
rng=random.Random(6112026)
units={'g':('mass',1),'kg':('mass',1000),'ml':('volume',1),'l':('volume',1000),'pcs':('piece',1)}
values=['0.01','0.1','0.333333333333','0.5','1','3','4','6','7','12.345678','100','700']
def convertible_units(source):
 u=source.get('unit',source.get('outputUnit'));dim=units[u][0]
 return [k for k,(d,_) in units.items() if d==dim or (source.get('density') and d!='piece' and dim!='piece')]
def make_case(index):
 materials=[];recipes=[];products=[]
 for i in range(8):
  u=rng.choice(list(units));materials.append(dict(id=f'm{index}-{i}',name='Контрольный материал',category='Ингредиенты',price=rng.choice(['0','0.01','1','6','99.99','123.45','1000000000']),packQty=rng.choice(values[3:]),unit=u,density=rng.choice(['','0.8','1.01','1.2']) if u!='pcs' else '',priceUpdated='2026-10-31',description=''))
 def component(pool,i,j):
  s=rng.choice(pool);return dict(id=f'c{i}-{j}',type='material' if s in materials else 'recipe',ref=s['id'],qty=rng.choice(values),unit=rng.choice(convertible_units(s)),role='ingredient',scaling='proportional')
 for i in range(12):
  u=rng.choice(list(units));r=dict(id=f'r{index}-{i}',name='Контрольный рецепт',description='',instructions='',outputQty=rng.choice(['0.5','3','6','7','100','700']),outputUnit=u,loss=rng.choice(['0','5','10','12.5','33.333333333333']),density=rng.choice(['','0.8','1.01','1.2']) if u!='pcs' else '',components=[])
  r['components']=[component(materials+recipes,i,j) for j in range(rng.randint(1,5))];recipes.append(r)
 for i in range(3):
  u=rng.choice(list(units));p=dict(id=f'p{index}-{i}',name='Контрольное изделие',category='Торты',description='',instructions='',outputQty=rng.choice(['0.5','100','1000','2343.75']),outputUnit=u,portions=str(rng.randint(1,30)),density=rng.choice(['','0.8','1.01','1.2']) if u!='pcs' else '',components=[component(materials+recipes,'p'+str(i),j) for j in range(6)],cake=dict(shape='round',count=1,targetCount=1,height='8',margin='4',density='0.75',layers='3',tiers=[dict(size='20',height='8')]),pricing=dict(mode=rng.choice(['markup','margin']),rate=rng.choice(['0','25','33.333333333333','50','99.99']),loss=rng.choice(['0','10','12.5','33.333333333333']),lossEnabled=rng.choice([True,False]),desiredProfit=rng.choice(['0','0.01','100','10000']),profitEnabled=rng.choice([True,False])))
  for k in ['labor','energy','other']:p['pricing'][k]=dict(enabled=rng.choice([True,False]),amount=rng.choice(['0','12.34','100','999.99']))
  products.append(p)
 return dict(app='CakeCalc',formatVersion=2,materials=materials,recipes=recipes,products=products,categories=['Ингредиенты'],settings=dict(currency='RUB',locale='ru-RU'),exportedAt=None)
def convert(q,from_unit,to_unit,density):
 a,af=units[from_unit];b,bf=units[to_unit];value=F(q)*af
 if a!=b:
  if 'piece' in (a,b) or not density:raise ValueError('incompatible')
  value=value*F(density) if a=='volume' else value/F(density)
 return value/bf
def net(r):return F(r['outputQty'])*(1-F(r['loss'])/100)
def ceil(x):return -(-x.numerator//x.denominator)
def round_cent(x):return F((x*100+F(1,2)).numerator//(x*100+F(1,2)).denominator,100)
def actual_fraction(value):return None if value is None else F(int(value['numerator']),int(value['denominator']))
checks=0

def equal(actual,expected,where):
 global checks
 value=actual_fraction(actual)
 if value!=expected:raise AssertionError(f'{where}: {value} != {expected}')
 checks+=1

def inspect(db,actual):
 mats={m['id']:m for m in db['materials']};recipes={r['id']:r for r in db['recipes']};costs={}
 def source(c):return (mats if c['type']=='material' else recipes)[c['ref']]
 def src_qty(c):
  s=source(c);u=s['unit'] if c['type']=='material' else s['outputUnit'];return convert(c['qty'],c['unit'],u,s.get('density'))
 def cost(c):
  s=source(c);return src_qty(c)/F(s['packQty'])*F(s['price']) if c['type']=='material' else src_qty(c)/net(s)*costs[s['id']]
 for m,a in zip(db['materials'],actual['materials']):
  base={'mass':'g','volume':'ml','piece':'pcs'}[units[m['unit']][0]]
  equal(a,F(m['price'])/convert(m['packQty'],m['unit'],base,m.get('density')),'material unit')
 for r,a in zip(db['recipes'],actual['recipes']):
  costs[r['id']]=sum((cost(c) for c in r['components']),F(0))
  equal(a['cost'],costs[r['id']],'recipe cost');equal(a['net'],net(r),'recipe net');equal(a['unitCost'],costs[r['id']]/net(r),'recipe unit')
 for p,a in zip(db['products'],actual['products']):
  pr=p['pricing'];material=sum((cost(c) for c in p['components']),F(0));reserve=material/(1-F(pr['loss'])/100)-material if pr['lossEnabled'] else F(0);extras=sum((F(pr[k]['amount']) for k in ['labor','energy','other'] if pr[k]['enabled']),F(0));full=round_cent(material+reserve+extras)
  price=full*(1+F(pr['rate'])/100) if pr['mode']=='markup' else full/(1-F(pr['rate'])/100)
  if pr['profitEnabled']:price=max(price,full+F(pr['desiredProfit']))
  sale=F(ceil(price*100),100);profit=sale-full
  try:mass=convert(p['outputQty'],p['outputUnit'],'g',p.get('density'))
  except ValueError:mass=None
  expected=dict(material=material,loss=reserve,extras=extras,full=full,sale=sale,profit=profit,markup=profit/full*100 if full else None,margin=profit/sale*100 if sale else None,perKg=full/mass*1000 if mass else None,perPortion=full/F(p['portions']))
  for k,v in expected.items():equal(a[k],v,'product '+k)
  # Independent recursive expansion, unlike production's iterative topological propagation.
  leaves={}
  def expand(components,factor):
   for c in components:
    s=source(c);q=src_qty(c)*factor
    if c['type']=='material':leaves[s['id']]=leaves.get(s['id'],F(0))+q
    else:expand(s['components'],q/net(s))
  expand(p['components'],F(1));assert set(leaves)=={l['id'] for l in a['flat']}
  leaf_cost_sum=F(0)
  for l in a['flat']:
   m=mats[l['id']];q=leaves[m['id']];base={'mass':'g','volume':'ml','piece':'pcs'}[units[m['unit']][0]]
   equal(l['qty'],convert(q,m['unit'],base,m.get('density')),'flatten qty');equal(l['cost'],q/F(m['packQty'])*F(m['price']),'flatten cost');equal(l['packages'],F(ceil(q/F(m['packQty']))),'flatten packages')
   for key,to in [('mass','g'),('volume','ml')]:
    try:exp=convert(q,m['unit'],to,m.get('density'))
    except ValueError:exp=None
    equal(l[key],exp,'flatten '+key)
   leaf_cost_sum+=q/F(m['packQty'])*F(m['price'])
  assert leaf_cost_sum==material
cases=[make_case(i) for i in range(200)]
bridge=Path(__file__).with_name('oracle-bridge.cjs')
proc=subprocess.run(['node',str(bridge)],input=json.dumps(cases),text=True,capture_output=True,check=True)
actual=json.loads(proc.stdout)
for db,result in zip(cases,actual):inspect(db,result)
print(f'PASS: {checks} exact Fraction comparisons; 200 independent databases, 2400 recipes, 600 products.')
