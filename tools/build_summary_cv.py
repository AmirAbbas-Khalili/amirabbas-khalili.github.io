from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, HRFlowable, PageBreak
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
import argparse

WEBSITE='https://amirabbas-khalili.github.io/'
REFS=[('Dr. Morteza Karamooz','Thesis Supervisor','ZH0LT-4AAAAJ'),('Dr. Amir Golroo','Systems Engineering','b6siCZYAAAAJ'),('Dr. Alireza Sadeghirad','Strength of Materials II / Theory of Structures I','trn9SbUAAAAJ'),('Dr. Vahid Shahhosseini','Road Construction Machinery','KBK5B_MAAAAJ'),('Dr. Mojtaba Khodadadi','Pavement Laboratory','Eopdg7UAAAAJ'),('Dr. Ladan Homayoon','Hydraulic Structures','5Urmo7sAAAAJ')]
for name,file in [('CV','arial.ttf'),('CVBold','arialbd.ttf')]:pdfmetrics.registerFont(TTFont(name,'C:/Windows/Fonts/'+file))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CVBold',italic='CV',boldItalic='CVBold')
INK=colors.HexColor('#202a33');ACCENT=colors.HexColor('#243e51')
STYLES={
'name':ParagraphStyle('name',fontName='CVBold',fontSize=21,leading=25,textColor=colors.HexColor('#18232e'),spaceAfter=4),
'sub':ParagraphStyle('sub',fontName='CV',fontSize=10,leading=13.5,textColor=colors.HexColor('#4b5863'),spaceAfter=5),
'body':ParagraphStyle('body',fontName='CV',fontSize=10,leading=13.5,spaceAfter=5,textColor=INK),
'section':ParagraphStyle('section',fontName='CVBold',fontSize=10,leading=14,spaceBefore=8,spaceAfter=4,textColor=ACCENT,keepWithNext=True),
'contact':ParagraphStyle('contact',fontName='CV',fontSize=8.5,leading=12,spaceAfter=3,textColor=INK),
'ref':ParagraphStyle('ref',fontName='CV',fontSize=9,leading=12,spaceAfter=4,textColor=INK)}
def link(text,url):return f'<link href="{url.replace("&","&amp;")}" color="#243e51">{text}</link>'
class CV:
 def __init__(self):self.story=[]
 def p(self,text,style='body'):self.story.append(Paragraph(text,STYLES[style]))
 def section(self,title):
  self.p(title.upper(),'section');rule=HRFlowable(width='100%',thickness=.4,color=colors.HexColor('#c5cdd3'),spaceAfter=5);rule.keepWithNext=True;self.story.append(rule)
 def header(self,subtitle):
  self.p('Amir Abbas Khalili','name');self.p(subtitle,'sub')
  self.p(link('Amirkhalili.work@gmail.com','mailto:Amirkhalili.work@gmail.com')+' | '+link('LinkedIn: amirjas','https://www.linkedin.com/in/amirjas')+' | '+link('Website: amirabbas-khalili.github.io',WEBSITE),'contact')
 def page2(self):self.story.append(PageBreak());self.p('Amir Abbas Khalili','sub')
 def education(self,rankings=True):
  self.section('Education')
  for title,uni,gpa,rank,ranking in [("Master's in Smart Building Engineering (ongoing)",'Tarbiat Modares University, Tehran','17.96/20','2 of 12','5th'),("Bachelor's in Civil Engineering",'Amirkabir University of Technology','15.76/20','12 of 102','2nd')]:
   self.p(f'<b>{title}</b><br/>{uni} | GPA: {gpa} | Class rank: {rank}')
   if rankings:self.p(link(f'{ranking} in Iran for Engineering - EduRank 2026','https://edurank.org/engineering/ir/'),'ref')
 def expertise(self):
  self.section('Technical Expertise')
  self.p('<b>Engineering methods:</b> Finite element analysis; engineering modeling and simulation; structural design and analysis; geometric optimization; 3D printing and additive manufacturing.')
  self.p('<b>Software:</b> COMSOL Multiphysics, SIMULIA Abaqus, AutoCAD, Revit, ETABS, Civil 3D and EPANET.')
  self.p('<b>Programming and data:</b> Python engineering tool development; data processing and analysis; machine learning and deep learning; SQL; Git and GitHub; Kaggle datasets and project notebooks. '+link('View code and projects', 'https://github.com/amirabbas-khalili')+'.')
  self.p('<b>Research and productivity:</b> Technical research and documentation; teaching and knowledge sharing; AI-assisted research workflows; ICDL and Power BI.')
 def papers(self,concise=False):
  self.section('Selected Conference Papers' if concise else 'Conference Papers')
  self.p('<b>Design and Analysis of a Novel Three-Dimensional Cubic Cellular Metamaterial for Vibration Reduction</b><br/>Amir Abbas Khalili, Niloofar Rezaeineya and Morteza Karamouz.<br/>15th International Conference on Acoustics and Vibrations, 2025. Accepted and presented in person; paper ID: 1134-ISAV2025. '+link('View paper','https://civilica.com/doc/2670134/')+'.')
  if not concise:self.p('Finite element investigation of two cubic cellular metamaterials, comparing dynamic responses and frequency band gaps with related structures.')
  self.p('<b>Modern Methods in Road Pavement and Asphalt</b><br/>Amir Abbas Khalili, Ali Khodaii and Reza Amin.<br/>8th Annual International Congress on Civil Engineering, Architecture and Urban Development, 2022. Accepted and presented as a poster. '+link('View paper','https://civilica.com/doc/1656259/')+'.')
  if not concise:self.p('Review of pavement construction techniques, hot and cold recycling, and materials and additives, with emphasis on performance, environmental protection and resource conservation.')
 def awards(self):
  self.section('Academic Activities & Recognition')
  self.p('<b>Smart Buildings Engineering Scientific Association:</b> Secretary and active member for two years; organized academic meetings and related events, including a seminar on lightweight aggregates and lightweight concrete at Tarbiat Modares University on December 24, 2025.')
  self.p('<b>Third place, first Future Building Competition:</b> National Competition of Designing and Building a Smart School, Architecture category; organized by the Vice Presidency for Science, Technology, and the Knowledge-Based Economy.')
 def english(self):
  self.section('English Proficiency');self.p('<b>TOEFL: 99/120</b><br/>Reading: 28 | Listening: 28 | Speaking: 20 | Writing: 23')
 def references(self,all_names=False):
  self.section('References')
  self.p(link('<b>Dr. Morteza Karamooz</b>','https://scholar.google.com/citations?user=ZH0LT-4AAAAJ&hl=en')+' - Thesis Supervisor, Tarbiat Modares University.<br/>Recommendation to be submitted directly by the referee on request.','ref')
  if all_names:
   self.p('Additional academic referees: '+'; '.join(link(name,'https://scholar.google.com/citations?user='+uid) for name,role,uid in REFS[1:])+'.','ref')
  self.p(link('Additional recommendation details',WEBSITE+'recommendations/'),'ref')
 def save(self,path,kind):
  def footer(canvas,doc):
   canvas.setFont('CV',8);canvas.setFillColor(colors.HexColor('#697581'));canvas.drawRightString(A4[0]-42,23,f'{doc.page} / 2')
  path=Path(path);path.parent.mkdir(parents=True,exist_ok=True)
  SimpleDocTemplate(str(path),pagesize=A4,leftMargin=42,rightMargin=42,topMargin=34,bottomMargin=36,title=f'Amir Abbas Khalili - {kind} CV',author='Amir Abbas Khalili').build(self.story,onFirstPage=footer,onLaterPages=footer)
  reader=PdfReader(path);text='\n'.join(p.extract_text() for p in reader.pages)
  print(kind,'pages',len(reader.pages));assert len(reader.pages)==2, f'{kind}: expected two pages'
  assert 'September 25, 2022' not in text and 'TOEFL: 99/120' in text and 'Website: amirabbas-khalili.github.io' in text
  assert text.rfind('REFERENCES')>text.rfind('ENGLISH PROFICIENCY')

def academic(path,all_names=False):
 c=CV();c.header("Master's Student in Smart Building Engineering | Civil Engineering")
 c.section('Research Interests');c.p('Three-dimensional lattice metamaterials; vibration reduction and wave propagation; energy absorption; finite element modeling; deep learning for engineering design; sustainable cementitious materials.')
 c.education()
 c.section("Master's Thesis")
 c.p('<b>Design and Optimization of Three-Dimensional Lattice Structures for Vibration Reduction and Energy Absorption Using Deep Learning</b>')
 c.p('Investigates how cubic lattice geometry influences frequency band gaps and mechanical behavior under compression. The workflow integrates numerical simulation, data analysis, deep learning and experimental validation.')
 c.p('<b>Methods:</b> Python generates graph-based face geometries and complete hollow cubic cells. COMSOL eigenfrequency analysis evaluates band-gap behavior; Abaqus compression simulations provide force-displacement responses for energy absorption, deformation, failure and densification studies.')
 c.p('<b>Data-driven design:</b> Graph neural networks investigate relationships between lattice geometry and band-gap behavior to support geometry recommendations and optimization. Vibration and compression tests on 3D-printed specimens were used to validate numerical models.')
 c.section('Research Experience')
 c.p('<b>Research Assistant | Tarbiat Modares University</b><br/>July 23 - September 23, 2026 | Supervisor: Dr. Morteza Karamooz Mahdiabadi, Assistant Professor of Mechanical Engineering.')
 c.p('Contributed to computational mechanics, numerical modeling and wave propagation in 3D structures, including plasticity and failure modeling in Abaqus/Explicit. Developed step-by-step instructional materials and video tutorials for COMSOL Multiphysics and Abaqus.')
 c.p('<b>Research Collaboration | Advanced Cementitious Materials</b><br/>Self-Healing Concrete: Fibre Reinforcement, Recycled Materials, and Machine Learning - collaborative review in progress.')
 c.p('Reviewing relevant studies, conducting supporting research and evaluating reinforcement materials, particularly recycled fibres. Topics include geopolymer and alkali-activated materials, mechanical performance, crack control, durability, sustainability and machine learning for material design.')
 c.page2();c.papers();c.expertise()
 c.section('Teaching & Research Communication')
 c.p('<b>Published engineering tutorials | October 4, 2026</b><br/>Step-by-step educational videos: '+link('Dispersion Curve','https://www.youtube.com/watch?v=SBDLAUWbJTk')+' (COMSOL wave-vector paths and band gaps); '+link('Transmission Spectrum','https://www.youtube.com/watch?v=RewK1oyje1s')+' (COMSOL transmission analysis); '+link('Energy Absorption','https://www.youtube.com/watch?v=vQLcFcgdPuU')+' (Abaqus compression and energy-absorption curves).')
 c.p('<b>English teaching:</b> Private language institute instruction. Teacher Training Course (TTC), 2024: grade of Excellent; qualified to teach at English language institutes.')
 c.awards();c.english();c.references(all_names);c.save(path,'Academic')

if __name__=='__main__':
 parser=argparse.ArgumentParser();parser.add_argument('--output',default=str(Path(__file__).resolve().parents[1]/'public/files/Amir-Abbas-Khalili-CV.pdf'));parser.add_argument('--all-referees',action='store_true');args=parser.parse_args();academic(args.output,args.all_referees)
